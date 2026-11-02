import type { Metadata } from "next";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { company } from "@/content/site";

/** Landing page after a no-JavaScript submission. Not indexed. */
export const metadata: Metadata = { title: "Благодарим за запитването", robots: { index: false, follow: false } };

export default function ThanksPage() {
  return (
    <section className="container-x py-24 md:py-32">
      <Eyebrow>Запитването е изпратено</Eyebrow>
      <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Благодарим! Получихме вашето запитване.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-img-grey-dark">
        Наш специалист ще се свърже с вас, за да уточни детайлите. Ако е спешно, обадете се на {company.phone.display} ({company.hours.display.toLowerCase()}).
      </p>
      <div className="mt-10">
        <ButtonLink href="/" variant="secondary">
          Към началната страница
        </ButtonLink>
      </div>
    </section>
  );
}
