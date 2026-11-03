import Link from "next/link";
import { bannerOffers } from "@/content/offers";

/**
 * Rolling announcement bar with the confirmed offers.
 * The text is duplicated for a seamless loop; the copy is hidden from screen readers.
 * Pauses on hover/focus; static with reduced motion.
 */
export function OfferBanner() {
  if (bannerOffers.length === 0) return null;
  const one = bannerOffers.flatMap((o) => [o.banner, ...(o.bannerDetails ?? [])]);
  const items = [...one, ...one, ...one];
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((text, i) => (
        <li key={`${text}-${i}`} className={"flex items-center whitespace-nowrap px-6 text-[13px] md:text-sm " + (i % one.length === 0 ? "font-semibold" : "font-medium")}>
          <span aria-hidden="true" className="mr-3 inline-block h-1.5 w-1.5 rotate-45 bg-img-black" />
          {text}
        </li>
      ))}
    </ul>
  );
  return (
    <Link
      href="/oferti/"
      data-event="offer_banner_click"
      className="marquee group relative block overflow-hidden bg-img-yellow text-img-black"
      aria-label={`Актуална оферта: ${one.join(", ")}. Вижте офертата.`}
    >
      <div className="flex h-9 items-center">
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
      <span className="absolute inset-y-0 right-0 hidden items-center gap-2 bg-img-black px-4 text-[13px] font-semibold text-img-yellow transition-colors group-hover:bg-img-green group-hover:text-white sm:flex">
        Вижте офертата
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10h13M11 5l5 5-5 5" />
        </svg>
      </span>
    </Link>
  );
}
