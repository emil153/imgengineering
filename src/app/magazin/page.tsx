import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/hub/Breadcrumbs";
import { ButtonLink, Eyebrow, PhoneIcon, PrototypeNote } from "@/components/ui";
import { ServiceIcon } from "@/components/ServiceIcon";
import { company, quoteHref, type ServiceIconName } from "@/content/site";

/** Placeholder until the shop is built. Not indexed and not in the sitemap. */
export const metadata: Metadata = {
  title: { absolute: "Онлайн магазин: очаквайте скоро | IMG Engineering" },
  description: "Онлайн магазинът на IMG Engineering за оборудване и консумативи за отопление, климатизация и вентилация предстои.",
  robots: { index: false, follow: true },
};

const planned: { name: string; icon: ServiceIconName }[] = [
  { name: "Термопомпи", icon: "heatpump" },
  { name: "Климатици", icon: "cooling" },
  { name: "Подово отопление", icon: "underfloor" },
  { name: "Вентилация", icon: "ventilation" },
  { name: "Консумативи и аксесоари", icon: "service" },
];

export default function ShopPage() {
  return (
    <section aria-labelledby="shop-title" className="bg-img-yellow-soft">
      <div className="container-x pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Онлайн магазин", href: "/magazin/" }]} />
      </div>
      <div className="container-x pb-24 pt-10 md:pt-14">
        <Eyebrow>Очаквайте скоро</Eyebrow>
        <h1 id="shop-title" className="mt-6 max-w-3xl text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          Онлайн магазин
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-img-grey-dark md:text-xl">
          Подготвяме онлайн магазин за оборудване и консумативи за отопление, климатизация и вентилация. Дотогава можете да поискате оферта за конкретно оборудване или да се обадите.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={quoteHref} withArrow>
            Поискайте оферта
          </ButtonLink>
          <ButtonLink href={company.phone.href} variant="secondary">
            <PhoneIcon className="h-4 w-4" />
            {company.phone.display}
          </ButtonLink>
        </div>

        <h2 className="mt-20 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">Предвидени категории</h2>
        <ul data-stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {planned.map((p) => (
            <li key={p.name} className="flex items-center gap-4 border border-black/10 bg-white p-5">
              <ServiceIcon name={p.icon} className="h-8 w-8 shrink-0" />
              <span className="font-semibold">{p.name}</span>
            </li>
          ))}
        </ul>
        <PrototypeNote className="mt-10">Категориите са примерни. Асортиментът и функционалността на магазина ще бъдат определени с IMG Engineering.</PrototypeNote>
      </div>
    </section>
  );
}
