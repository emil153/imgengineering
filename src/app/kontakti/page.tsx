import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Eyebrow, PhoneIcon } from "@/components/ui";
import { company } from "@/content/site";
import { JsonLd } from "@/lib/structured-data";

const title = "Контакти";
const description = `Свържете се с IMG Engineering: телефон ${company.phone.display}, имейл ${company.email}, офис ${company.address.street}, ${company.address.city}. Работно време: понеделник – петък, 8:30 – 17:30.`;

export const metadata: Metadata = {
  title: { absolute: `Контакти | IMG Engineering` },
  description,
  alternates: { canonical: "/kontakti/" },
  openGraph: { title, description, url: "/kontakti/" },
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`IMG Engineering, ${company.address.street}, ${company.address.city}`)}`;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${company.url}/kontakti/`,
          mainEntity: {
            "@type": "Organization",
            name: company.name,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: company.phone.display,
              email: company.email,
              contactType: "customer service",
              availableLanguage: "bg",
            },
          },
        }}
      />
      <section aria-labelledby="contact-title" className="bg-img-green-soft">
        <div className="container-x pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: "Контакти", href: "/kontakti/" }]} />
        </div>
        <div className="container-x grid gap-12 pb-20 pt-10 lg:grid-cols-12 lg:pb-28 lg:pt-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h1 id="contact-title" className="text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl">
                Контакти
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-img-grey-dark">
                Обадете се, пишете ни или изпратете запитване през формата. Ще се свържем с вас, за да уточним детайлите.
              </p>
              <dl className="mt-10 border-t border-black/15">
                <div className="border-b border-black/15 py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Телефон</dt>
                  <dd className="mt-2">
                    <a href={company.phone.href} data-event="click_to_call" data-location="contact_page" className="inline-flex items-center gap-3 text-3xl font-semibold tracking-[-0.02em] hover:text-img-green">
                      <PhoneIcon className="h-6 w-6" />
                      {company.phone.display}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-black/15 py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Имейл</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${company.email}`} data-event="email_click" className="text-xl font-semibold underline-offset-4 hover:text-img-green hover:underline">
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-black/15 py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Работно време</dt>
                  <dd className="mt-2 text-lg">{company.hours.display}</dd>
                </div>
                <div className="border-b border-black/15 py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Офис</dt>
                  <dd className="mt-2 text-lg">
                    <address className="not-italic">
                      {company.legalName}
                      <br />
                      {company.address.street}, {company.address.city}
                    </address>
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex border-b border-current pb-0.5 text-[15px] font-medium hover:text-img-green">
                      Отворете в Google Maps<span className="sr-only"> (отваря се в нов прозорец)</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Eyebrow>Изпратете запитване</Eyebrow>
            <h2 className="mb-8 mt-4 text-3xl font-semibold tracking-[-0.02em]">Разкажете ни за вашия обект</h2>
            <QuoteForm />
          </div>
        </div>
      </section>
      <ServiceArea index="02" />
    </>
  );
}
