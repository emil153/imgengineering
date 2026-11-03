/**
 * Offers (/oferti/), the rolling banner and the free site visit / heating calculation.
 *
 * status: "confirmed" offers appear everywhere, including the rolling banner.
 * "to-confirm" / "proposal" are kept for future use and show a visible badge on /oferti/.
 */
import { quoteHref, type Media } from "./site";

export type Season = "heating" | "cooling" | "all-year";

export type Offer = {
  slug: string;
  status: "confirmed" | "to-confirm" | "proposal";
  title: string;
  banner: string;
  /** Extra details that roll in the top banner after the headline. */
  bannerDetails?: string[];
  badge: string;
  price?: { prefix?: string; value: string; unit: string; note?: string };
  lead: string;
  includes: string[];
  conditions: string[];
  validity: string;
  audience: "b2c" | "b2b" | "all";
  season: Season;
  service?: string;
  media?: Media;
  tone: "red" | "blue" | "yellow" | "green";
};

/**
 * Only the underfloor heating offer is active (client decision, 3 Nov 2026).
 * Details from the body of the current imgengi.com offer page. The "5-year warranty", "€20" and
 * "ends August 30" appear only in that page's meta description, so they are NOT used here.
 */
export const offers: Offer[] = [
  {
    slug: "podovo-otoplenie-22-eur",
    status: "confirmed",
    title: "Водно подово отопление от 22 € / m²",
    banner: "Водно подово отопление от 22 € / m² без ДДС",
    bannerDetails: [
      "Тръба HERZ 16 × 2 с кислородна бариера",
      "Подложка SPS 200, 1 cm",
      "Доставка и монтаж от екипа на IMG Engineering",
    ],
    badge: "Актуална оферта",
    price: { prefix: "от", value: "22 €", unit: "/ m²", note: "без ДДС, с доставка и монтаж" },
    lead: "Водно подово отопление с доставка на всички материали до обекта и професионален монтаж от екипа на IMG Engineering.",
    includes: [
      "Тръба за подово отопление HERZ 16 × 2 с кислородна бариера: качествено решение за надеждна и ефективна система",
      "Подложка SPS 200, 1 cm: основа за правилен монтаж и ефективно разпределение на топлината",
      "Доставка на всички необходими материали до обекта",
      "Професионален монтаж от екипа на IMG Engineering",
    ],
    conditions: [
      "Цената е без ДДС.",
      "Окончателната цена се определя според площта и конкретния обект и се посочва в индивидуалната оферта.",
    ],
    validity: "Офертата е валидна до 31 декември 2026 г.",
    audience: "b2c",
    season: "heating",
    service: "podovo-otoplenie",
    media: { src: "/images/dom-podovo-otoplenie-kragove.webp", width: 1200, height: 900, alt: "Кръгове на водно подово отопление върху системни плочи" },
    tone: "red",
  },
];

export const visibleOffers = offers;
export const bannerOffers = offers.filter((o) => o.status === "confirmed");
export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);

/**
 * Standing benefit (client request, 3 Nov 2026), not a time-limited offer.
 * Confirmed by client 3 Nov 2026: both visit and calculation are free; Sofia + 30 km; homes only, not business sites.
 */
export const freeVisit = {
  title: "Безплатен оглед или изчисление на отоплението",
  text: "Наш специалист ще огледа обекта или ще изчисли необходимата мощност на отоплението, за да получите точна оферта. Без ангажимент от ваша страна.",
  points: ["Оглед на обекта от специалист", "Изчисление на необходимата мощност на отоплението", "Без ангажимент: първо получавате оферта"],
  /** Short label for links; makes the home-only condition visible everywhere. */
  short: "Безплатен оглед или изчисление на отоплението за дома",
  condition: "За домове (къщи и апартаменти) в София и населените места в радиус от 30 km. Не важи за бизнес обекти.",
  href: "/poiskayte-oferta/?ogled=1",
};

export const offerQuoteHref = (o: Offer) => {
  const q = new URLSearchParams({ oferta: o.slug });
  if (o.audience === "b2c") q.set("za", "doma");
  if (o.audience === "b2b") q.set("za", "biznes");
  if (o.service) q.set("usluga", o.service);
  return `${quoteHref}?${q.toString()}`;
};

/** HVAC calendar in Bulgaria: what customers should do when. General advice, not company claims. */
export const seasons = [
  {
    key: "autumn",
    months: [9, 10, 11],
    name: "Есен",
    title: "Подготовка за отоплителния сезон",
    text: "Профилактика на котли и термопомпи, обезвъздушаване на инсталацията и проверка на подовото отопление, преди да застудее.",
    tone: "red" as const,
  },
  {
    key: "winter",
    months: [12, 1, 2],
    name: "Зима",
    title: "Отопление и планиране",
    text: "Сервиз при нужда и планиране на нови инсталации за строежи и ремонти, които започват през пролетта.",
    tone: "blue" as const,
  },
  {
    key: "spring",
    months: [3, 4, 5],
    name: "Пролет",
    title: "Подготовка за лятото",
    text: "Профилактика на климатиците и монтаж на нови, преди жегите да натоварят графиците.",
    tone: "green" as const,
  },
  {
    key: "summer",
    months: [6, 7, 8],
    name: "Лято",
    title: "Климатизация и термопомпи",
    text: "Климатизация, а също и най-удачното време за монтаж на термопомпа: системата е готова и изпитана преди първия студ.",
    tone: "yellow" as const,
  },
];

/** Uses Europe/Sofia time so the "current season" flips correctly on the server. */
export const currentSeasonKey = (date = new Date()) => {
  const month = Number(new Intl.DateTimeFormat("en-GB", { month: "numeric", timeZone: "Europe/Sofia" }).format(date));
  return seasons.find((s) => s.months.includes(month))!.key;
};
