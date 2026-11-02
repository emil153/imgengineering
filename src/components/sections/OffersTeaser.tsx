import Link from "next/link";
import { getOffer, newCustomerOffer } from "@/content/offers";
import { OfferCard } from "../offers/OfferCard";
import { ArrowIcon, ArrowLink, SectionHeader } from "../ui";

/** Homepage promo: the headline offer + the new-customer discount. Only confirmed offers. */
export function OffersTeaser() {
  const headline = getOffer("podovo-otoplenie-22-eur");
  return (
    <section aria-labelledby="offers-teaser-title" className="py-20 md:py-24">
      <div className="container-x">
        <SectionHeader index="01" eyebrow="Актуални оферти" title="Предложения за сезона." id="offers-teaser-title">
          <ArrowLink href="/oferti/">Всички оферти</ArrowLink>
        </SectionHeader>
        <div data-stagger className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {headline && <OfferCard offer={headline} compact />}
          <Link
            href="/oferti/#novi-klienti"
            data-event="offer_cta_click"
            data-offer={newCustomerOffer.slug}
            className="lift group relative flex flex-col justify-between overflow-hidden bg-img-green p-8 text-white md:p-10"
          >
            <span aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-white/10 transition-transform duration-700 group-hover:scale-110" />
            <span aria-hidden="true" className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-img-yellow/20" />
            <div className="relative">
              <span className="bg-img-yellow px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-img-black">{newCustomerOffer.badge}</span>
              <p className="mt-8 text-[5.5rem] font-semibold leading-none tracking-[-0.05em] md:text-[7rem]">−5%</p>
              <h3 className="mt-4 max-w-sm text-balance text-2xl font-semibold leading-tight md:text-3xl">отстъпка за първата ви поръчка</h3>
              <p className="mt-4 max-w-md leading-relaxed text-white/80">Валидна за всички услуги. Попълнете кратката форма и отстъпката ще бъде отразена в офертата за вашия обект.</p>
            </div>
            <span className="relative mt-10 inline-flex min-h-12 items-center gap-3 self-start bg-white px-6 font-medium text-img-black transition-colors group-hover:bg-img-yellow">
              Вземете отстъпката
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
