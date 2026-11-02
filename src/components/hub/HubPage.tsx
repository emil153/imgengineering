import Image from "next/image";
import Link from "next/link";
import type { Hub } from "@/content/hubs";
import { clients, company, partners } from "@/content/site";
import { LogoWall } from "../LogoWall";
import { ContactCTA } from "../sections/ContactCTA";
import { ProcessSection } from "../sections/ProcessSection";
import { ArrowIcon, ButtonLink, Eyebrow, PhoneIcon, TONES, cx, tone } from "../ui";
import { Breadcrumbs } from "./Breadcrumbs";
import { FaqSection } from "./FaqSection";

/**
 * One template for both audience hubs (За дома / За бизнеса).
 * Same sections, same order, same visual weight: only content differs.
 */
export function HubPage({ hub }: { hub: Hub }) {
  const logos = hub.proof.logos === "partners" ? partners : clients;
  const t = tone[hub.key === "b2c" ? "yellow" : "blue"];

  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="hub-title" className={cx("relative overflow-hidden border-b border-black/10", t.soft)}>
        <span aria-hidden="true" className={cx("absolute -right-20 -top-20 hidden h-80 w-80 rounded-full opacity-60 lg:block", t.tint)} />
        <div className="container-x relative pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: hub.breadcrumb, href: hub.path }]} />
        </div>
        <div className="container-x relative grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-14">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em]">
              <span className="mr-2 inline-block h-2 w-2 bg-img-green align-middle" aria-hidden="true" />
              {hub.eyebrow}
            </p>
            <h1
              id="hub-title"
              className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]"
            >
              {hub.title}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-img-grey-dark md:text-xl">{hub.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={hub.quoteHref} withArrow data-event="quote_cta_click" data-location="hub_hero" data-audience={hub.key}>
                Поискайте оферта
              </ButtonLink>
              <ButtonLink href={company.phone.href} variant="secondary" data-event="click_to_call" data-location="hub_hero" data-audience={hub.key}>
                <PhoneIcon className="h-4 w-4" />
                {company.phone.display}
              </ButtonLink>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-img-grey-dark">{company.hours.display}</p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/9] overflow-hidden bg-img-grey-light lg:aspect-[4/3]">
              <Image src={hub.hero.src} alt={hub.hero.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who it is for */}
      <section aria-labelledby="fit-title" className="py-20 md:py-24">
        <div className="container-x">
          <Eyebrow index="01">{hub.eyebrow}</Eyebrow>
          <h2 id="fit-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            {hub.fit.title}
          </h2>
          <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hub.fit.items.map((f, i) => (
              <li key={f.title} className={cx("lift p-6", tone[TONES[i % 4]].soft)}>
                <span className="font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-img-grey-dark">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Solutions */}
      <section aria-labelledby="solutions-title" className={cx("py-20 md:py-28", t.soft)}>
        <div className="container-x">
          <Eyebrow index="02">Решения</Eyebrow>
          <h2 id="solutions-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            {hub.solutions.title}
          </h2>

          <ul data-stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {hub.solutions.items.map((s, i) => (
              <li key={s.href} className="reveal">
                <Link
                  href={s.href}
                  data-event="audience_route_select"
                  data-audience={hub.key}
                  className="lift group flex h-full flex-col bg-white sm:flex-row"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light sm:aspect-auto sm:w-[44%] sm:shrink-0">
                    <Image
                      src={s.media.src}
                      alt={s.media.alt}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 44vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <span className="font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] group-hover:text-img-green">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-img-grey-dark">{s.text}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium">
                      Научете повече
                      <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Service strip, same on both hubs */}
          <Link
            href={hub.service.href}
            className="group mt-6 grid overflow-hidden bg-img-black text-white sm:grid-cols-[1fr_auto] lg:mt-8"
          >
            <div className="flex flex-col justify-center p-6 md:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">След монтажа</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.015em] group-hover:text-img-yellow">{hub.service.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-white/70">{hub.service.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                Научете повече
                <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
            <div className="relative hidden w-72 sm:block">
              <Image src={hub.service.media.src} alt={hub.service.media.alt} fill sizes="288px" className="object-cover" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Proof: real project photos + logos */}
      <section aria-labelledby="proof-title" className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow index="03">Изпълнени обекти</Eyebrow>
              <h2 id="proof-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
                {hub.proof.title}
              </h2>
            </div>
            <p className="self-end leading-relaxed text-img-grey-dark lg:col-span-5">{hub.proof.text}</p>
          </div>

          <ul data-stagger className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {hub.proof.gallery.map((g) => (
              <li key={g.src}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.05]" />
                  </div>
                  <figcaption className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-[0.1em] text-img-grey-dark">
                    {g.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-16 border-t border-black/10 pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">{hub.proof.logosTitle}</p>
            <div className="mt-8">
              <LogoWall items={logos} label={hub.proof.logosTitle} emptyNote="" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <div className="border-t border-black/10">
        <ProcessSection index="04" />
      </div>

      {/* 6. FAQ */}
      <div className="border-t border-black/10 bg-img-blue-soft">
        <FaqSection index="05" title={hub.faq.title} items={hub.faq.items} />
      </div>

      {/* 7. Conversion */}
      <ContactCTA index="06" title={hub.cta.title} text={hub.cta.text} href={hub.quoteHref} showSegments={false} />
    </>
  );
}
