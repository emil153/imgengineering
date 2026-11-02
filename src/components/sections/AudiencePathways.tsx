import Image from "next/image";
import Link from "next/link";
import { audiences } from "@/content/site";
import { ArrowIcon, ButtonLink, Eyebrow, PlaceholderMedia, cx } from "../ui";

/**
 * Two equal-weight customer journeys (50/50 B2C / B2B requirement).
 * Both panels share identical structure, size and styling; only content differs.
 */
export function AudiencePathways() {
  return (
    <section aria-labelledby="audience-title" className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <Eyebrow index="03">Две направления</Eyebrow>
          <h2 id="audience-title" className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
            Решения за вашия дом и за вашия бизнес.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {audiences.map((a) => (
            <article key={a.key} aria-labelledby={`aud-${a.key}`} className={cx("reveal lift group/panel flex flex-col", a.key === "b2c" ? "bg-img-yellow-soft" : "bg-img-blue-soft")}>
              {a.media ? (
                <div className="relative aspect-[16/9] overflow-hidden bg-img-grey-light">
                  <span className={cx("absolute left-0 top-0 z-10 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em]", a.key === "b2c" ? "bg-img-yellow text-img-black" : "bg-img-blue text-img-black")}>
                    {a.eyebrow}
                  </span>
                  <Image
                    src={a.media.src}
                    alt={a.media.alt}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover/panel:scale-[1.04]"
                  />
                </div>
              ) : (
                <PlaceholderMedia label={a.mediaLabel} className="aspect-[16/9]" />
              )}
              <div className="flex flex-1 flex-col p-6 md:p-10">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.14em]">
                  <span className="mr-2 inline-block h-2 w-2 bg-img-green align-middle" aria-hidden="true" />
                  {a.eyebrow}
                </p>
                <h3 id={`aud-${a.key}`} className="mt-5 text-balance text-2xl font-semibold leading-tight tracking-[-0.015em] md:text-[1.9rem]">
                  {a.title}
                </h3>
                <p className="mt-4 leading-relaxed text-img-grey-dark">{a.text}</p>

                <ul className="mt-8 border-t border-black/15">
                  {a.links.map((l) => (
                    <li key={l.href} className="border-b border-black/15">
                      <Link
                        href={l.href}
                        data-event="audience_route_select"
                        data-audience={a.key}
                        className="group flex items-center justify-between gap-4 px-2 py-3.5 font-medium transition-colors hover:bg-white hover:text-img-green"
                      >
                        {l.label}
                        <ArrowIcon className="text-img-grey-dark transition-transform group-hover:translate-x-0.5 group-hover:text-img-green" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <ButtonLink href={a.cta.href} withArrow data-event="audience_route_select" data-audience={a.key}>
                    {a.cta.label}
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
