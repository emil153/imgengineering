import type { HubFaq } from "@/content/hubs";
import { JsonLd } from "@/lib/structured-data";
import { Eyebrow } from "../ui";

/**
 * FAQ as native <details>/<summary>: keyboard accessible, works without JavaScript,
 * and the answers stay in the HTML for search engines and AI crawlers.
 * FAQPage markup mirrors the visible text exactly.
 */
export function FaqSection({ index, title, items }: { index: string; title: string; items: HubFaq[] }) {
  return (
    <section aria-labelledby="faq-title" className="py-20 md:py-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow index={index}>Въпроси</Eyebrow>
          <h2 id="faq-title" className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
            {title}
          </h2>
        </div>
        <div className="border-t border-black/15 lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-black/15 transition-colors open:bg-white/70 open:px-4 md:open:px-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold tracking-[-0.01em] transition-colors marker:hidden hover:text-img-green md:text-xl [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-current after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-7 text-[17px] leading-relaxed text-img-grey-dark">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
