import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { PhoneIcon } from "@/components/ui";
import { company } from "@/content/site";
import { freeVisit } from "@/content/offers";

const title = "Поискайте оферта";
const description =
  "Изпратете запитване за отопление, климатизация, вентилация или ОВК проектиране. IMG Engineering ще се свърже с вас, за да уточни детайлите.";

export const metadata: Metadata = {
  title: { absolute: `${title} | IMG Engineering` },
  description,
  alternates: { canonical: "/poiskayte-oferta/" },
  openGraph: { title, description, url: "/poiskayte-oferta/" },
};

const steps = [
  { title: "Изпращате запитване", text: "Опишете накратко обекта и какво ви е необходимо." },
  { title: "Свързваме се с вас", text: "Уточняваме детайлите и нужната техническа информация." },
  { title: "Получавате оферта", text: "С ясно описан обхват на доставката и работата." },
];

export default function QuotePage() {
  return (
    <section aria-labelledby="quote-title" className="bg-img-blue-soft">
      <div className="container-x pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Поискайте оферта", href: "/poiskayte-oferta/" }]} />
      </div>
      <div className="container-x grid gap-12 pb-20 pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h1 id="quote-title" className="text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl">
              Поискайте оферта
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-img-grey-dark">
              Разкажете ни за вашия дом или бизнес обект и ще ви помогнем да намерите подходящото техническо решение.
            </p>

            <div className="mt-8 border-l-4 border-img-green bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-green">Безплатно</p>
              <p className="mt-1 text-lg font-semibold">{freeVisit.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-img-grey-dark">Отбележете го във формата. {freeVisit.condition}</p>
            </div>

            <ol className="mt-10 border-t border-black/15">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] border-b border-black/15 py-4">
                  <span className="pt-0.5 font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-img-grey-dark">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Предпочитате да се обадите?</p>
              <a href={company.phone.href} data-event="click_to_call" data-location="quote_page" className="mt-3 inline-flex items-center gap-3 text-3xl font-semibold tracking-[-0.02em] hover:text-img-green">
                <PhoneIcon className="h-6 w-6" />
                {company.phone.display}
              </a>
              <p className="mt-2 text-img-grey-dark">{company.hours.display}</p>
              <a href={`mailto:${company.email}`} className="mt-3 inline-block font-medium underline underline-offset-4 hover:text-img-green">
                {company.email}
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
