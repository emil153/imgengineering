import { OFFER_OPTIONS, PROPERTY_OPTIONS_B2B, PROPERTY_OPTIONS_B2C, SERVICE_OPTIONS, labelOf, type QuoteData } from "./schema";

/**
 * Lead delivery. Two independent channels, both configured only through environment variables:
 *   1. Email to IMG via Brevo transactional API (BREVO_API_KEY, QUOTE_SENDER_EMAIL, QUOTE_NOTIFY_TO)
 *   2. JSON webhook, e.g. Make.com, for CRM or automation (QUOTE_WEBHOOK_URL)
 * A submission counts as delivered if at least one channel succeeds.
 * If no channel is configured, the API refuses honestly (503) instead of pretending.
 */

export type Lead = QuoteData & { id: string; receivedAt: string; source: { page: string | null; userAgent: string | null } };

type ChannelResult = { channel: "email" | "webhook" | "confirmation"; ok: boolean; status?: number; error?: string };

const env = (k: string) => process.env[k]?.trim() || undefined;

export function deliveryConfigured() {
  return Boolean((env("BREVO_API_KEY") && env("QUOTE_SENDER_EMAIL")) || env("QUOTE_WEBHOOK_URL"));
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(lead: Lead): [string, string][] {
  const props = lead.audience === "b2b" ? PROPERTY_OPTIONS_B2B : PROPERTY_OPTIONS_B2C;
  const r: [string, string | null][] = [
    ["Оферта", lead.offer ? labelOf(OFFER_OPTIONS, lead.offer) : null],
    ["Тип запитване", lead.audience === "b2b" ? "Бизнес обект" : "Дом"],
    ["Име", lead.name],
    ["Компания", lead.company],
    ["Телефон", lead.phone],
    ["Имейл", lead.email],
    ["Услуга", labelOf(SERVICE_OPTIONS, lead.service)],
    ["Тип обект", lead.propertyType ? labelOf(props, lead.propertyType) : null],
    ["Площ / мащаб", lead.area],
    ["Местоположение", lead.location],
    ["Съобщение", lead.message],
    ["Съгласие за маркетинг", lead.marketingConsent ? "Да" : "Не"],
    ["Изпратено от страница", lead.source.page],
    ["Номер на запитването", lead.id],
  ];
  return r.filter((x): x is [string, string] => Boolean(x[1]));
}

function notificationHtml(lead: Lead) {
  const body = rows(lead)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eaeaea;color:#54595f;font:13px Arial,sans-serif;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #eaeaea;color:#000;font:14px Arial,sans-serif;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html lang="bg"><body style="margin:0;padding:24px;background:#fff">
<p style="font:600 18px Arial,sans-serif;margin:0 0 4px">Ново запитване от сайта</p>
<p style="font:13px Arial,sans-serif;color:#54595f;margin:0 0 16px">${esc(new Date(lead.receivedAt).toLocaleString("bg-BG", { timeZone: "Europe/Sofia" }))}</p>
<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #eaeaea;max-width:640px">${body}</table>
</body></html>`;
}

function notificationText(lead: Lead) {
  return rows(lead)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function subject(lead: Lead) {
  const who = lead.audience === "b2b" ? `Бизнес: ${lead.company}` : "Дом";
  const offer = lead.offer ? `[${labelOf(OFFER_OPTIONS, lead.offer)}] ` : "";
  return `${offer}Ново запитване (${who}) · ${labelOf(SERVICE_OPTIONS, lead.service)} · ${lead.location}`;
}

async function brevoSend(payload: object): Promise<{ ok: boolean; status: number; error?: string }> {
  const url = env("BREVO_API_URL") ?? "https://api.brevo.com/v3/smtp/email";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "api-key": env("BREVO_API_KEY")!, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    return { ok: res.ok, status: res.status, error: res.ok ? undefined : (await res.text()).slice(0, 300) };
  } catch (e) {
    return { ok: false, status: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

async function sendNotification(lead: Lead): Promise<ChannelResult | null> {
  if (!env("BREVO_API_KEY") || !env("QUOTE_SENDER_EMAIL")) return null;
  const to = (env("QUOTE_NOTIFY_TO") ?? "office@imgengi.com").split(",").map((e) => ({ email: e.trim() }));
  const r = await brevoSend({
    sender: { email: env("QUOTE_SENDER_EMAIL"), name: env("QUOTE_SENDER_NAME") ?? "Сайт IMG Engineering" },
    to,
    ...(lead.email ? { replyTo: { email: lead.email, name: lead.name } } : {}),
    subject: subject(lead),
    htmlContent: notificationHtml(lead),
    textContent: notificationText(lead),
    tags: ["quote-request", lead.audience],
  });
  return { channel: "email", ...r };
}

/** Optional confirmation to the visitor (QUOTE_SEND_CONFIRMATION=true). Never blocks success. */
async function sendConfirmation(lead: Lead): Promise<ChannelResult | null> {
  if (env("QUOTE_SEND_CONFIRMATION") !== "true" || !lead.email || !env("BREVO_API_KEY") || !env("QUOTE_SENDER_EMAIL")) return null;
  const html = `<!doctype html><html lang="bg"><body style="margin:0;padding:24px;font:15px/1.6 Arial,sans-serif;color:#000">
<p>Здравейте, ${esc(lead.name)},</p>
<p>Благодарим ви за запитването. Получихме го и наш специалист ще се свърже с вас, за да уточни детайлите.</p>
<p>Ако искате да добавите информация, отговорете на този имейл или се обадете на 0700 14 400 (понеделник – петък, 8:30 – 17:30).</p>
<p>Поздрави,<br>IMG Engineering</p>
<p style="font-size:12px;color:#54595f">Номер на запитването: ${esc(lead.id)}</p></body></html>`;
  const r = await brevoSend({
    sender: { email: env("QUOTE_SENDER_EMAIL"), name: "IMG Engineering" },
    to: [{ email: lead.email, name: lead.name }],
    replyTo: { email: (env("QUOTE_NOTIFY_TO") ?? "office@imgengi.com").split(",")[0].trim() },
    subject: "Получихме вашето запитване · IMG Engineering",
    htmlContent: html,
    tags: ["quote-confirmation"],
  });
  return { channel: "confirmation", ...r };
}

async function sendWebhook(lead: Lead): Promise<ChannelResult | null> {
  const url = env("QUOTE_WEBHOOK_URL");
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "quote_request", ...lead }),
      signal: AbortSignal.timeout(10_000),
    });
    return { channel: "webhook", ok: res.ok, status: res.status, error: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (e) {
    return { channel: "webhook", ok: false, status: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function deliverLead(lead: Lead) {
  const [email, webhook] = await Promise.all([sendNotification(lead), sendWebhook(lead)]);
  const results = [email, webhook].filter((r): r is ChannelResult => r !== null);
  const delivered = results.some((r) => r.ok);
  const confirmation = delivered ? await sendConfirmation(lead) : null;
  return { delivered, results: confirmation ? [...results, confirmation] : results };
}
