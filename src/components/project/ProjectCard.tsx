import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowIcon } from "../ui";

/** Project teaser used on the homepage, the projects index and "other projects". */
export function ProjectCard({ project, sizes = "(min-width: 768px) 33vw, 100vw" }: { project: Project; sizes?: string }) {
  const cover = project.photos[0];
  return (
    <Link href={`/proekti/${project.slug}/`} data-event="project_view" className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-img-grey-light">
        <Image src={cover.src} alt={cover.alt} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        <span className={"absolute left-3 top-3 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] " + (project.audience === "b2b" ? "bg-img-blue text-img-black" : "bg-img-yellow text-img-black")}>
          {project.photos.length} {project.photos.length === 1 ? "снимка" : "снимки"}
        </span>
      </div>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">
        <span>{project.buildingType}</span>
        <span aria-hidden="true">·</span>
        <span>{project.audience === "b2b" ? "Бизнес" : "Дом"}</span>
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] group-hover:text-img-green">{project.title}</h3>
      <p className="mt-2 line-clamp-3 leading-relaxed text-img-grey-dark">{project.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
        Вижте проекта
        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
