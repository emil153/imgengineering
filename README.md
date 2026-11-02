# IMG Engineering website (prototype v0.8)

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4. No CMS or database yet.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in at least one quote delivery channel
npm run dev                   # http://localhost:3000
npm run typecheck
npm run build && npm start    # production build
```

The site needs a Node.js server (the quote form uses a Route Handler), so static export is not used.

## Pages

All 32 sitemap pages are built (`/sitemap.xml`). Content lives in `src/content/`:

| File | Pages |
|---|---|
| `site.ts` | Homepage, global data (contacts, nav, services list, logos) |
| `hubs.ts` | `/za-doma/`, `/za-biznesa/` |
| `services.ts` | `/uslugi/[slug]/` (8) + `/za-doma/tsyalostno-reshenie/` |
| `projects.ts` | `/proekti/`, `/proekti/[slug]/` (9) |
| `guides.ts` | `/polezno/`, `/polezno/[slug]/` (3) |
| page files | `/za-nas/`, `/kontakti/`, `/poiskayte-oferta/`, `/poveritelnost/`, `/biskvitki/` |

## Quote form

- UI: `src/components/quote/QuoteForm.tsx`. Validation shared with the server: `src/lib/quote/schema.ts`.
- API: `POST /api/quote/` (`src/app/api/quote/route.ts`).
  - JavaScript: JSON in/out, inline errors, success panel.
  - No JavaScript: native form POST, 303 redirect to thank-you or error page.
- Prefill from links: `?za=doma|biznes` selects the audience, `?usluga=<service-slug>` selects the service.
- Delivery (`src/lib/quote/deliver.ts`), configured only by env vars (see `.env.example`):
  1. Email to IMG via Brevo (reply-to = customer).
  2. JSON webhook (e.g. Make.com) for CRM / Sheets / automation.
  3. Optional confirmation email to the visitor.
  Success when at least one of 1 or 2 succeeds. No channel configured → 503.
- Spam protection: same-origin check, honeypot field, minimum fill time (3 s), per-IP rate limit
  (5 per 10 min, in memory), server-side validation, link-stuffing check, HTML-escaped emails.
- Privacy: marketing consent is a separate, optional, unchecked box. Analytics events
  (`quote_form_start`, `quote_form_submit`) carry only audience and service, never personal data,
  and are pushed only if a `dataLayer` exists (i.e. after consent tooling is added).

## Content

All copy lives in `src/content/` (`site.ts`, `hubs.ts`, `services.ts`), shaped for a future headless CMS.

## Before launch (search the code)

- `PrototypeNote` and `status: "placeholder"`: replace with verified content.
- `robots` in `src/app/layout.tsx` and `src/app/robots.ts`: switch to indexable.
- Configure quote delivery env vars and send a real test request.
- Privacy policy page (`/poveritelnost/`) must exist before the form goes live.
