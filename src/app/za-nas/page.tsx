import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { LogoWall } from "@/components/LogoWall";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Eyebrow, PrototypeNote } from "@/components/ui";
import { clients, company, partners, principles, services, teamPhoto } from "@/content/site";
import { JsonLd, organizationSchema } from "@/lib/structured-data";

const title = "За нас";
const description =
  "IMG Engineering е българска инженерна компания, основана през 1995 г. Проектиране, доставка, монтаж и поддръжка на отоплителни, климатични и вентилационни системи.";

export const metadata: Metadata = {
  title: { absolute: `За нас | IMG Engineering` },
  description,
  alternates: { canonical: "/za-nas/" },
  openGraph: { title, description, url: "/za-nas/", images: [{ url: teamPhoto.src }] },
};

const scope = [
  { title: "Проектиране", text: "ОВК проекти и техническо решение според изискванията на сградата." },
  { title: "Доставка", text: "Подбор и доставка на оборудване от утвърдени производители." },
  { title: "Монтаж", text: "Изграждане, изпитване и въвеждане на инсталациите в експлоатация." },
  { title: "Поддръжка", text: "Сервиз и техническо обслужване във времето." },
];

const team = [
  { src: "/images/montazh-termopompa-vazduh-voda.webp", width: 1013, height: 760, alt: "Екип на IMG Engineering монтира термопомпа въздух-вода", caption: "Монтаж на термопомпа" },
  { src: "/images/dom-ekip-montazh-termopompa.webp", width: 1013, height: 760, alt: "Техници на IMG Engineering свързват външното тяло на термопомпа", caption: "Свързване на външно тяло" },
  { src: "/images/biznes-montazh-avtovishka.webp", width: 750, height: 562, alt: "Монтаж на въздуховоди по фасада с автовишка", caption: "Монтаж на височина" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{ ...organizationSchema(), "@type": "Organization", description }} />
      <section aria-labelledby="about-title" className="border-b border-black/10">
        <div className="container-x pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "За нас", href: "/za-nas/" }]} />
        </div>
        <div className="container-x grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-14">
          <div className="flex flex-col justify-center lg:col-span-6">
            <Eyebrow>За нас</Eyebrow>
            <h1 id="about-title" className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]">
              Инженерен партньор за отопление, климатизация и вентилация от {company.foundingYear} г.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-img-grey-dark md:text-xl">
              IMG Engineering е българска инженерна компания, която предлага цялостни решения за отопление, климатизация и вентилация: от техническото планиране и избора на оборудване до професионалния монтаж и дългосрочната поддръжка.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[3/2] overflow-hidden bg-img-grey-light">
              <Image src={teamPhoto.src} alt={teamPhoto.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
        <dl className="container-x grid grid-cols-2 border-t border-black/10 lg:grid-cols-4">
          {[
            ["Основана", `${company.foundingYear} г.`],
            ["Дружество", `${company.legalName}, ЕИК ${company.eik}`],
            ["Офис", `${company.address.street}, ${company.address.city}`],
            ["Клиенти", "Дом и бизнес"],
          ].map(([k, v], i) => (
            <div key={k} className={"py-5 pr-4 " + (i % 2 === 1 ? "border-l border-black/10 pl-5 " : "") + (i >= 2 ? "border-t border-black/10 lg:border-t-0 " : "") + (i === 2 ? "lg:border-l lg:pl-5" : "")}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">{k}</dt>
              <dd className="mt-1.5 text-[15px] font-medium md:text-base">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="scope-title" className="py-20 md:py-24">
        <div className="container-x">
          <Eyebrow index="01">Какво правим</Eyebrow>
          <h2 id="scope-title" className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            Целият цикъл на сградните инсталации от един партньор.
          </h2>
          <ul className="mt-12 grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {scope.map((s, i) => (
              <li key={s.title} className={"border-b border-black/10 py-7 sm:pr-6 lg:border-b-0 " + (i > 0 ? "lg:border-l lg:pl-6 " : "") + (i % 2 === 1 ? "sm:border-l sm:pl-6 " : "")}>
                <span className="font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-img-grey-dark">{s.text}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-12 flex flex-wrap gap-3" aria-label="Услуги">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/uslugi/${s.slug}/`} className="inline-flex items-center gap-2 border border-black/20 px-4 py-2 text-[15px] font-medium transition-colors hover:border-img-black hover:bg-img-black hover:text-white">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="bg-img-green-soft py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="02">Нашият подход</Eyebrow>
            <h2 id="approach-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
              Как работим
            </h2>
          </div>
          <ol className="border-t border-black/15 lg:col-span-8">
            {principles.map((p, i) => (
              <li key={p.title} className="grid gap-4 border-b border-black/15 py-8 sm:grid-cols-[5rem_1fr]">
                <span className="font-mono text-sm text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.015em]">{p.title}</h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-img-grey-dark">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="team-title" className="py-20 md:py-24">
        <div className="container-x">
          <Eyebrow index="03">Екипът</Eyebrow>
          <h2 id="team-title" className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
            На обект
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {team.map((t) => (
              <li key={t.src}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
                    <Image src={t.src} alt={t.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-img-grey-dark">{t.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <PrototypeNote className="mt-10">
            Тук ще бъдат добавени историята на компанията, ключовите хора и сертификатите, след като бъдат предоставени и потвърдени от IMG Engineering.
          </PrototypeNote>
        </div>
      </section>

      <section aria-labelledby="partners-title" className="border-t border-black/10 py-16 md:py-20">
        <div className="container-x">
          <h2 id="partners-title" className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">
            Производители, с които работим
          </h2>
          <div className="mt-8">
            <LogoWall items={partners} label="Производители на оборудване" emptyNote="" />
          </div>
          <h2 className="mt-16 border-t border-black/10 pt-10 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">
            Клиенти, които ни се довериха
          </h2>
          <div className="mt-8">
            <LogoWall items={clients} label="Клиенти на IMG Engineering" emptyNote="" />
          </div>
        </div>
      </section>

      <ContactCTA index="04" />
    </>
  );
}
