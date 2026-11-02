/**
 * Best-effort, in-memory rate limit: max N submissions per IP per window.
 * Works on a single long-running server. On serverless hosting each instance has
 * its own memory, so this is a speed bump, not a guarantee. If spam becomes a problem,
 * add Cloudflare Turnstile (free) or move the counter to a shared store.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX;
}
