/**
 * Offers (/oferti/), the rolling banner and the new-customer discount.
 *
 * status:
 *  - "confirmed": requested/confirmed by the client. Shown everywhere, including the rolling banner.
 *  - "to-confirm": seen on the current imgengi.com, but terms or validity are unclear. Shown on /oferti/ with a badge.
 *  - "proposal": seasonal offer proposed by the agency. Shown on /oferti/ with a badge; needs IMG approval and pricing.
 * Set SHOW_UNCONFIRMED_OFFERS to false before launch to hide everything except "confirmed".
 */
import { quoteHref, type Media } from "./site";

export const SHOW_UNCONFIRMED_OFFERS = true;

export type Season = "heating" | "cooling" | "all-year";

export type Offer = {
  slug: string;
  status: "confirmed" | "to-confirm" | "proposal";
  title: string;
  banner: string;
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

export const offers: Offer[] = [
  {
    slug: "podovo-otoplenie-22-eur",
    status: "confirmed",
    title: "Водно подово отопление от 22 € / m²",
    banner: "Водно подово отопление от 22 € / m² с доставка и монтаж",
    badge: "Актуална оферта",
    price: { prefix: "от", value: "22 €", unit: "/ m²", note: "без ДДС" },
    lead: "Водно подово отопление с доставка на материалите и монтаж от екипа на IMG Engineering.",
    includes: [
      "Тръба за подово отопление HERZ 16 × 2 с кислородна бариера",
      "Подложка SPS 200, 1 cm",
      "Доставка на материалите до обекта",
      "Монтаж от екипа на IMG Engineering",
    ],
    conditions: [
      "Цената е без ДДС.",
      "Окончателната цена се определя според площта и конкретния обект и се посочва в индивидуалната оферта.",
    ],
    validity: "[Срок на валидност: за потвърждение]",
    audience: "b2c",
    season: "heating",
    service: "podovo-otoplenie",
    media: { src: "/images/dom-podovo-otoplenie-kragove.webp", width: 1200, height: 900, alt: "Кръгове на водно подово отопление върху системни плочи" },
    tone: "red",
  },
  {
    slug: "novi-klienti-5",
    status: "confirmed",
    title: "5% отстъпка за нови клиенти",
    banner: "5% отстъпка за нови клиенти",
    badge: "За нови клиенти",
    price: { value: "−5%", unit: "", note: "от стойността на офертата" },
    lead: "Попълнете формата и отстъпката ще бъде отразена в офертата за вашия обект.",
    includes: ["Валидна за всички услуги: отопление, климатизация, вентилация, термопомпи, подово отопление"],
    conditions: [
      "Отстъпката се прилага към първата поръчка на нов клиент.",
      "[Комбиниране с други оферти и изключения: за потвърждение]",
    ],
    validity: "[Срок на валидност: за потвърждение]",
    audience: "all",
    season: "all-year",
    tone: "green",
  },
  {
    slug: "ariston-nimbus-5",
    status: "to-confirm",
    title: "5% отстъпка за термопомпи Ariston Nimbus R32",
    banner: "5% отстъпка за термопомпи Ariston Nimbus R32",
    badge: "Термопомпи",
    price: { value: "−5%", unit: "", note: "за модели Ariston Nimbus R32" },
    lead: "Отстъпка за термопомпи въздух-вода Ariston Nimbus с хладилен агент R32.",
    includes: ["Подбор на модела според топлинните нужди на сградата", "Доставка и монтаж"],
    conditions: ["[Условия и срок: за потвърждение. Офертата е посочена на сегашния сайт без подробности.]"],
    validity: "[за потвърждение]",
    audience: "b2c",
    season: "heating",
    service: "termopompi",
    media: { src: "/images/dom-termopompa-vanshno-tyalo.webp", width: 1013, height: 760, alt: "Външно тяло на термопомпа Ariston до къща" },
    tone: "yellow",
  },
  {
    slug: "profilaktika-otoplenie",
    status: "proposal",
    title: "Профилактика преди отоплителния сезон",
    banner: "Профилактика на термопомпи и котли преди зимата",
    badge: "Есен и зима",
    lead: "Проверка на термопомпи, котли и отоплителни инсталации, преди да се натоварят в студените месеци.",
    includes: [
      "Проверка на работните параметри",
      "Почистване на филтри и топлообменници",
      "Проверка на налягането и обезвъздушаване на инсталацията",
      "Препоръки за настройка и ремонт",
    ],
    conditions: ["[Цена и обхват: за определяне от IMG Engineering]"],
    validity: "Септември – ноември",
    audience: "all",
    season: "heating",
    service: "serviz-i-poddrazhka",
    media: { src: "/images/biznes-vibrodiagnostika.webp", width: 506, height: 380, alt: "Диагностика на оборудване с уред Fluke" },
    tone: "red",
  },
  {
    slug: "profilaktika-klimatik",
    status: "proposal",
    title: "Профилактика на климатик преди лятото",
    banner: "Профилактика на климатици преди жегите",
    badge: "Пролет и лято",
    lead: "Почистване и проверка на климатиците, преди да започне сезонът на охлаждане и графиците се запълнят.",
    includes: [
      "Почистване на филтрите и топлообменниците на вътрешното и външното тяло",
      "Проверка на дренажа",
      "Проверка на работните параметри",
    ],
    conditions: ["[Цена на тяло и отстъпка при повече тела: за определяне от IMG Engineering]"],
    validity: "Март – май",
    audience: "all",
    season: "cooling",
    service: "klimatizatsiya",
    media: { src: "/images/dom-klimatik-i-radiator.webp", width: 1013, height: 760, alt: "Стенен климатик в жилищно помещение" },
    tone: "blue",
  },
];

export const visibleOffers = offers.filter((o) => SHOW_UNCONFIRMED_OFFERS || o.status === "confirmed");
export const bannerOffers = offers.filter((o) => o.status === "confirmed");
export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);
export const newCustomerOffer = offers.find((o) => o.slug === "novi-klienti-5")!;

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
