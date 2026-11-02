import Link from "next/link";
import { company, finalCta } from "@/content/site";
import { ArrowIcon, ButtonLink, Eyebrow } from "../ui";

type Props = {
  index?: string;
  title?: string;
  text?: string;
  href?: string;
  showSegments?: boolean;
};

export function ContactCTA({
  index = "08",
  title = finalCta.title,
  text = finalCta.text,
  href = finalCta.cta.href,
  showSegments = true,
}: Props = {}) {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative bg-img-black text-white">
      {/* brand stripe: the three logo colors, used once and sparingly */}
      <div aria-hidden="true" className="grid h-1 grid-cols-3">
        <span className="bg-img-blue" />
        <span className="bg-img-red" />
        <span className="bg-img-yellow" />
      </div>
      <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow index={index} className="text-white/60 [&>span:first-child]:text-white">
            Запитване
          </Eyebrow>
          <h2 id="cta-title" className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">{text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={href} withArrow data-event="quote_cta_click" data-location="final_cta">
              {finalCta.cta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-8 lg:col-span-5">
          <div className="border-t border-white/20 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">Телефон</p>
            <a
              href={company.phone.href}
              data-event="click_to_call"
              data-location="final_cta"
              className="mt-2 inline-block text-4xl font-semibold tracking-[-0.02em] hover:text-img-yellow md:text-5xl"
            >
              {company.phone.display}
            </a>
            <p className="mt-2 text-white/70">{company.hours.display}</p>
          </div>
          {showSegments && (
          <ul className="border-t border-white/20">
            {finalCta.segments.map((s) => (
              <li key={s.href} className="border-b border-white/20">
                <Link
                  href={s.href}
                  data-event="quote_cta_click"
                  data-location="final_cta_segment"
                  className="group flex items-center justify-between py-4 font-medium hover:text-img-yellow"
                >
                  {s.label}
                  <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
    </section>
  );
}
