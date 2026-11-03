import type { ReactNode } from "react";
import { Breadcrumbs } from "../hub/Breadcrumbs";
import { PrototypeNote } from "../ui";

export type LegalSection = { h2: string; body: ReactNode };

/** Plain, readable layout for legal texts. Square-bracket placeholders mark data still to be supplied. */
export function LegalPage({ title, path, intro, sections }: { title: string; path: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <article aria-labelledby="legal-title" className="container-x pb-24 pt-8 md:pt-10">
      <Breadcrumbs items={[{ label: title, href: path }]} />
      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 id="legal-title" className="text-balance text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-img-grey-dark">Последна актуализация: 3 ноември 2026 г.</p>
          <PrototypeNote className="mt-8">
            Чернова за юридически преглед. Данните в квадратни скоби предстои да бъдат попълнени от IMG Engineering.
          </PrototypeNote>
          <div className="mt-10 max-w-[70ch] text-[17px] leading-[1.75]">{intro}</div>
          <ol className="mt-12 max-w-[70ch]">
            {sections.map((s, i) => (
              <li key={s.h2} className="mt-10 first:mt-0">
                <h2 className="text-2xl font-semibold tracking-[-0.015em]">
                  <span className="mr-3 font-mono text-sm font-normal text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                  {s.h2}
                </h2>
                <div className="mt-4 space-y-4 text-[17px] leading-[1.75] [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">{s.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
