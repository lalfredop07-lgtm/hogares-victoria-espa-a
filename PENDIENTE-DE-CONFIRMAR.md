# Pendiente de confirmar antes de publicar

Este documento reúne **todo lo que la web no puede dar por cierto** sin que los
responsables de la Asociación Hogares Victoria de España lo confirmen.

Cada punto indica dónde aparece en el sitio y qué hay que decidir. Mientras no
se confirme, la web o bien **omite el dato**, o bien lo presenta de forma
explícitamente provisional. En ningún caso se publica como hecho vigente algo
que no esté documentado.

---

## 1. Datos de contacto y donación — ALTA PRIORIDAD

| Dato | Valor publicado actualmente | Qué hay que confirmar |
|---|---|---|
| Teléfono | +34 647 672 300 | Que sigue activo y que es el número al que deben llamar personas que buscan ayuda. |
| Correo | info@hogaresvictoria.es | Que se lee con regularidad y que es el destinatario correcto de los formularios. |
| IBAN | ES34 0081 0298 4700 0213 9217 (Banco Sabadell) | **Verificación obligatoria con la entidad.** Un IBAN erróneo desvía donativos. |
| BIC | BSABESBB | Idem. |
| Enlace de PayPal | `hosted_button_id=W6CTHD887QWBJ` | Que el botón pertenece a la asociación y sigue activo. Conviene hacer un donativo de prueba de 1 € antes del lanzamiento. |

**Dónde aparece:** cabecera, pie, `/necesito-ayuda`, `/colabora-y-dona`, `/contacto`.
**Fichero a editar:** `src/content/organization.ts`.

---

## 2. Sedes y visitas

La memoria 2025 documenta dos sedes:

- **Calle Real 31, Quijorna (Madrid)** — hogar de acogida.
- **Avenida de Badajoz 64, Madrid** — sede administrativa.

**A confirmar:** cuál de las dos (si alguna) debe hacerse pública como lugar al
que acudir, y en qué horario. Ahora mismo la web publica ambas direcciones con
una nota que pide llamar antes de ir. Si alguna no debe difundirse, basta con
eliminarla de `org.locations`.

---

## 3. Nombre y disponibilidad del programa ambulatorio

Las memorias de 2024 y 2025 lo llaman literalmente **«programa Ambulatorio 24
Horas en Victoria»**. La web lo presenta solo como «programa ambulatorio» y
**no afirma en ningún sitio que haya atención 24 horas**, porque eso no está
verificado.

**A confirmar:** el nombre oficial del programa y si existe realmente algún
tipo de disponibilidad continuada. Si la hay, puede añadirse; si no la hay,
mejor dejarlo como está.

---

## 4. Discrepancia en las sesiones de 2024

La Memoria de Actividades 2024 afirma «más de 280 sesiones individuales y
grupales», pero su propio desglose indica **260 grupales + 60 individuales =
320**. Las dos cifras no cuadran.

La web publica la discrepancia de forma transparente en
`/impacto-y-transparencia` en lugar de elegir una cifra.

**A confirmar:** cuál es la correcta. Después basta con actualizar
`src/content/impact.ts` y retirar el bloque «Una discrepancia que no ocultamos»
de `messages/*.json` (`impact.discrepancyTitle` / `impact.discrepancyBody`).

---

## 5. «Más de 100 hogares en el mundo»

La web anterior afirmaba que existen más de cien hogares en distintos países.
**No se ha publicado en esta web como dato vigente.** El texto de
`/quienes-somos` menciona la afirmación anterior y dice expresamente que está
pendiente de confirmación.

**A confirmar:** cifra actual de hogares y países, con fuente. Si se confirma,
es un dato muy potente para la página de «Quiénes somos».

---

## 6. Fecha de los reconocimientos

- **Congreso de la República del Perú:** reconocimiento a 23 pastores por más
  de treinta años de labor. No consta la fecha del acto.
- **Ayuntamiento de Chorrillos:** reconocimiento al pastor Alfredo Pedraza. No
  consta la fecha.

Ambos se presentan sin fecha y así se indica. **A confirmar:** fechas y
denominación exacta de cada reconocimiento.

---

## 7. Equipo: cargos, fotografías y autorizaciones

La web nombra a **Alfredo Pedraza Soriano** (dirección) y **Silvie Yvonne
Espinel Bello** (secretaría), tal y como figuran firmando las memorias de 2025.

**A confirmar:**
- Que los cargos siguen vigentes.
- Si quieren aparecer con fotografía y biografía. Ahora mismo **no se publica
  ninguna fotografía individual del equipo** porque no consta autorización.

> El NIE que aparece en los PDF firmados **no se ha copiado a la web** y no debe
> copiarse nunca. Tampoco las firmas manuscritas.

---

## 8. Fotografías: autorizaciones y uso

De las 53 imágenes entregadas se han utilizado 36. Criterio aplicado:

**Se publican** fotografías en las que las personas atendidas aparecen
(a) con el rostro ya cubierto en el original, (b) de espaldas o a distancia, o
(c) solo aparecen miembros del equipo con ropa de la asociación.

**No se han publicado:**

| Archivo original | Motivo |
|---|---|
| `foto 2.png` | Escena de consumo en primer plano. Estigmatizante. |
| `foto 1.png`, `foto 3 2.png`, `foto 7.png` | Rostros identificables de personas en situación de consumo, sin anonimizar. |
| `WhatsApp Image … 11.12.49 / 11.13.13 / 11.19.54` | Idem. |
| `IMG_6954.jpeg` (`equipo-grupo-hogar`) | Aparece el rostro de un menor. **No debe publicarse sin autorización expresa de sus progenitores o tutores.** |
| `ChatGPT Image 9 oct 2026, 13_17_28.png` | Imagen generada por inteligencia artificial. Se ha descartado por coherencia con el criterio de autenticidad documental del sitio. |

**A confirmar:** si existen autorizaciones firmadas de las personas que sí
aparecen. Si alguna fotografía debe retirarse, se quita su entrada de
`src/content/images.ts` y de donde se use.

---

## 9. Redes sociales

La web anterior enlazaba un Facebook (`IglesiaVictoryAte`) y un Instagram que
**parecen corresponder a la iglesia de origen en Perú, no a la asociación
española**. Por eso **no se ha incluido ninguna red social** en el pie.

**A confirmar:** si la asociación española tiene perfiles propios y cuáles.
Añadirlos al pie es un cambio de cinco minutos.

---

## 10. Régimen fiscal y desgravación de donativos

La web **no afirma nada** sobre deducciones fiscales porque no consta si la
asociación está acogida a la Ley 49/2002 ni si emite certificados de donativo.
La página `/colabora-y-dona` lo dice abiertamente e invita a preguntar.

**A confirmar:** régimen fiscal aplicable y si se emiten certificados.

---

## 11. Textos legales

El aviso legal, la política de privacidad y la política de cookies tienen una
**estructura profesional redactada a partir de la información disponible**, pero
**no han sido revisados por un asesor jurídico**. Cada página lo advierte de
forma visible.

**Pendiente:** revisión jurídica antes del lanzamiento. Textos en
`messages/es.json` y `messages/en.json`, bajo la clave `legal`.

---

## 12. Traducción al inglés

La versión inglesa está redactada, no traducida de forma literal. Dos puntos
que conviene revisar con un hablante nativo o con la propia asociación:

- El lema **«We have lived it. We have suffered it. We have overcome it.»**
  Se ha mantenido la traducción propuesta porque conserva el ritmo ternario del
  original. Una alternativa más coloquial sería con contracciones
  («We've lived it…»).
- La terminología de los programas (*residential care*, *outreach*,
  *rehabilitation*), por si la organización internacional usa otra.

---

## 13. Integración de correo (formularios)

Los tres formularios (ayuda, contacto, voluntariado) están **completamente
construidos y validados**, pero el envío real necesita credenciales de Resend.

Mientras no existan, el servidor responde `503 not_configured` y la web muestra
un aviso con el teléfono y el correo. **Nunca muestra un falso «mensaje
enviado».** Instrucciones en `README.md` y `.env.example`.

---

## 14. Dominio definitivo

`NEXT_PUBLIC_SITE_URL` está puesto a `https://www.hogaresvictoria.es`. Si el
sitio se publica en otro dominio, hay que cambiarlo: de ahí salen los
`canonical`, los `hreflang`, el sitemap y las imágenes de redes sociales.
