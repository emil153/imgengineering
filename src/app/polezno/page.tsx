import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ArrowIcon, Eyebrow } from "@/components/ui";
import { guides } from "@/content/guides";
import { articles } from "@/content/site";

const description = "Ръководства за отопление, климатизация и вентилация: как да изберете термопомпа, какво да знаете за подовото отопление и какво включва ОВК проектирането.";

export const metadata: Metadata = {
  title: { absolute: "Полезно: ръководства за ОВК системи | IMG Engineering" },
  description,
  alternates: { canonical: "/polezno/" },
  openGraph: { title: "Полезно", description, url: "/polezno/" },
};

export default function GuidesIndexPage() {
  return (
    <>
      <section aria-labelledby="guides-title" className="border-b border-black/10">
        <div className="container-x pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "Полезно", href: "/polezno/" }]} />
        </div>
        <div className="container-x grid gap-8 pb-14 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-8">
            <Eyebrow>Полезно</Eyebrow>
            <h1 id="guides-title" className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
              Знания, които помагат за правилното решение.
            </h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-img-grey-dark lg:col-span-4">
            Практични ръководства за отоплението, климатизацията и вентилацията на дома и бизнеса.
          </p>
        </div>
      </section>

      <section aria-label="Ръководства" className="py-16 md:py-24">
        <ul className="container-x grid gap-x-6 gap-y-14 md:grid-cols-3 lg:gap-x-8">
          {guides.map((g) => (
            <li key={g.slug} className="reveal">
              <Link href={`/polezno/${g.slug}/`} data-event="guide_view" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
                  <Image src={g.hero.src} alt={g.hero.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Ръководство · {g.category}</p>
                <h2 className="mt-3 text-balance text-2xl font-semibold leading-snug tracking-[-0.015em] group-hover:text-img-green">{g.title}</h2>
                <p className="mt-3 leading-relaxed text-img-grey-dark">{articles.find((a) => a.slug === g.slug)?.teaser}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                  Прочетете <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactCTA index="01" />
    </>
  );
}
