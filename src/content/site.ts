/**
 * Homepage and global content.
 *
 * Shaped like CMS documents so it can be replaced by a headless CMS query later
 * (Sanity or Payload, pending decision) without touching components.
 *
 * VERIFICATION RULE: every company fact here traces to Project Knowledge.
 * Items marked `verified: false` or `status: "placeholder"` must not ship to production.
 */

export type Discipline = "heating" | "cooling" | "energy" | "neutral";

export const disciplineColor: Record<Discipline, string> = {
  heating: "var(--color-img-red)",
  cooling: "var(--color-img-blue)",
  energy: "var(--color-img-yellow)",
  neutral: "var(--color-img-grey-dark)",
};

export const company = {
  name: "IMG Engineering",
  legalName: "Ай Ем Джи Инженеринг ООД", // Master Brief 2.1
  foundingYear: 1995, // Confirmed by client, 2 Nov 2026.
  url: "https://imgengi.com",
  phone: { display: "0700 14 400", href: "tel:070014400" }, // Confirmed by client.
  email: "office@imgengi.com" as string | null, // Confirmed by client, 2 Nov 2026.
  hours: {
    display: "Понеделник – петък, 8:30 – 17:30",
    short: "Пон. – пет. 8:30 – 17:30",
    schema: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" }],
  }, // Confirmed by client, 2 Nov 2026.
  address: { street: "ул. Ладога", city: "София", country: "BG" }, // building number / postcode NOT verified
  description:
    "Българска инженерна компания за отопление, климатизация и вентилация. Проектиране, доставка, монтаж и поддръжка на сградни инсталации за дома и бизнеса.",
} as const;

export type LogoItem = { name: string; src: string; width: number; height: number };

/** Equipment manufacturers. Supplied and approved for publication by the client, 2 Nov 2026. */
export const partners: LogoItem[] = [
  { name: "Bosch", src: "/logos/partners/bosch.png", width: 237, height: 56 },
  { name: "Romstal", src: "/logos/partners/romstal.png", width: 208, height: 56 },
  { name: "Cairox Airvance", src: "/logos/partners/cairox-airvance.png", width: 160, height: 56 },
  { name: "Тангра", src: "/logos/partners/tangra.png", width: 163, height: 47 },
  { name: "Daikin", src: "/logos/partners/daikin.png", width: 242, height: 52 },
  { name: "Galletti", src: "/logos/partners/galletti.png", width: 162, height: 56 },
  { name: "Carrier", src: "/logos/partners/carrier.png", width: 105, height: 56 },
  { name: "Mitsubishi Electric", src: "/logos/partners/mitsubishi-electric.png", width: 191, height: 56 },
  { name: "Midea", src: "/logos/partners/midea.png", width: 145, height: 56 },
  { name: "Gree", src: "/logos/partners/gree.png", width: 242, height: 48 },
  { name: "Danfoss", src: "/logos/partners/danfoss.png", width: 145, height: 56 },
  { name: "Grundfos", src: "/logos/partners/grundfos.png", width: 242, height: 35 },
  { name: "Carel", src: "/logos/partners/carel.png", width: 170, height: 56 },
  { name: "Honeywell", src: "/logos/partners/honeywell.png", width: 230, height: 51 },
  { name: "Clint", src: "/logos/partners/clint.png", width: 117, height: 56 },
  { name: "Vivax", src: "/logos/partners/vivax.png", width: 159, height: 35 },
  { name: "Belimo", src: "/logos/partners/belimo.png", width: 144, height: 56 },
  { name: "De Dietrich", src: "/logos/partners/de-dietrich.png", width: 242, height: 50 },
  { name: "Vaillant", src: "/logos/partners/vaillant.png", width: 188, height: 45 },
  { name: "BGR Group", src: "/logos/partners/bgr-group.png", width: 155, height: 29 },
  { name: "Viessmann", src: "/logos/partners/viessmann.png", width: 242, height: 51 },
];

/** Client logos. Supplied and approved for publication by the client, 2 Nov 2026. */
export const clients: LogoItem[] = [
  { name: "Интер Експо Център", src: "/logos/clients/inter-ekspo-tsentar.png", width: 135, height: 56 },
  { name: "Raiffeisen Bank", src: "/logos/clients/raiffeisen-bank.png", width: 213, height: 57 },
  { name: "dm", src: "/logos/clients/dm.png", width: 86, height: 57 },
  { name: "Оргахим", src: "/logos/clients/orgahim.png", width: 218, height: 52 },
  { name: "H&M", src: "/logos/clients/h-m.png", width: 85, height: 56 },
  { name: "Puma", src: "/logos/clients/puma.png", width: 113, height: 56 },
  { name: "Kiddo", src: "/logos/clients/kiddo.png", width: 150, height: 58 },
  { name: "Контракт Сити", src: "/logos/clients/kontrakt-siti.png", width: 130, height: 56 },
  { name: "Fortex Nutraceuticals", src: "/logos/clients/fortex-nutraceuticals.png", width: 282, height: 72 },
  { name: "UniCredit Bulbank", src: "/logos/clients/unicredit-bulbank.png", width: 242, height: 30 },
  { name: "Postbank", src: "/logos/clients/postbank.png", width: 181, height: 56 },
  { name: "Metro", src: "/logos/clients/metro.png", width: 129, height: 56 },
  { name: "Next Level Fitness Club", src: "/logos/clients/next-level-fitness-club.png", width: 162, height: 75 },
  { name: "Банка ДСК", src: "/logos/clients/banka-dsk.png", width: 240, height: 50 },
  { name: "GBM", src: "/logos/clients/gbm.png", width: 56, height: 55 },
  { name: "Business Park Sofia", src: "/logos/clients/business-park-sofia.png", width: 111, height: 53 },
  { name: "Овергаз", src: "/logos/clients/overgaz.png", width: 109, height: 56 },
  { name: "PricewaterhouseCoopers", src: "/logos/clients/pricewaterhousecoopers.png", width: 220, height: 34 },
  { name: "Altest", src: "/logos/clients/altest.png", width: 178, height: 112 },
];

export type Media = { src: string; width: number; height: number; alt: string; stock?: boolean };

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Начало", href: "/" },
  { label: "За дома", href: "/za-doma/" },
  { label: "За бизнеса", href: "/za-biznesa/" },
  { label: "Услуги", href: "/uslugi/" },
  { label: "Проекти", href: "/proekti/" },
  { label: "Полезно", href: "/polezno/" },
  { label: "За нас", href: "/za-nas/" },
  { label: "Контакти", href: "/kontakti/" },
];

export const quoteHref = "/poiskayte-oferta/";

export const hero = {
  eyebrow: "ОВК инженеринг · от 1995 г.",
  title: ["Инженерни решения", "за комфорт и ефективност."],
  lead: "Проектиране, доставка, монтаж и поддръжка на отоплителни, климатични и вентилационни системи за дома и бизнеса.",
  primary: { label: "Поискайте оферта", href: quoteHref },
  secondary: { label: "Разгледайте нашите проекти", href: "#proekti" },
  /** Licensed stock footage chosen by the client for launch. Not an IMG project; no claim is made about it. */
  video: {
    src: "/video/hero-rooftop.mp4",
    poster: "/video/hero-rooftop-poster.webp",
    width: 1138,
    height: 808,
  },
};

/** Authentic IMG Engineering team photo (company jacket visible). */
export const teamPhoto: Media = {
  src: "/images/ekip-img-engineering-montazh.webp",
  width: 1020,
  height: 680,
  alt: "Техник на IMG Engineering по време на монтаж на отоплително тяло",
};

export const trust = {
  eyebrow: "Инженерна експертиза",
  title: "Инженерен партньор за сградни инсталации от 1995 г.",
  body: "IMG Engineering е българска инженерна компания, която предлага цялостни решения за отопление, климатизация и вентилация. От техническото планиране и избора на оборудване до професионалния монтаж и дългосрочната поддръжка.",
  points: [
    {
      title: "Инженерни възможности",
      text: "Проектиране на ОВК системи и подбор на оборудване според техническите изисквания на конкретната сграда.",
    },
    {
      title: "Интегрирани услуги",
      text: "Проектиране, доставка, монтаж и поддръжка от един инженерен партньор.",
    },
    {
      title: "Професионален монтаж",
      text: "Монтаж и въвеждане в експлоатация на отоплителни, климатични и вентилационни системи.",
    },
    {
      title: "Дългосрочна поддръжка",
      text: "Сервизно обслужване, което помага на системите да работят надеждно и ефективно във времето.",
    },
  ],
};

export type Audience = {
  key: "b2c" | "b2b";
  eyebrow: string;
  title: string;
  text: string;
  links: NavItem[];
  cta: NavItem;
  mediaLabel: string;
  media?: Media;
};

export const audiences: Audience[] = [
  {
    key: "b2c",
    eyebrow: "За дома",
    title: "Отопление, охлаждане и енергийно ефективни решения за къщи и апартаменти.",
    text: "За собственици на жилища, хора, които строят своя дом, и всички, които ремонтират. Помагаме да изберете подходящата система и я изпълняваме цялостно.",
    links: [
      { label: "Водно подово отопление", href: "/uslugi/podovo-otoplenie/" },
      { label: "Термопомпи за дома", href: "/uslugi/termopompi/" },
      { label: "Климатизация за дома", href: "/uslugi/klimatizatsiya/#za-doma" },
      { label: "Цялостни решения за дома", href: "/za-doma/tsyalostno-reshenie/" },
    ],
    cta: { label: "Решения за дома", href: "/za-doma/" },
    mediaLabel: "Жилищен обект",
    media: {
      src: "/images/podovo-otoplenie-montazh.webp",
      width: 1600,
      height: 900,
      alt: "Монтаж на водно подово отопление в жилищно помещение, преди полагане на замазката",
    },
  },
  {
    key: "b2b",
    eyebrow: "За бизнеса",
    title: "Проектиране, монтаж и техническа поддръжка на ОВК системи за търговски и индустриални сгради.",
    text: "За инвеститори, строителни компании, архитекти, собственици на търговски имоти и фасилити мениджъри. Работим от техническото решение до въвеждането в експлоатация и сервиза.",
    links: [
      { label: "ОВК проектиране", href: "/uslugi/ovk-proektirane/" },
      { label: "Вентилация за бизнес обекти", href: "/uslugi/ventilatsiya/#za-biznesa" },
      { label: "Климатизация за бизнес обекти", href: "/uslugi/klimatizatsiya/#za-biznesa" },
      { label: "Отоплителни системи", href: "/uslugi/otoplenie/#za-biznesa" },
    ],
    cta: { label: "Решения за бизнеса", href: "/za-biznesa/" },
    mediaLabel: "Търговска сграда",
    media: {
      src: "/images/biznes-chilar-pokriv.webp",
      width: 900,
      height: 506,
      alt: "Монтаж на чилър с въздушно охлаждане на покрива на търговска сграда",
    },
  },
];

export type ServiceIconName =
  | "heating"
  | "ventilation"
  | "cooling"
  | "heatpump"
  | "underfloor"
  | "design"
  | "gas"
  | "service";

export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: ServiceIconName;
  discipline: Discipline;
};

/** Service URLs are provisional: canonical routing per search intent is pending (Blueprint, SEO section). */
export const services: Service[] = [
  {
    slug: "otoplenie",
    name: "Отопление",
    description: "Отоплителни инсталации за жилищни и търговски сгради, съобразени с топлинните нужди на обекта.",
    icon: "heating",
    discipline: "heating",
  },
  {
    slug: "ventilatsiya",
    name: "Вентилация",
    description: "Вентилационни системи за свеж въздух и контролиран въздухообмен в жилищни, търговски и производствени помещения.",
    icon: "ventilation",
    discipline: "cooling",
  },
  {
    slug: "klimatizatsiya",
    name: "Климатизация",
    description: "Климатични системи за дома и бизнеса, от жилища до офис и търговски сгради.",
    icon: "cooling",
    discipline: "cooling",
  },
  {
    slug: "termopompi",
    name: "Термопомпи",
    description: "Термопомпени системи за енергийно ефективно отопление и охлаждане, включително в комбинация с подово отопление.",
    icon: "heatpump",
    discipline: "energy",
  },
  {
    slug: "podovo-otoplenie",
    name: "Подово отопление",
    description: "Водно подово отопление с равномерно разпределение на топлината в помещенията.",
    icon: "underfloor",
    discipline: "heating",
  },
  {
    slug: "ovk-proektirane",
    name: "ОВК проектиране",
    description: "Проектиране на отоплителни, вентилационни и климатични инсталации според техническите изисквания на сградата.",
    icon: "design",
    discipline: "neutral",
  },
  {
    slug: "gazifikatsiya",
    name: "Газификация",
    description: "Газови инсталации за жилищни и търговски обекти.",
    icon: "gas",
    discipline: "energy",
  },
  {
    slug: "serviz-i-poddrazhka",
    name: "Сервиз и поддръжка",
    description: "Техническо обслужване и поддръжка за надеждна и ефективна работа на инсталациите във времето.",
    icon: "service",
    discipline: "neutral",
  },
];

export const principles = [
  {
    title: "Инженерен подход",
    text: "Всяко решение започва от техническите изисквания на конкретната сграда, а не от стандартна препоръка за оборудване.",
  },
  {
    title: "Цялостно изпълнение",
    text: "Един партньор за всички етапи: от планирането и избора на оборудване до монтажа и въвеждането в експлоатация.",
  },
  {
    title: "Дългосрочна надеждност",
    text: "Мислим за работата на системата във времето: ефективност, достъп за обслужване и правилна поддръжка.",
  },
];

/** PROPOSED process (Master Brief 6, Section 7). Confirm the actual commercial workflow. */
export const processSteps = [
  { title: "Запитване", text: "Изпращате запитване онлайн или по телефона с основна информация за обекта." },
  { title: "Консултация", text: "Обсъждаме нуждите, сградата и очакванията ви към системата." },
  { title: "Техническо решение", text: "Предлагаме подходяща система и оборудване според техническите изисквания." },
  { title: "Оферта", text: "Получавате оферта с ясно описан обхват на доставката и работата." },
  { title: "Изпълнение", text: "Монтаж и въвеждане на системата в експлоатация." },
  { title: "Поддръжка", text: "Сервизно обслужване за надеждна работа във времето." },
];

/** Guide teasers (full content in guides.ts). No dates or authors until reviewed by IMG. */
export const articles = [
  {
    slug: "kak-da-izberem-termopompa-za-kashta",
    category: "Термопомпи",
    title: "Как да изберем термопомпа за къща?",
    teaser: "Кои фактори определят подходящата мощност и тип система за вашия дом.",
  },
  {
    slug: "podovo-otoplenie-kakvo-tryabva-da-znaem",
    category: "Подово отопление",
    title: "Подово отопление. Какво трябва да знаем?",
    teaser: "Как работи водното подово отопление и какво да планирате преди ремонт или строеж.",
  },
  {
    slug: "kakvo-vklyuchva-ovk-proektiraneto",
    category: "ОВК проектиране",
    title: "Какво включва професионалното ОВК проектиране?",
    teaser: "Етапите на проектиране и защо то предхожда избора на оборудване.",
  },
];

export const finalCta = {
  title: "Имате проект? Нека намерим правилното инженерно решение.",
  text: "Независимо дали планирате отопление за дома си или комплексна ОВК инсталация за бизнес обект, нашият екип е на разположение.",
  cta: { label: "Изпратете запитване", href: quoteHref },
  segments: [
    { label: "Запитване за дома", href: `${quoteHref}?za=doma` },
    { label: "Запитване за бизнес обект", href: `${quoteHref}?za=biznes` },
  ],
};

export const legalNav: NavItem[] = [
  { label: "Политика за поверителност", href: "/poveritelnost/" },
  { label: "Политика за бисквитките", href: "/biskvitki/" },
];

