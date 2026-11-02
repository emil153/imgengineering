import { principles } from "@/content/site";
import { HeroSchematic } from "../HeroSchematic";
import { Eyebrow } from "../ui";

export function WhyIMG() {
  return (
    <section aria-labelledby="why-title" className="bg-img-green-soft py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index="06">Нашият подход</Eyebrow>
            <h2 id="why-title" className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
              Защо IMG Engineering
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-img-grey-dark">
              Принципите, по които подхождаме към всеки обект, независимо от неговия мащаб.
            </p>
            <figure className="mt-10 hidden lg:block">
              <div className="tech-grid border border-black/10 bg-white p-4">
                <HeroSchematic />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-img-grey-dark">
                Илюстративна схема: вентилация, климатизация, подово отопление и термопомпа в една сграда.
              </figcaption>
            </figure>
          </div>
        </div>

        <ol className="border-t border-black/15 lg:col-span-8">
          {principles.map((p, i) => (
            <li key={p.title} className="reveal group grid gap-4 border-b border-black/15 px-0 py-9 transition-colors hover:bg-white sm:grid-cols-[5rem_1fr] sm:px-4 md:py-12">
              <span className="font-mono text-sm text-img-grey-dark transition-colors group-hover:text-img-green">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.015em] md:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-img-grey-dark">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
