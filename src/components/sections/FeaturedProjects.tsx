import { featuredProjectSlugs, getProject, type Project } from "@/content/projects";
import { clients } from "@/content/site";
import { LogoWall } from "../LogoWall";
import { ProjectCard } from "../project/ProjectCard";
import { ArrowLink, SectionHeader } from "../ui";

export function FeaturedProjects() {
  const featured = featuredProjectSlugs.map(getProject).filter((p): p is Project => Boolean(p));
  return (
    <section id="proekti" aria-labelledby="projects-title" className="border-t border-black/10 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="05" eyebrow="Проекти" title="Избрани обекти от нашата практика." id="projects-title">
          <ArrowLink href="/proekti/">Вижте всички проекти</ArrowLink>
        </SectionHeader>

        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {featured.map((p) => (
            <li key={p.slug} className="reveal">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-black/10 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Клиенти, които ни се довериха</p>
          <div className="mt-6">
            <LogoWall items={clients} label="Клиенти на IMG Engineering" emptyNote="" />
          </div>
        </div>
      </div>
    </section>
  );
}
