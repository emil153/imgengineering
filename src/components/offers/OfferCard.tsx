import Image from "next/image";
import Link from "next/link";
import { offerQuoteHref, type Offer } from "@/content/offers";
import { ArrowIcon, cx, tone } from "../ui";

export function OfferStatus({ offer }: { offer: Offer }) {
  if (offer.status === "confirmed") return null;
  return (
    <span className="inline-flex items-center border border-dashed border-black/40 bg-white/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-img-grey-dark">
      {offer.status === "to-confirm" ? "Очаква потвърждение" : "Предложение · очаква одобрение"}
    </span>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-img-green" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/** Offer teaser/detail card. `compact` shows fewer details (homepage). */
export function OfferCard({ offer, compact = false, headingLevel = "h3" }: { offer: Offer; compact?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const t = tone[offer.tone];
  return (
    <article className={cx("lift group flex h-full flex-col", t.soft)}>
      {offer.media && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={offer.media.src} alt={offer.media.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          <span className={cx("absolute left-0 top-4 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em]", offer.tone === "yellow" || offer.tone === "blue" ? "bg-img-black text-white" : cx(t.solid, "text-white"))}>
            {offer.badge}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        {!offer.media && (
          <span className={cx("self-start px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em]", offer.tone === "yellow" || offer.tone === "blue" ? "bg-img-black text-white" : cx(t.solid, "text-white"))}>
            {offer.badge}
          </span>
        )}
        <div className={cx("flex flex-wrap items-center gap-2", offer.media ? "" : "mt-4")}>
          <OfferStatus offer={offer} />
        </div>
        <H className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-[-0.015em]">{offer.title}</H>
        {offer.price && (
          <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
            {offer.price.prefix && <span className="text-lg text-img-grey-dark">{offer.price.prefix}</span>}
            <span className="text-5xl font-semibold tracking-[-0.03em]">{offer.price.value}</span>
            {offer.price.unit && <span className="text-xl font-medium">{offer.price.unit}</span>}
            {offer.price.note && <span className="w-full text-sm text-img-grey-dark">{offer.price.note}</span>}
          </p>
        )}
        <p className="mt-4 leading-relaxed text-img-grey-dark">{offer.lead}</p>
        {!compact && offer.includes.length > 0 && (
          <ul className="mt-5 space-y-2">
            {offer.includes.map((i) => (
              <li key={i} className="flex gap-2.5 text-[15px] leading-snug">
                <Check />
                {i}
              </li>
            ))}
          </ul>
        )}
        {!compact && (
          <details className="mt-5 border-t border-black/10 pt-4 text-sm text-img-grey-dark">
            <summary className="cursor-pointer font-medium text-img-black hover:text-img-green">Условия</summary>
            <ul className="mt-2 space-y-1.5">
              {offer.conditions.map((c) => (
                <li key={c}>{c}</li>
              ))}
              <li>Валидност: {offer.validity}</li>
            </ul>
          </details>
        )}
        <div className="mt-auto pt-6">
          <Link
            href={offerQuoteHref(offer)}
            data-event="offer_cta_click"
            data-offer={offer.slug}
            className="inline-flex min-h-11 items-center gap-3 bg-img-black px-5 text-[15px] font-medium text-white transition-colors hover:bg-img-green"
          >
            Възползвайте се
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
