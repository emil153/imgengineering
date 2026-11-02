import { NextResponse, type NextRequest } from "next/server";
import { deliverLead, deliveryConfigured, type Lead } from "@/lib/quote/deliver";
import { rateLimited } from "@/lib/quote/rate-limit";
import { fromFormData, validateQuote } from "@/lib/quote/schema";

/**
 * POST /api/quote
 * - JavaScript form: sends FormData with `Accept: application/json`, gets JSON back.
 * - No-JavaScript form: native POST, gets a 303 redirect to a thank-you or error page.
 *
 * Protection layers: same-origin check, honeypot field, minimum fill time,
 * per-IP rate limit, strict server-side validation, length limits, HTML-escaped emails.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000;

type ApiResult =
  | { ok: true; id: string }
  | { ok: false; error: "validation"; fields: Record<string, string> }
  | { ok: false; error: "rate_limited" | "unavailable" | "bad_request" };

export async function POST(req: NextRequest) {
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  const respond = (status: number, body: ApiResult) => {
    if (wantsJson) return NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });
    const target = body.ok ? "/poiskayte-oferta/blagodarim/" : "/poiskayte-oferta/greshka/";
    return NextResponse.redirect(new URL(target, req.url), 303);
  };

  // Same-origin check (blocks cross-site form posts). Browsers always send Origin on POST.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && new URL(origin).host !== host) {
    return respond(403, { ok: false, error: "bad_request" });
  }

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return respond(400, { ok: false, error: "bad_request" });
  }

  // Bots fill every field; humans never see this one. Pretend success so bots don't retry.
  const honeypot = String(fd.get("website") ?? "");
  const startedAt = Number(fd.get("t") ?? 0);
  const tooFast = startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    console.warn(`[quote] dropped as spam (${honeypot ? "honeypot" : "too fast"})`);
    return respond(200, { ok: true, id: "ok" });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return respond(429, { ok: false, error: "rate_limited" });

  const result = validateQuote(fromFormData(fd));
  if (!result.ok) return respond(422, { ok: false, error: "validation", fields: result.errors as Record<string, string> });

  if (!deliveryConfigured()) {
    console.error("[quote] no delivery channel configured (set BREVO_API_KEY + QUOTE_SENDER_EMAIL and/or QUOTE_WEBHOOK_URL)");
    return respond(503, { ok: false, error: "unavailable" });
  }

  const lead: Lead = {
    ...result.data,
    id: `Q-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    source: { page: String(fd.get("page") ?? "").slice(0, 200) || null, userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? null },
  };

  const { delivered, results } = await deliverLead(lead);
  // Log delivery outcome without personal data.
  console.info(
    `[quote] ${lead.id} ${lead.audience} ${lead.service} delivered=${delivered} ` +
      results.map((r) => `${r.channel}:${r.ok ? "ok" : `fail(${r.status}${r.error ? ` ${r.error}` : ""})`}`).join(" "),
  );

  if (!delivered) return respond(502, { ok: false, error: "unavailable" });
  return respond(200, { ok: true, id: lead.id });
}
