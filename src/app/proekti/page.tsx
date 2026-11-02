import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { LogoWall } from "@/components/LogoWall";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Eyebrow, PrototypeNote } from "@/components/ui";
import { projects } from "@/content/projects";
import { clients } from "@/content/site";

const title = "Проекти";
const description = "Изпълнени обекти на IMG Engineering: търговски и офис сгради, фитнес центрове и жилищни къщи с термопомпи, подово отопление, климатизация и вентилация.";

export const metadata: Metadata = {
  title: { absolute: `Проекти | IMG Engineering` },
  description,
  alternates: { canonical: "/proekti/" },
  openGraph: { title, description, url: "/proekti/", images: [{ url: projects[0].photos[0].src }] },
};

const groups = [
  { key: "b2b", title: "Бизнес обекти", text: "Търговски, офис и обществени сгради" },
  { key: "b2c", title: "Жилищни обекти", text: "Къщи и апартаменти" },
] as const;

export default function ProjectsPage() {
  return (
    <>
      <section aria-labelledby="projects-index-title" className="border-b border-black/10">
        <div className="container-x pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "Проекти", href: "/proekti/" }]} />
        </div>
        <div className="container-x grid gap-8 pb-14 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-8">
            <Eyebrow>Проекти</Eyebrow>
            <h1 id="projects-index-title" className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
              Изпълнени обекти от нашата практика.
            </h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-img-grey-dark lg:col-span-4">
            Снимки от обекти, по които е работил екипът на IMG Engineering: от покривни ОВК системи на търговски сгради до термопомпи и подово отопление в къщи.
          </p>
        </div>
      </section>

      <div className="container-x pt-10">
        <PrototypeNote>Имената на обектите, местоположенията и подробностите по проектите ще бъдат добавени след потвърждение от IMG Engineering.</PrototypeNote>
      </div>

      {groups.map((g, gi) => {
        const items = projects.filter((p) => p.audience === g.key);
        return (
          <section key={g.key} aria-labelledby={`group-${g.key}`} className={gi === 0 ? "py-16 md:py-20" : "border-t border-black/10 py-16 md:py-20"}>
            <div className="container-x">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow index={String(gi + 1).padStart(2, "0")}>{g.text}</Eyebrow>
                  <h2 id={`group-${g.key}`} className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-[2.75rem]">
                    {g.title}
                  </h2>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-img-grey-dark">{items.length} проекта</p>
              </div>
              <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-3 lg:gap-x-8">
                {items.map((p) => (
                  <li key={p.slug} className="reveal">
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="clients-title" className="border-t border-black/10 py-16 md:py-20">
        <div className="container-x">
          <h2 id="clients-title" className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">
            Клиенти, които ни се довериха
          </h2>
          <div className="mt-8">
            <LogoWall items={clients} label="Клиенти на IMG Engineering" emptyNote="" />
          </div>
        </div>
      </section>

      <ContactCTA index="03" title="Имате подобен проект?" text="Разкажете ни за обекта и ще ви помогнем да изберете подходящото техническо решение." showSegments />
    </>
  );
}
