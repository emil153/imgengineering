import Image from "next/image";
import { company, partners, teamPhoto, trust } from "@/content/site";
import { LogoWall } from "../LogoWall";
import { Eyebrow, TONES, cx, tone } from "../ui";

export function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5"><div className="reveal lg:sticky lg:top-32">
          <Eyebrow index="02">{trust.eyebrow}</Eyebrow>
          <p className="mt-8 font-semibold leading-none tracking-[-0.06em] text-[7rem] sm:text-[9rem] xl:text-[11rem]" aria-hidden="true">
            {company.foundingYear}
          </p>
          <div aria-hidden="true" className="mt-4 flex h-2 w-56 max-w-full">
            <span className="flex-1 bg-img-blue" />
            <span className="flex-1 bg-img-red" />
            <span className="flex-1 bg-img-yellow" />
            <span className="flex-1 bg-img-green" />
          </div>
          <p className="mt-4 max-w-xs font-mono text-xs uppercase tracking-[0.14em] text-img-grey-dark">
            Година на основаване на компанията
          </p>
          <figure className="mt-10">
            <Image
              src={teamPhoto.src}
              alt={teamPhoto.alt}
              width={teamPhoto.width}
              height={teamPhoto.height}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-img-grey-dark">
              Екипът на IMG Engineering на обект
            </figcaption>
          </figure>
        </div>
        </div>

        <div className="lg:col-span-7">
          <h2 id="trust-title" className="reveal text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
            {trust.title}
          </h2>
          <p className="reveal mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-img-grey-dark">{trust.body}</p>

          <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2">
            {trust.points.map((p, i) => (
              <li key={p.title} className={cx("lift p-6 md:p-7", tone[TONES[i % 4]].soft)}>
                <span className={cx("inline-flex h-8 w-8 items-center justify-center font-mono text-xs font-medium", TONES[i % 4] === "red" || TONES[i % 4] === "green" ? cx(tone[TONES[i % 4]].solid, "text-white") : cx(tone[TONES[i % 4]].solid, "text-img-black"))}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-img-grey-dark">{p.text}</p>
              </li>
            ))}
          </ul>

        </div>
      </div>

      <div className="container-x mt-20">
        <div className="border-t border-black/10 pt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Производители, с които работим</p>
        <div className="mt-8">
          <LogoWall items={partners} label="Производители на оборудване, с които работи IMG Engineering" emptyNote="Логата на производителите предстои да бъдат добавени." />
        </div>
        </div>
      </div>
    </section>
  );
}
