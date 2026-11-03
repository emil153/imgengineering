import type { ReactNode } from "react";
import Link from "next/link";
import { getOffer } from "@/content/offers";
import { company, hero } from "@/content/site";
import { CountUp } from "../CountUp";
import { HeroVideo } from "../HeroVideo";
import { FreeVisitNote } from "../offers/FreeVisitNote";
import { ArrowIcon, ButtonLink, Eyebrow, cx, tone, type Tone } from "../ui";

const yearsInBusiness = () => new Date().getFullYear() - company.foundingYear;

export function Hero() {
  const offer = getOffer("podovo-otoplenie-22-eur");
  const facts: { k: string; v: ReactNode; tone: Tone; href?: string }[] = [
    { k: "Опит", v: <><CountUp to={yearsInBusiness()} /> години</>, tone: "blue" },
    { k: "Основана", v: `${company.foundingYear} г.`, tone: "red" },
    { k: "Клиенти", v: "Дом и бизнес", tone: "yellow" },
    { k: "Телефон", v: company.phone.display, tone: "green", href: company.phone.href },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-black/10">
      {/* brand color field behind the media column */}
      <span aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[42%] bg-img-blue-soft lg:block" />
      <span aria-hidden="true" className="absolute bottom-0 right-0 hidden h-2 w-[42%] bg-img-blue lg:block" />

      <div className="container-x relative grid gap-12 pb-12 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center lg:col-span-6">
          {offer && (
            <Link
              href="/oferti/"
              data-event="offer_cta_click"
              data-location="hero_chip"
              className="group mb-8 inline-flex items-center gap-3 self-start bg-img-yellow-soft py-1.5 pl-1.5 pr-4 text-[14px] transition-colors hover:bg-img-yellow"
            >
              <span className="bg-img-red px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white">Актуално</span>
              <span className="font-medium">{offer.banner}</span>
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            {hero.title[0]} <span className="text-img-grey-dark">{hero.title[1].split(" ")[0]}</span>{" "}
            <span className="text-img-green underline decoration-img-yellow decoration-[0.14em] underline-offset-[0.14em] [text-decoration-skip-ink:none]">
              {hero.title[1].split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-img-grey-dark md:text-xl">{hero.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primary.href} withArrow data-event="quote_cta_click" data-location="hero">
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <FreeVisitNote className="mt-6" />
        </div>

        <div className="relative lg:col-span-6">
          <span aria-hidden="true" className="absolute -left-4 -top-4 hidden h-24 w-24 bg-img-yellow md:block" />
          <span aria-hidden="true" className="absolute -bottom-4 -right-4 hidden h-16 w-16 bg-img-red md:block" />
          <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] lg:aspect-[1138/808]">
            <HeroVideo src={hero.video.src} poster={hero.video.poster} width={hero.video.width} height={hero.video.height} />
          </div>
        </div>
      </div>

      {/* Verified facts only. Years computed from the confirmed founding year. */}
      <div className="relative border-t border-black/10 bg-white">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {facts.map((item, i) => (
            <div
              key={item.k}
              className={cx(
                "group relative py-5 pr-4 transition-colors",
                tone[item.tone].hoverSoft,
                i % 2 === 1 && "border-l border-black/10 pl-5",
                i >= 2 && "border-t border-black/10 lg:border-t-0",
                i === 2 && "lg:border-l lg:pl-5",
              )}
            >
              <span aria-hidden="true" className={cx("absolute left-0 top-0 h-[3px] w-10 transition-all duration-300 group-hover:w-full", tone[item.tone].solid, i % 2 === 1 && "left-0")} />
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">{item.k}</dt>
              <dd className="mt-1.5 text-lg font-semibold md:text-xl">
                {item.href ? (
                  <a href={item.href} data-event="click_to_call" data-location="trust_bar" className="hover:text-img-green">
                    {item.v}
                  </a>
                ) : (
                  item.v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
