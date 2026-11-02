import Link from "next/link";
import { disciplineColor, services } from "@/content/site";
import { ServiceIcon } from "../ServiceIcon";
import { ArrowIcon, ArrowLink, SectionHeader } from "../ui";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="03" eyebrow="Услуги" title="Цялостни решения за отопление, вентилация и климатизация." id="services-title">
          <ArrowLink href="/uslugi/">Всички услуги</ArrowLink>
        </SectionHeader>

        <ul className="mt-12 grid grid-cols-1 gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.slug} className="bg-white">
              <Link
                href={`/uslugi/${s.slug}/`}
                className="group relative flex h-full flex-col p-6 transition-colors duration-200 hover:bg-img-grey-light lg:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: disciplineColor[s.discipline] }}
                />
                <div className="flex items-start justify-between">
                  <span className="flex items-center gap-2 font-mono text-xs text-img-grey-dark">
                    <span aria-hidden="true" className="h-2 w-2" style={{ background: disciplineColor[s.discipline] }} />
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ServiceIcon name={s.icon} className="h-9 w-9 text-img-black" />
                </div>
                <h3 className="mt-10 text-xl font-semibold tracking-[-0.01em]">{s.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-img-grey-dark">{s.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium">
                  Научете повече
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
