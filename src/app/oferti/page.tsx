import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ArrowIcon, Eyebrow, cx, tone } from "@/components/ui";
import { currentSeasonKey, freeVisit, getOffer, offerQuoteHref, seasons } from "@/content/offers";

export const revalidate = 86400; // daily, so the highlighted season follows the calendar

const description =
  "Водно подово отопление от 22 € / m² без ДДС с тръба HERZ 16 × 2, подложка SPS 200, доставка и монтаж. Безплатен оглед или изчисление на отоплението.";

export const metadata: Metadata = {
  title: { absolute: "Оферта: подово отопление от 22 € / m² | IMG Engineering" },
  description,
  alternates: { canonical: "/oferti/" },
  openGraph: { title: "Водно подово отопление от 22 € / m²", description, url: "/oferti/", images: [{ url: "/images/dom-podovo-otoplenie-kragove.webp" }] },
};

function Check({ className = "text-img-green" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={cx("mt-1 h-5 w-5 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export default function OffersPage() {
  const offer = getOffer("podovo-otoplenie-22-eur")!;
  const seasonKey = currentSeasonKey();
  const season = seasons.find((s) => s.key === seasonKey)!;

  return (
    <>
      {/* Offer hero */}
      <section aria-labelledby="offer-title" className="relative overflow-hidden border-b border-black/10 bg-img-red-soft">
        <span aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-img-red-tint/60" />
        <div className="container-x relative pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "Оферти", href: "/oferti/" }]} />
        </div>
        <div className="container-x relative grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-6">
            <span className="bg-img-red px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white">{offer.badge}</span>
            <h1 id="offer-title" className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]">
              Водно подово отопление с доставка и монтаж.
            </h1>
            {offer.price && (
              <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
                <span className="text-2xl text-img-grey-dark">{offer.price.prefix}</span>
                <span className="text-7xl font-semibold tracking-[-0.04em] md:text-8xl">{offer.price.value}</span>
                <span className="text-3xl font-medium">{offer.price.unit}</span>
                <span className="w-full text-[15px] text-img-grey-dark">{offer.price.note}</span>
              </p>
            )}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-img-grey-dark">{offer.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={offerQuoteHref(offer)} data-event="offer_cta_click" data-offer={offer.slug} className="group inline-flex min-h-12 items-center justify-center gap-3 bg-img-green px-6 font-medium text-white transition-colors hover:bg-img-green-hover">
                Поискайте оферта за вашия обект
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#bezplaten-ogled" className="inline-flex min-h-12 items-center justify-center border border-img-black px-6 font-medium transition-colors hover:bg-img-black hover:text-white">
                Безплатен оглед или изчисление
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            {offer.media && (
              <div className="relative aspect-[4/3] overflow-hidden shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
                <Image src={offer.media.src} alt={offer.media.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What is included */}
      <section aria-labelledby="included-title" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="01">Офертата включва</Eyebrow>
            <h2 id="included-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
              Материали, доставка и монтаж
            </h2>
            <div className="mt-8 border-t border-black/10 pt-5 text-[15px] leading-relaxed text-img-grey-dark">
              <p className="font-medium text-img-black">Условия</p>
              {offer.conditions.map((c) => (
                <p key={c} className="mt-1">
                  {c}
                </p>
              ))}
              <p className="mt-1">Валидност: {offer.validity}</p>
            </div>
          </div>
          <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {offer.includes.map((item, i) => {
              const [title, detail] = item.split(": ");
              return (
                <li key={item} className={cx("lift flex gap-3 p-6", tone[(["red", "blue", "yellow", "green"] as const)[i % 4]].soft)}>
                  <Check />
                  <span>
                    <span className="block font-semibold">{title}</span>
                    {detail && <span className="mt-1 block text-[15px] leading-relaxed text-img-grey-dark">{detail}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Free site visit / heating calculation with form */}
      <section id="bezplaten-ogled" aria-labelledby="free-visit-title" className="scroll-mt-28 bg-img-green-soft py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow index="02">Безплатно</Eyebrow>
              <h2 id="free-visit-title" className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                <span className="text-img-green">Безплатен оглед</span> или изчисление на отоплението.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-img-grey-dark">{freeVisit.text}</p>
              <ul className="mt-8 space-y-3">
                {freeVisit.points.map((i) => (
                  <li key={i} className="flex gap-3 text-[17px]">
                    <Check />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-black/10 pt-5 text-sm leading-relaxed text-img-grey-dark">{freeVisit.condition}</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <QuoteForm freeVisitDefault submitLabel="Заявете безплатен оглед" />
          </div>
        </div>
      </section>

      {/* Season calendar: advice, not offers */}
      <section aria-labelledby="season-calendar" className="py-16 md:py-24">
        <div className="container-x">
          <Eyebrow index="03">Сезонен календар</Eyebrow>
          <h2 id="season-calendar" className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            Кога е най-подходящо да планирате
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-img-grey-dark">
            Сега: <span className="font-semibold text-img-black">{season.title.toLowerCase()}</span>.
          </p>
          <ol data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s) => {
              const current = s.key === seasonKey;
              return (
                <li key={s.key} className={cx("relative flex flex-col p-6 transition-colors", current ? cx(tone[s.tone].soft, "ring-2 ring-img-black") : cx("border border-black/10 bg-white", tone[s.tone].hoverSoft))}>
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

      <ContactCTA index="04" title="Имате въпроси за офертата?" text="Обадете се или изпратете запитване и ще подготвим предложение за вашия обект." />
    </>
  );
}
