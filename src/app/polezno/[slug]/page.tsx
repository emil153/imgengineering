import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ArrowIcon, PrototypeNote } from "@/components/ui";
import { getGuide, guides } from "@/content/guides";
import { getServicePage } from "@/content/services";
import { company, quoteHref } from "@/content/site";
import { JsonLd } from "@/lib/structured-data";

type Params = { slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  const path = `/polezno/${g.slug}/`;
  return {
    title: { absolute: `${g.seo.title} | IMG Engineering` },
    description: g.seo.description,
    alternates: { canonical: path },
    openGraph: { type: "article", title: g.seo.title, description: g.seo.description, url: path, images: [{ url: g.hero.src }] },
  };
}

const anchor = (i: number) => `razdel-${i + 1}`;

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const related = guide.related.map(getServicePage).filter((s) => s !== undefined);
  const path = `/polezno/${guide.slug}/`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.seo.description,
          url: `${company.url}${path}`,
          inLanguage: "bg",
          image: `${company.url}${guide.hero.src}`,
          about: related.map((s) => s.name),
          publisher: { "@type": "Organization", name: company.name, url: company.url },
        }}
      />
      <article aria-labelledby="guide-title">
        <header className="border-b border-black/10">
          <div className="container-x pt-8 md:pt-10">
            <Breadcrumbs items={[{ label: "Полезно", href: "/polezno/" }, { label: guide.category, href: path }]} />
          </div>
          <div className="container-x grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:pb-16 lg:pt-14">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-img-grey-dark">Ръководство · {guide.category}</p>
              <h1 id="guide-title" className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]">
                {guide.title}
              </h1>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
                <Image src={guide.hero.src} alt={guide.hero.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <nav aria-label="Съдържание" className="lg:sticky lg:top-32">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Съдържание</p>
              <ol className="mt-4 border-t border-black/15">
                {guide.sections.map((s, i) => (
                  <li key={s.h2} className="border-b border-black/15">
                    <a href={`#${anchor(i)}`} className="grid grid-cols-[2rem_1fr] py-3 text-[15px] hover:text-img-green">
                      <span className="font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                      {s.h2}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-8">
            <section aria-labelledby="summary-title" className="border-l-2 border-img-green bg-img-grey-light p-6 md:p-8">
              <h2 id="summary-title" className="font-mono text-xs font-medium uppercase tracking-[0.14em]">
                Накратко
              </h2>
              <ul className="mt-4 space-y-3">
                {guide.summary.map((s) => (
                  <li key={s} className="flex gap-3 text-[17px] leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-img-green" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12 max-w-[68ch]">
              {guide.sections.map((s, i) => (
                <section key={s.h2} id={anchor(i)} aria-labelledby={`${anchor(i)}-h`} className="mt-12 first:mt-0">
                  <h2 id={`${anchor(i)}-h`} className="text-2xl font-semibold tracking-[-0.015em] md:text-[1.75rem]">
                    {s.h2}
                  </h2>
                  {s.p?.map((p) => (
                    <p key={p.slice(0, 30)} className="mt-4 text-[17px] leading-[1.75]">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-5 space-y-3">
                      {s.list.map((l) => (
                        <li key={l.slice(0, 30)} className="flex gap-3 text-[17px] leading-[1.7]">
                          <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 bg-img-black" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <PrototypeNote className="mt-14">Технически преглед: предстои проверка на съдържанието от инженер на IMG Engineering преди публикуване.</PrototypeNote>

            <div className="mt-14 border border-black/10 p-6 md:p-8">
              <h2 className="text-xl font-semibold">Нужна ви е консултация за вашия обект?</h2>
              <p className="mt-2 leading-relaxed text-img-grey-dark">
                Всяка сграда е различна. Изпратете ни информация за обекта или се обадете на{" "}
                <a href={company.phone.href} className="font-semibold text-img-black underline underline-offset-2">
                  {company.phone.display}
                </a>
                .
              </p>
              <Link href={`${quoteHref}?usluga=${related[0]?.slug ?? "konsultatsiya"}`} className="group mt-5 inline-flex items-center gap-2 border-b border-current pb-1 font-medium hover:text-img-green">
                Изпратете запитване <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="guide-related" className="border-t border-black/10 py-16 md:py-20">
          <div className="container-x">
            <h2 id="guide-related" className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">
              Свързани услуги
            </h2>
            <ul className={"mt-6 grid gap-px border border-black/10 bg-black/10 " + (related.length >= 3 ? "md:grid-cols-3" : related.length === 2 ? "md:grid-cols-2" : "")}>
              {related.map((s) => (
                <li key={s.slug} className="bg-white">
                  <Link href={`/uslugi/${s.slug}/`} className="group flex h-full items-center gap-5 p-6 transition-colors hover:bg-img-grey-light">
                    <ServiceIcon name={s.icon} className="h-8 w-8 shrink-0" />
                    <span className="flex-1 text-lg font-semibold group-hover:text-img-green">{s.name}</span>
                    <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactCTA index="02" />
    </>
  );
}
