"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/Arrow";
import { org } from "@/content/organization";

export type FormVariant = "contact" | "help" | "volunteer";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "success" | "error" | "unconfigured" | "rate";

const REASONS = ["info", "collaborate", "donation", "institutional", "other"];
const FOR_WHOM = ["self", "other", "professional"];

export function ContactForm({
  variant,
  locale,
}: {
  variant: FormVariant;
  locale: string;
}) {
  const t = useTranslations("forms");
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  const id = (name: string) => `${uid}-${name}`;

  /* Marca de tiempo para el control antispam: se toma al montar, nunca en
     render, para que el valor sea estable. */
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (!get("name")) next.name = t("errors.nameRequired");

    const email = get("email");
    const phone = get("phone");

    if (variant === "help") {
      if (!email && !phone) {
        next.email = t("errors.contactRequired");
        next.phone = t("errors.contactRequired");
      }
    } else if (!email) {
      next.email = t("errors.emailRequired");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = t("errors.emailInvalid");
    }
    if (phone && !/^[+()\d\s.-]{6,24}$/.test(phone)) {
      next.phone = t("errors.phoneInvalid");
    }
    if (variant === "volunteer" && !phone) {
      next.phone = t("errors.phoneRequired");
    }
    if (variant === "contact" && !get("reason")) {
      next.reason = t("errors.reasonRequired");
    }

    const message = get("message");
    if (!message) next.message = t("errors.messageRequired");
    else if (message.length < 10) next.message = t("errors.messageShort");

    if (!data.get("consent")) next.consent = t("errors.consentRequired");

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const payload = Object.fromEntries(data.entries());
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          variant,
          locale,
          elapsed: Date.now() - startedAt.current,
        }),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      const body = (await response.json().catch(() => ({}))) as {
        code?: string;
      };
      if (body.code === "not_configured") setStatus("unconfigured");
      else if (body.code === "rate_limited") setStatus("rate");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  /* --- Mensaje final tras un envio correcto --- */
  if (status === "success") {
    return (
      <div
        role="status"
        className="border-l-2 border-red bg-white px-6 py-8 sm:px-8"
      >
        <h3 className="display-s">{t("successTitle")}</h3>
        <p className="measure mt-3 text-ink-80">{t("successBody")}</p>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => Boolean(v));

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Resumen de errores: el foco salta aqui al fallar la validacion */}
      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-red-deep bg-red/5 px-5 py-4"
        >
          <p className="label-hv text-red-deep">{t("errors.summaryTitle")}</p>
          <ul className="mt-3 space-y-1 text-[0.9375rem]">
            {errorList.map(([key, value]) => (
              <li key={key}>
                <a href={`#${id(key)}`} className="link">
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === "unconfigured" ? (
        <Notice title={t("notConfiguredTitle")}>
          {t("notConfiguredBody", {
            email: org.email.display,
            phone: org.phone.display,
          })}
        </Notice>
      ) : null}
      {status === "rate" ? (
        <Notice title={t("rateLimitTitle")}>{t("rateLimitBody")}</Notice>
      ) : null}
      {status === "error" ? (
        <Notice title={t("errorTitle")}>
          {t("errorBody", { email: org.email.display })}
        </Notice>
      ) : null}

      {variant === "help" ? (
        <Select
          id={id("forWhom")}
          name="forWhom"
          label={t("forWhom")}
          options={FOR_WHOM.map((v) => ({
            value: v,
            label: t(`forWhomOptions.${v}`),
          }))}
        />
      ) : null}

      <Input
        id={id("name")}
        name="name"
        label={t("name")}
        autoComplete="name"
        required
        error={errors.name}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id={id("email")}
          name="email"
          type="email"
          label={t("email")}
          autoComplete="email"
          required={variant !== "help"}
          error={errors.email}
        />
        <Input
          id={id("phone")}
          name="phone"
          type="tel"
          label={t("phone")}
          autoComplete="tel"
          required={variant === "volunteer"}
          error={errors.phone}
        />
      </div>

      {variant === "contact" ? (
        <Select
          id={id("reason")}
          name="reason"
          label={t("reason")}
          error={errors.reason}
          required
          placeholder="—"
          options={REASONS.map((v) => ({
            value: v,
            label: t(`reasons.${v}`),
          }))}
        />
      ) : null}

      {variant === "volunteer" ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id={id("city")} name="city" label={t("city")} autoComplete="address-level2" />
          <Input
            id={id("availability")}
            name="availability"
            label={t("availability")}
            placeholder={t("availabilityPlaceholder")}
          />
        </div>
      ) : null}

      {variant === "help" ? (
        <Input id={id("city")} name="city" label={t("city")} autoComplete="address-level2" />
      ) : null}

      <div>
        <label htmlFor={id("message")} className="field-label">
          {t("message")}
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? `${id("message")}-error` : undefined}
          placeholder={
            variant === "volunteer"
              ? t("messagePlaceholderVolunteer")
              : variant === "help"
                ? t("messagePlaceholderHelp")
                : t("messagePlaceholderContact")
          }
          className="field resize-y"
        />
        <FieldError id={`${id("message")}-error`} message={errors.message} />
      </div>

      {/* Trampa antispam: invisible para las personas, atractiva para los bots */}
      <div aria-hidden="true" className="sr-only-hv">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={`${id("consent")}-hint`}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-red)]"
          />
          <label htmlFor={id("consent")} className="text-[0.9375rem] leading-relaxed">
            {t.rich("consent", {
              privacy: (chunks) => (
                <Link href="/privacidad" className="link">
                  {chunks}
                </Link>
              ),
            })}
          </label>
        </div>
        <p id={`${id("consent")}-hint`} className="caption-hv mt-2 pl-8">
          {t("consentHint")}
        </p>
        <FieldError id={`${id("consent")}-error`} message={errors.consent} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "sending"
          ? t("sending")
          : variant === "volunteer"
            ? t("submitVolunteer")
            : t("submit")}
        {status === "sending" ? null : <Arrow />}
      </button>
    </form>
  );
}

/* ---------------------------------------------------------------- piezas --- */

function Notice({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div role="alert" className="border-l-2 border-red-deep bg-red/5 px-5 py-4">
      <p className="label-hv text-red-deep">{title}</p>
      <p className="mt-2 text-[0.9375rem]">{children}</p>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.875rem] text-red-deep">
      {message}
    </p>
  );
}

function Input({
  id,
  name,
  label,
  type = "text",
  required,
  error,
  autoComplete,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function Select({
  id,
  name,
  label,
  options,
  error,
  required,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={placeholder ? "" : options[0]?.value}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
