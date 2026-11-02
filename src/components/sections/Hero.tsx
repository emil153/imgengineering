import { company, hero } from "@/content/site";
import { HeroVideo } from "../HeroVideo";
import { ButtonLink, Eyebrow } from "../ui";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative border-b border-black/10">
      <div className="container-x grid gap-12 pb-12 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-20">
        <div className="flex flex-col justify-center lg:col-span-6">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            {hero.title[0]} <span className="text-img-grey-dark">{hero.title[1]}</span>
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
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light lg:aspect-[1138/808]">
            <HeroVideo src={hero.video.src} poster={hero.video.poster} width={hero.video.width} height={hero.video.height} />
          </div>
        </div>
      </div>

      {/* Verified trust bar (Blueprint module 2): only confirmed facts, no invented statistics. */}
      <div className="border-t border-black/10">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Основана", v: `${company.foundingYear} г.` },
            { k: "Офис", v: `${company.address.street}, ${company.address.city}` },
            { k: "Клиенти", v: "Дом и бизнес" },
            { k: "Телефон", v: company.phone.display, href: company.phone.href },
          ].map((item, i) => (
            <div
              key={item.k}
              className={
                "py-5 pr-4 " +
                (i % 2 === 1 ? "border-l border-black/10 pl-5 " : "") +
                (i >= 2 ? "border-t border-black/10 lg:border-t-0 " : "") +
                (i === 2 ? "lg:border-l lg:pl-5" : "")
              }
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">{item.k}</dt>
              <dd className="mt-1.5 text-[15px] font-medium md:text-base">
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
