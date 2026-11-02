import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ArrowIcon, Eyebrow, PlaceholderMedia } from "@/components/ui";
import { hubB2B, hubB2C } from "@/content/hubs";
import { servicePages } from "@/content/services";
import { disciplineColor, services } from "@/content/site";
import { JsonLd } from "@/lib/structured-data";

const title = "Отопление, вентилация и климатизация";
const description =
  "Всички услуги на IMG Engineering: отопление, вентилация, климатизация, термопомпи, подово отопление, ОВК проектиране, газификация, сервиз и поддръжка.";

export const metadata: Metadata = {
  title: { absolute: `${title} | IMG Engineering` },
  description,
  alternates: { canonical: "/uslugi/" },
  openGraph: { title, description, url: "/uslugi/" },
};

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: servicePages.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `https://imgengi.com/uslugi/${s.slug}/`,
          })),
        }}
      />
      <section aria-labelledby="services-index-title" className="border-b border-black/10">
        <div className="container-x pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi/" }]} />
        </div>
        <div className="container-x grid gap-8 pb-14 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-8">
            <Eyebrow>Услуги</Eyebrow>
            <h1
              id="services-index-title"
              className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]"
            >
              Отопление, вентилация и климатизация от проекта до поддръжката.
            </h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-img-grey-dark lg:col-span-4">
            Осем направления, които покриват целия жизнен цикъл на сградните инсталации: проектиране, доставка, монтаж и сервиз.
          </p>
        </div>
      </section>

      <section aria-label="Списък с услуги" className="py-16 md:py-24">
        <ul className="container-x grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {servicePages.map((s, i) => (
            <li key={s.slug} className="reveal">
              <Link href={`/uslugi/${s.slug}/`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
                  {s.hero ? (
                    <Image
                      src={s.hero.src}
                      alt={s.hero.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PlaceholderMedia label={s.name} note="Очаква се снимка" className="h-full" />
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-xs text-img-grey-dark">
                    <span aria-hidden="true" className="h-2 w-2" style={{ background: disciplineColor[s.discipline] }} />
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ServiceIcon name={s.icon} className="h-7 w-7" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.01em] group-hover:text-img-green">{s.name}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-img-grey-dark">{services.find((x) => x.slug === s.slug)?.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                  Научете повече
                  <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="route-title" className="bg-img-grey-light py-16 md:py-20">
        <div className="container-x">
          <h2 id="route-title" className="text-3xl font-semibold tracking-[-0.02em] md:text-[2.5rem]">
            Търсите решение за конкретен обект?
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {[hubB2C, hubB2B].map((h) => (
              <Link key={h.key} href={h.path} data-event="audience_route_select" data-audience={h.key} className="group flex items-center justify-between gap-6 bg-white p-6 md:p-8">
                <span>
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.14em]">
                    <span className="mr-2 inline-block h-2 w-2 bg-img-green align-middle" aria-hidden="true" />
                    {h.eyebrow}
                  </span>
                  <span className="mt-3 block text-xl font-semibold group-hover:text-img-green md:text-2xl">{h.title}</span>
                </span>
                <ArrowIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA index="01" />
    </>
  );
}
