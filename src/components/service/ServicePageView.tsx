import Image from "next/image";
import Link from "next/link";
import { hubB2B, hubB2C } from "@/content/hubs";
import { type ServicePage, getServicePage, serviceQuoteHref } from "@/content/services";
import { company, disciplineColor, partners, services } from "@/content/site";

const shortDescription = (slug: string) => services.find((x) => x.slug === slug)?.description ?? "";
import { JsonLd } from "@/lib/structured-data";
import { Breadcrumbs } from "../hub/Breadcrumbs";
import { FaqSection } from "../hub/FaqSection";
import { LogoWall } from "../LogoWall";
import { ContactCTA } from "../sections/ContactCTA";
import { ProcessSection } from "../sections/ProcessSection";
import { ServiceIcon } from "../ServiceIcon";
import { ArrowIcon, ButtonLink, Eyebrow, PhoneIcon, PlaceholderMedia } from "../ui";

/**
 * Service detail template (Master Brief section 7):
 * headline, explanation, benefits, applications, technical considerations,
 * system types, process, manufacturers, related work, FAQ, CTA.
 * Sections without verified content (e.g. no photos yet) are omitted, not faked.
 */
/** Lowercase a service name for use mid-sentence, keeping acronyms such as "ОВК". */
const inSentence = (name: string) => (name.length > 1 && name[1] === name[1].toUpperCase() && /\p{L}/u.test(name[1]) ? name : name[0].toLowerCase() + name.slice(1));

export function ServicePageView({ service }: { service: ServicePage }) {
  const quote = service.quote ?? serviceQuoteHref(service.slug);
  const path = service.path ?? `/uslugi/${service.slug}/`;
  const related = service.related.map(getServicePage).filter((s): s is ServicePage => Boolean(s));
  const audiences = [
    service.applications.b2c && { key: "b2c", label: "За дома", hub: hubB2C.path, ...service.applications.b2c },
    service.applications.b2b && { key: "b2b", label: "За бизнеса", hub: hubB2B.path, ...service.applications.b2b },
  ].filter(Boolean) as { key: string; label: string; hub: string; text: string; items: string[] }[];

  let n = 0;
  const idx = () => String(++n).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.h1,
          serviceType: service.name,
          description: service.seo.description,
          url: `${company.url}${path}`,
          areaServed: { "@type": "Country", name: "България" },
          provider: { "@type": "Organization", name: company.name, url: company.url, telephone: company.phone.display },
        }}
      />

      {/* Hero */}
      <section aria-labelledby="service-title" className="border-b border-black/10">
        <div className="container-x pt-8 md:pt-10">
          <Breadcrumbs items={service.crumbs ?? [{ label: "Услуги", href: "/uslugi/" }, { label: service.name, href: path }]} />
        </div>
        <div className="container-x grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-14">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em]">
              <span aria-hidden="true" className="h-2 w-2" style={{ background: disciplineColor[service.discipline] }} />
              {service.crumbs ? service.crumbs[0].label : "Услуги"}
              <ServiceIcon name={service.icon} className="ml-1 h-5 w-5" />
            </p>
            <h1 id="service-title" className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
              {service.h1}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-img-grey-dark md:text-xl">{service.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quote} withArrow data-event="quote_cta_click" data-location="service_hero" data-service={service.slug}>
                Поискайте оферта
              </ButtonLink>
              <ButtonLink href={company.phone.href} variant="secondary" data-event="click_to_call" data-location="service_hero" data-service={service.slug}>
                <PhoneIcon className="h-4 w-4" />
                {company.phone.display}
              </ButtonLink>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-img-grey-dark">{company.hours.display}</p>
          </div>
          <div className="lg:col-span-6">
            {service.hero ? (
              <div className="relative aspect-[16/9] overflow-hidden bg-img-grey-light lg:aspect-[4/3]">
                <Image src={service.hero.src} alt={service.hero.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <PlaceholderMedia label={service.name} note="Очаква се снимка от обект" className="aspect-[16/9] lg:aspect-[4/3]" />
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="py-20 md:py-24">
        <div className="container-x">
          <Eyebrow index={idx()}>Предимства</Eyebrow>
          <h2 id="benefits-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            Защо да изберете това решение
          </h2>
          <ul className="mt-12 grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b, i) => (
              <li
                key={b.title}
                className={
                  "reveal border-b border-black/10 py-7 sm:pr-6 lg:border-b-0 " +
                  (i > 0 ? "lg:border-l lg:pl-6 " : "") +
                  (i % 2 === 1 ? "sm:border-l sm:pl-6 " : "")
                }
              >
                <span className="font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-img-grey-dark">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Applications by audience */}
      <section aria-labelledby="apps-title" className="bg-img-grey-light py-20 md:py-24">
        <div className="container-x">
          <Eyebrow index={idx()}>Приложение</Eyebrow>
          <h2 id="apps-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            За кои обекти
          </h2>
          <div className={"mt-12 grid gap-6 lg:gap-8 " + (audiences.length > 1 ? "lg:grid-cols-2" : "lg:max-w-3xl")}>
            {audiences.map((a) => (
              <div key={a.key} id={a.key === "b2c" ? "za-doma" : "za-biznesa"} className="flex flex-col bg-white p-6 md:p-10">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.14em]">
                  <span className="mr-2 inline-block h-2 w-2 bg-img-green align-middle" aria-hidden="true" />
                  {a.label}
                </p>
                <p className="mt-5 text-lg leading-relaxed">{a.text}</p>
                <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
                  {a.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 border-b border-black/10 py-3 text-[15px]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-img-black" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href={a.hub} className="group mt-8 inline-flex items-center gap-2 self-start border-b border-current pb-1 text-[15px] font-medium hover:text-img-green">
                  Всички решения {a.key === "b2c" ? "за дома" : "за бизнеса"}
                  <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Considerations + system types */}
      <section aria-labelledby="tech-title" className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow index={idx()}>Технически аспекти</Eyebrow>
            <h2 id="tech-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.5rem]">
              {service.considerations.title}
            </h2>
            <ol className="mt-10 border-t border-black/15">
              {service.considerations.items.map((c, i) => (
                <li key={c} className="grid grid-cols-[2.5rem_1fr] border-b border-black/15 py-4 text-[17px] leading-snug">
                  <span className="pt-0.5 font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </li>
              ))}
            </ol>
          </div>
          {service.systems && (
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[2.5rem] lg:mt-[2.6rem]">{service.systems.title}</h2>
              {service.systems.note && <p className="mt-3 text-img-grey-dark">{service.systems.note}</p>}
              <ul className="mt-10 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
                {service.systems.items.map((s) => (
                  <li key={s.title} className="bg-white p-6">
                    <span aria-hidden="true" className="block h-[3px] w-8" style={{ background: disciplineColor[service.discipline] }} />
                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-img-grey-dark">{s.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <div className="border-t border-black/10">
        <ProcessSection index={idx()} title="Как изпълняваме услугата" steps={service.process} />
      </div>

      {/* Related work + manufacturers */}
      <section aria-labelledby="work-title" className="border-t border-black/10 py-20 md:py-28">
        <div className="container-x">
          {service.gallery.length > 0 && (
            <>
              <Eyebrow index={idx()}>Изпълнени обекти</Eyebrow>
              <h2 id="work-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
                От нашата практика
              </h2>
              <ul className={"mt-12 grid grid-cols-2 gap-3 md:gap-4 " + (service.gallery.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
                {service.gallery.map((p) => (
                  <li key={p.src}>
                    <figure>
                      <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
                        <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                      </div>
                      <figcaption className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-[0.1em] text-img-grey-dark">{p.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className={service.gallery.length > 0 ? "mt-16 border-t border-black/10 pt-10" : ""}>
            <p id={service.gallery.length ? undefined : "work-title"} className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">
              Производители, с които работим
            </p>
            <div className="mt-8">
              <LogoWall items={partners} label="Производители на оборудване, с които работи IMG Engineering" emptyNote="" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="border-t border-black/10 bg-img-grey-light">
        <FaqSection index={idx()} title={`Въпроси за ${inSentence(service.name)}`} items={service.faq} />
      </div>

      {/* Related services */}
      <section aria-labelledby="related-title" className="py-20 md:py-24">
        <div className="container-x">
          <h2 id="related-title" className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">
            Свързани услуги
          </h2>
          <ul className="mt-6 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="bg-white">
                <Link href={`/uslugi/${r.slug}/`} className="group flex h-full items-start gap-5 p-6 transition-colors hover:bg-img-grey-light lg:p-7">
                  <ServiceIcon name={r.icon} className="h-8 w-8 shrink-0" />
                  <span className="flex-1">
                    <span className="block text-lg font-semibold group-hover:text-img-green">{r.name}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-img-grey-dark">{shortDescription(r.slug)}</span>
                  </span>
                  <ArrowIcon className="mt-1.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA
        index={idx()}
        title={`Нуждаете се от ${inSentence(service.name)}?`}
        text="Разкажете ни за обекта и ще ви помогнем да изберете подходящото техническо решение."
        href={quote}
        showSegments={false}
      />
    </>
  );
}
