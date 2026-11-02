import Link from "next/link";
import { articles } from "@/content/site";
import { ArrowIcon, ArrowLink, SectionHeader } from "../ui";

export function KnowledgeSection() {
  return (
    <section aria-labelledby="knowledge-title" className="border-t border-black/10 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="07" eyebrow="Полезно" title="Знания, които помагат за правилното решение." id="knowledge-title">
          <ArrowLink href="/polezno/">Всички материали</ArrowLink>
        </SectionHeader>

        <ul className="mt-12 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug} className="bg-white">
              <Link
                href={`/polezno/${a.slug}/`}
                data-event="guide_view"
                className="group flex h-full min-h-72 flex-col p-6 transition-colors hover:bg-img-grey-light lg:p-8"
              >
                <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">
                  <span>{a.category}</span>
                  <span className="border border-black/20 px-2 py-0.5">Ръководство</span>
                </p>
                <h3 className="mt-8 text-balance text-2xl font-semibold leading-snug tracking-[-0.015em]">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-img-grey-dark">{a.teaser}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium">
                  Прочетете
                  <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
