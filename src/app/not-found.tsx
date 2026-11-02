import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x py-24 md:py-32">
      <Eyebrow>Грешка 404</Eyebrow>
      <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Страницата не е намерена.</h1>
      <p className="mt-6 max-w-xl text-lg text-img-grey-dark">Възможно е адресът да е променен или страницата да не съществува.</p>
      <div className="mt-10">
        <ButtonLink href="/" variant="secondary">
          Към началната страница
        </ButtonLink>
      </div>
    </section>
  );
}
