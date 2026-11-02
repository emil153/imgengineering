import Link from "next/link";
import { ArrowIcon } from "../ui";

/** Placeholder teaser for the future online shop. */
export function ShopTeaser() {
  return (
    <section aria-labelledby="shop-teaser-title" className="py-12 md:py-16">
      <div className="container-x">
        <Link href="/magazin/" className="lift group grid items-center gap-6 border border-black/10 bg-img-yellow-soft p-8 md:grid-cols-[auto_1fr_auto] md:p-10">
          <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center bg-img-black text-img-yellow transition-colors group-hover:bg-img-green group-hover:text-white">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6.2" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
            </svg>
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Очаквайте скоро</p>
            <h2 id="shop-teaser-title" className="mt-2 text-2xl font-semibold tracking-[-0.015em] md:text-3xl">
              Онлайн магазин
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-img-grey-dark">Подготвяме онлайн магазин за оборудване и консумативи за отопление, климатизация и вентилация.</p>
          </div>
          <span className="inline-flex items-center gap-2 font-medium group-hover:text-img-green">
            Научете повече <ArrowIcon className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
}
