import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ArrowIcon, PrototypeNote } from "@/components/ui";
import { getProject, projects } from "@/content/projects";
import { getServicePage } from "@/content/services";
import { quoteHref } from "@/content/site";

type Params = { slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const path = `/proekti/${p.slug}/`;
  return {
    title: { absolute: `${p.title} | IMG Engineering` },
    description: p.summary.length > 160 ? `${p.summary.split(". ")[0].replace(/\.$/, "")}.` : p.summary,
    alternates: { canonical: path },
    openGraph: { title: p.title, description: p.summary, url: path, images: [{ url: p.photos[0].src }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const services = project.services.map(getServicePage).filter((s) => s !== undefined);
  const [cover, ...rest] = project.photos;
  const others = projects.filter((p) => p.slug !== project.slug && p.audience === project.audience).slice(0, 3);
  const cta = `${quoteHref}?za=${project.audience === "b2b" ? "biznes" : "doma"}${services[0] ? `&usluga=${services[0].slug}` : ""}`;

  return (
    <>
      <section aria-labelledby="project-title" className="border-b border-black/10">
        <div className="container-x pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "Проекти", href: "/proekti/" }, { label: project.title, href: `/proekti/${project.slug}/` }]} />
        </div>
        <div className="container-x grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:pb-16 lg:pt-14">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em]">
              <span className="mr-2 inline-block h-2 w-2 bg-img-green align-middle" aria-hidden="true" />
              {project.audience === "b2b" ? "Бизнес обект" : "Жилищен обект"}
            </p>
            <h1 id="project-title" className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-img-grey-dark md:text-xl">{project.summary}</p>
          </div>
          <dl className="self-end border-t border-black/15 lg:col-span-5">
            {[
              ["Тип сграда", project.buildingType],
              ["Направление", project.audience === "b2b" ? "За бизнеса" : "За дома"],
              ["Услуги", services.length ? services.map((s) => s.name).join(", ") : "Предстои уточнение"],
              ["Местоположение", "Предстои уточнение"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] border-b border-black/15 py-3 text-[15px]">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-img-grey-dark">{k}</dt>
                <dd className={v === "Предстои уточнение" ? "text-img-grey-dark" : "font-medium"}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Снимки от обекта" className="py-12 md:py-16">
        <div className="container-x">
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden bg-img-grey-light">
              <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 1320px) 1224px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-img-grey-dark">{cover.caption}</figcaption>
          </figure>
          {rest.length > 0 && (
            <ul className={"mt-4 grid grid-cols-2 gap-3 md:gap-4 " + (rest.length >= 3 ? "md:grid-cols-3" : "")}>
              {rest.map((ph) => (
                <li key={ph.src}>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
                      <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-img-grey-dark">{ph.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
          <PrototypeNote className="mt-10">
            Името на обекта, местоположението и подробно описание на задачата и изпълнението ще бъдат добавени след потвърждение от IMG Engineering.
          </PrototypeNote>
        </div>
      </section>

      {services.length > 0 && (
        <section aria-labelledby="project-services" className="border-t border-black/10 py-16 md:py-20">
          <div className="container-x">
            <h2 id="project-services" className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">
              Услуги в този проект
            </h2>
            <ul className={"mt-6 grid gap-px border border-black/10 bg-black/10 " + (services.length >= 3 ? "md:grid-cols-3" : services.length === 2 ? "md:grid-cols-2" : "")}>
              {services.map((s) => (
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

      {others.length > 0 && (
        <section aria-labelledby="other-projects" className="border-t border-black/10 py-16 md:py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <h2 id="other-projects" className="text-3xl font-semibold tracking-[-0.02em] md:text-[2.5rem]">
                Други {project.audience === "b2b" ? "бизнес" : "жилищни"} обекти
              </h2>
              <Link href="/proekti/" className="group hidden items-center gap-2 border-b border-current pb-1 text-[15px] font-medium sm:inline-flex">
                Всички проекти <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3 lg:gap-x-8">
              {others.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactCTA index="04" title="Искате подобно решение?" text="Разкажете ни за вашия обект и ще ви помогнем да изберете подходящото техническо решение." href={cta} showSegments={false} />
    </>
  );
}
