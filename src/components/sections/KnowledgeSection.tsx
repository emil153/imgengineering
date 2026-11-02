import Link from "next/link";
import { articles } from "@/content/site";
import { ArrowIcon, ArrowLink, SectionHeader, cx, tone, type Tone } from "../ui";

const tones: Tone[] = ["yellow", "red", "blue"];

export function KnowledgeSection() {
  return (
    <section aria-labelledby="knowledge-title" className="border-t border-black/10 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="09" eyebrow="Полезно" title="Знания, които помагат за правилното решение." id="knowledge-title">
          <ArrowLink href="/polezno/">Всички материали</ArrowLink>
        </SectionHeader>

        <ul className="mt-12 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
          {articles.map((a, i) => (
            <li key={a.slug} className="bg-white">
              <Link
                href={`/polezno/${a.slug}/`}
                data-event="guide_view"
                className={cx("group flex h-full min-h-72 flex-col p-6 transition-colors duration-300 lg:p-8", tone[tones[i % 3]].hoverSoft)}
              >
                <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">
                  <span>{a.category}</span>
                  <span className="border border-black/20 px-2 py-0.5">Ръководство</span>
                </p>
                <span aria-hidden="true" className={cx("mt-8 block h-1 w-10 transition-all duration-300 group-hover:w-20", tone[tones[i % 3]].solid)} />
                <h3 className="mt-5 text-balance text-2xl font-semibold leading-snug tracking-[-0.015em] group-hover:text-img-green">{a.title}</h3>
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
