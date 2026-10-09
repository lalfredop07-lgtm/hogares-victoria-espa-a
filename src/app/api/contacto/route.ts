import { NextResponse } from "next/server";
import { org } from "@/content/organization";

/**
 * ENVIO DE FORMULARIOS
 * -----------------------------------------------------------------------------
 * Integracion preparada para Resend. Requiere dos variables de entorno
 * privadas (ver .env.example):
 *
 *   RESEND_API_KEY     clave privada de Resend
 *   CONTACT_FROM_EMAIL remitente verificado en el dominio de la asociacion
 *
 * Si falta alguna, el endpoint responde 503 con el codigo "not_configured" y
 * la interfaz muestra el telefono y el correo en su lugar. Nunca se finge un
 * envio correcto.
 *
 * Proteccion basica frente a abuso: campo trampa, control de tiempo minimo de
 * cumplimentacion y limite por IP en memoria del proceso.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const MAX_FIELD = 4000;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    if (buckets.size > 500) {
      for (const [key, value] of buckets) {
        if (value.resetAt < now) buckets.delete(key);
      }
    }
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_PER_WINDOW;
}

function clean(value: unknown): string {
  return String(value ?? "")
    .slice(0, MAX_FIELD)
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SUBJECTS: Record<string, string> = {
  contact: "Contacto desde la web",
  help: "Solicitud de ayuda desde la web",
  volunteer: "Solicitud de voluntariado desde la web",
};

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  /* --- Antispam: trampa y tiempo minimo de cumplimentacion --- */
  if (clean(body.website)) {
    // Responde 200 para no dar pistas al bot, pero no envia nada.
    return NextResponse.json({ ok: true });
  }
  if (typeof body.elapsed === "number" && body.elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const variant = clean(body.variant) || "contact";
  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message);

  const hasContact = Boolean(email || phone);
  if (!name || !message || message.length < 10 || !hasContact || !body.consent) {
    return NextResponse.json(
      { ok: false, code: "invalid" },
      { status: 422 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? org.email.display;

  if (!apiKey || !from) {
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Nombre", name],
    ["Correo", email || "—"],
    ["Teléfono", phone || "—"],
    ["Localidad", clean(body.city) || "—"],
    ["Motivo", clean(body.reason) || "—"],
    ["Escribe para", clean(body.forWhom) || "—"],
    ["Disponibilidad", clean(body.availability) || "—"],
    ["Idioma de la web", clean(body.locale) || "es"],
  ];

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#19140f;line-height:1.6">
      <p style="margin:0 0 18px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8c1316">
        ${escapeHtml(SUBJECTS[variant] ?? SUBJECTS.contact)}
      </p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([label, value]) => `<tr>
              <td style="padding:4px 16px 4px 0;color:#5e5448;white-space:nowrap">${escapeHtml(label)}</td>
              <td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td>
            </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:0 0 6px;color:#5e5448">Mensaje</p>
      <div style="white-space:pre-wrap;border-left:2px solid #d01a18;padding-left:14px">${escapeHtml(message)}</div>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `${SUBJECTS[variant] ?? SUBJECTS.contact} — ${name}`,
        html,
        ...(email ? { reply_to: email } : {}),
      }),
    });

    if (!response.ok) {
      console.error("Resend respondio", response.status, await response.text());
      return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Error al enviar el formulario", error);
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
