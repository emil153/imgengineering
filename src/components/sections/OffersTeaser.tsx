import Link from "next/link";
import { freeVisit, getOffer } from "@/content/offers";
import { OfferCard } from "../offers/OfferCard";
import { ArrowIcon, ArrowLink, SectionHeader } from "../ui";

/** Homepage promo: the headline offer + the free site visit / heating calculation. */
export function OffersTeaser() {
  const headline = getOffer("podovo-otoplenie-22-eur");
  return (
    <section aria-labelledby="offers-teaser-title" className="py-20 md:py-24">
      <div className="container-x">
        <SectionHeader index="01" eyebrow="Актуално" title="Оферта и безплатен оглед." id="offers-teaser-title">
          <ArrowLink href="/oferti/">Вижте офертата</ArrowLink>
        </SectionHeader>
        <div data-stagger className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {headline && <OfferCard offer={headline} compact />}
          <FreeVisitCard />
        </div>
      </div>
    </section>
  );
}

export function FreeVisitCard() {
  return (
    <Link
      href={freeVisit.href}
      data-event="free_visit_click"
      className="lift group relative flex flex-col justify-between overflow-hidden bg-img-green p-8 text-white md:p-10"
    >
      <span aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-white/10 transition-transform duration-700 group-hover:scale-110" />
      <span aria-hidden="true" className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-img-yellow/20" />
      <div className="relative">
        <span className="bg-img-yellow px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-img-black">Безплатно</span>
        <svg aria-hidden="true" viewBox="0 0 48 48" className="mt-8 h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="7" y="5" width="34" height="38" rx="2" />
          <path d="M14 14h20M14 22h8M26 22h8M14 30h8M26 30h8M14 37h20" />
        </svg>
        <h3 className="mt-6 max-w-md text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">{freeVisit.title}</h3>
        <p className="mt-4 max-w-md leading-relaxed text-white/80">{freeVisit.text}</p>
        <p className="mt-3 text-sm text-white/70">{freeVisit.condition}</p>
      </div>
      <span className="relative mt-10 inline-flex min-h-12 items-center gap-3 self-start bg-white px-6 font-medium text-img-black transition-colors group-hover:bg-img-yellow">
        Заявете безплатен оглед
        <ArrowIcon className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
