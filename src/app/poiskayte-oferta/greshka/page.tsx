import type { Metadata } from "next";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { company } from "@/content/site";

/** Landing page after a failed no-JavaScript submission. Not indexed. */
export const metadata: Metadata = { title: "Запитването не беше изпратено", robots: { index: false, follow: false } };

export default function QuoteErrorPage() {
  return (
    <section className="container-x py-24 md:py-32">
      <Eyebrow>Запитването не беше изпратено</Eyebrow>
      <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Нещо не беше наред.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-img-grey-dark">
        Възможно е да липсва задължително поле или да има временен технически проблем. Върнете се към формата и опитайте отново, или се свържете с нас директно:
      </p>
      <p className="mt-4 text-lg">
        <a href={company.phone.href} className="font-semibold underline underline-offset-4">{company.phone.display}</a> ({company.hours.display.toLowerCase()}) ·{" "}
        <a href={`mailto:${company.email}`} className="font-semibold underline underline-offset-4">{company.email}</a>
      </p>
      <div className="mt-10">
        <ButtonLink href="/poiskayte-oferta/">Обратно към формата</ButtonLink>
      </div>
    </section>
  );
}
