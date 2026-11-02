import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { OfferCard } from "@/components/offers/OfferCard";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Eyebrow, PrototypeNote, cx, tone } from "@/components/ui";
import { currentSeasonKey, newCustomerOffer, seasons, visibleOffers } from "@/content/offers";

export const revalidate = 86400; // daily, so the highlighted season follows the calendar

const description =
  "Актуални оферти на IMG Engineering: водно подово отопление от 22 € / m² с доставка и монтаж, 5% отстъпка за нови клиенти и сезонни предложения.";

export const metadata: Metadata = {
  title: { absolute: "Актуални оферти | IMG Engineering" },
  description,
  alternates: { canonical: "/oferti/" },
  openGraph: { title: "Актуални оферти", description, url: "/oferti/", images: [{ url: "/images/dom-podovo-otoplenie-kragove.webp" }] },
};

export default function OffersPage() {
  const seasonKey = currentSeasonKey();
  const season = seasons.find((s) => s.key === seasonKey)!;
  const list = visibleOffers.filter((o) => o.slug !== newCustomerOffer.slug);
  const hasUnconfirmed = visibleOffers.some((o) => o.status !== "confirmed");

  return (
    <>
      <section aria-labelledby="offers-title" className="relative overflow-hidden border-b border-black/10 bg-img-yellow-soft">
        <span aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-img-yellow/40 blur-0" />
        <span aria-hidden="true" className="absolute -bottom-32 right-48 h-56 w-56 rounded-full bg-img-red-tint/50" />
        <div className="container-x relative pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "Оферти", href: "/oferti/" }]} />
        </div>
        <div className="container-x relative grid gap-8 pb-14 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-7">
            <Eyebrow>Оферти</Eyebrow>
            <h1 id="offers-title" className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
              Актуални оферти за отопление и климатизация.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-img-grey-dark md:text-xl">
              Предложения за дома и бизнеса, съобразени със сезона. Изберете оферта и я отбележете в запитването си.
            </p>
          </div>
          <div className="self-end lg:col-span-5">
            <div className={cx("border-l-4 bg-white p-6", tone[season.tone].border)}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Сега е сезонът за</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.015em]">{season.title}</p>
              <p className="mt-2 leading-relaxed text-img-grey-dark">{season.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="current-offers" className="py-16 md:py-24">
        <div className="container-x">
          <Eyebrow index="01">Оферти</Eyebrow>
          <h2 id="current-offers" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            Текущи предложения
          </h2>
          {hasUnconfirmed && (
            <PrototypeNote className="mt-6">
              Офертите с означение „Очаква потвърждение“ или „Предложение“ са чернови за одобрение от IMG Engineering и се скриват преди публикуване, ако не бъдат потвърдени.
            </PrototypeNote>
          )}
          <ul data-stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {list.map((o) => (
              <li key={o.slug}>
                <OfferCard offer={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="novi-klienti" aria-labelledby="new-customers" className="bg-img-green-soft py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow index="02">{newCustomerOffer.badge}</Eyebrow>
              <h2 id="new-customers" className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                <span className="text-img-green">5% отстъпка</span> за първата ви поръчка.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-img-grey-dark">{newCustomerOffer.lead}</p>
              <ul className="mt-8 space-y-3">
                {["Валидна за всички наши услуги", "Отстъпката се отразява директно в офертата", "Без ангажимент: първо получавате оферта"].map((i) => (
                  <li key={i} className="flex gap-3 text-[17px]">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-img-green" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-black/10 pt-5 text-sm leading-relaxed text-img-grey-dark">
                <p className="font-medium text-img-black">Условия</p>
                {newCustomerOffer.conditions.map((c) => (
                  <p key={c} className="mt-1">
                    {c}
                  </p>
                ))}
                <p className="mt-1">Валидност: {newCustomerOffer.validity}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <QuoteForm offer={newCustomerOffer.slug} submitLabel="Вземете 5% отстъпка" />
          </div>
        </div>
      </section>

      <section aria-labelledby="season-calendar" className="py-16 md:py-24">
        <div className="container-x">
          <Eyebrow index="03">Сезонен календар</Eyebrow>
          <h2 id="season-calendar" className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            Кога е най-подходящо да планирате
          </h2>
          <ol data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s) => {
              const current = s.key === seasonKey;
              return (
                <li key={s.key} className={cx("relative flex flex-col p-6 transition-colors", current ? cx(tone[s.tone].soft, "ring-2 ring-img-black") : cx("border border-black/10 bg-white transition-colors", tone[s.tone].hoverSoft))}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">{s.name}</span>
                    {current && <span className="bg-img-black px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white">Сега</span>}
                  </div>
                  <span aria-hidden="true" className={cx("mt-4 block h-1 w-10", tone[s.tone].solid)} />
                  <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-img-grey-dark">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <ContactCTA index="04" title="Не намирате подходяща оферта?" text="Изпратете запитване за вашия обект и ще подготвим индивидуално предложение." />
    </>
  );
}
