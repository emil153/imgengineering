/**
 * Projects (/proekti/). Grouped from client-supplied photos.
 *
 * VERIFICATION RULE: grouping follows the photo files (B2B folder "pic_N" groups, residential
 * Viber batches). Titles name the building type only; summaries describe what is VISIBLE in the photos.
 * Client names, locations, dates and scope are added only after IMG Engineering confirms them.
 */
import type { Media } from "./site";

export type ProjectPhoto = Media & { caption: string };

export type Project = {
  slug: string;
  title: string;
  buildingType: string;
  audience: "b2c" | "b2b";
  services: string[];
  summary: string;
  photos: ProjectPhoto[];
  /** Original file group, kept for the confirmation table with IMG. Not rendered. */
  sourceGroup: string;
};

const ph = (file: string, width: number, height: number, alt: string, caption: string): ProjectPhoto => ({
  src: `/images/${file}.webp`,
  width,
  height,
  alt,
  caption,
});

export const projects: Project[] = [
  {
    slug: "pokrivni-ovk-sistemi-targovska-sgrada",
    title: "Покривни ОВК системи на търговска сграда",
    buildingType: "Търговска сграда",
    audience: "b2b",
    services: ["klimatizatsiya", "ventilatsiya", "serviz-i-poddrazhka"],
    summary:
      "Монтаж на чилър с въздушно охлаждане, вентилационни агрегати и външни тела на климатични системи на покрива на търговска сграда. На снимките е и вибродиагностика на оборудването.",
    photos: [
      ph("biznes-chilar-pokriv", 900, 506, "Монтаж на чилър с въздушно охлаждане на покрив", "Монтаж на чилъра"),
      ph("biznes-pokrivni-agregati", 675, 506, "Вентилационни агрегати и чилър на покрива", "Агрегати на покрива"),
      ph("biznes-pokrivni-traseta", 675, 506, "Тръбни трасета и външни тела на климатични системи на покрива", "Тръбни трасета и външни тела"),
      ph("biznes-vibrodiagnostika", 506, 380, "Измерване на вибрации и температура на оборудване с уред Fluke", "Вибродиагностика"),
    ],
    sourceGroup: "B2B Clients / pic_2_*",
  },
  {
    slug: "fitnes-tsentar",
    title: "ОВК инсталации във фитнес център",
    buildingType: "Фитнес център",
    audience: "b2b",
    services: ["ventilatsiya", "klimatizatsiya"],
    summary:
      "Вентилационни въздуховоди, монтирани открито в тренировъчната зала, и външни тела на климатичната система на покрива на сградата.",
    photos: [
      ph("biznes-fitnes-zala", 1000, 750, "Фитнес зала с открити вентилационни въздуховоди", "Тренировъчна зала"),
      ph("biznes-vanshni-tela-pokriv", 800, 600, "Външни тела на климатична система на покрив през зимата", "Външни тела на покрива"),
      ph("proekt-fitnes-ofis-zona", 800, 600, "Остъклено пространство с таванни инсталации по време на изпълнение", "Пространство по време на изпълнението"),
    ],
    sourceGroup: "B2B Clients / pic_12_*",
  },
  {
    slug: "ofis-kasetachna-klimatizatsiya",
    title: "Климатизация на офис пространство",
    buildingType: "Офис",
    audience: "b2b",
    services: ["klimatizatsiya"],
    summary: "Климатизация на офис пространство с касетъчни вътрешни тела, вградени в окачения таван.",
    photos: [
      ph("biznes-kasetachno-tyalo-ofis", 675, 506, "Касетъчно вътрешно тяло на климатична система в офис", "Касетъчно тяло в таван"),
      ph("proekt-ofis-montazh-tavan", 675, 506, "Техник изгражда тръбни трасета над окачения таван", "Изграждане на трасетата"),
      ph("proekt-ofis-pomeshtenia", 675, 506, "Офис помещения с окачен таван след изпълнението", "Офис помещенията"),
    ],
    sourceGroup: "B2B Clients / pic_1_*",
  },
  {
    slug: "ventilatsiya-mnogoetazhna-sgrada",
    title: "Вентилационна инсталация на многоетажна сграда",
    buildingType: "Многоетажна сграда",
    audience: "b2b",
    services: ["ventilatsiya"],
    summary:
      "Вентилационни въздуховоди, изведени по фасадата и покрива на многоетажна сграда. Монтажът на височина е изпълнен с автовишка.",
    photos: [
      ph("biznes-vazduhovodi-fasada", 750, 562, "Вентилационни въздуховоди по фасадата на сграда", "Въздуховоди по фасадата"),
      ph("proekt-vazduhovod-strqha", 750, 562, "Въздуховод, изведен над покрива на многоетажна сграда", "Изход над покрива"),
      ph("biznes-montazh-avtovishka", 750, 562, "Монтаж на въздуховоди по фасада с автовишка", "Монтаж с автовишка"),
      ph("proekt-vazduhovod-pokriv", 750, 562, "Монтажници в кош на автовишка до въздуховод на покрива", "Монтаж на покрива"),
    ],
    sourceGroup: "B2B Clients / pic_13_*",
  },
  {
    slug: "targovski-obekt",
    title: "Сградни инсталации в търговски обект",
    buildingType: "Търговски обект",
    audience: "b2b",
    services: [],
    summary: "Търговско пространство по време на изпълнението на сградните инсталации.",
    photos: [
      ph("biznes-targovski-obekt", 800, 600, "Търговско пространство по време на изпълнение", "Търговското пространство"),
      ph("proekt-targovski-obekt-2", 800, 600, "Търговско пространство с окачен таван и осветление", "Таванът на обекта"),
    ],
    sourceGroup: "B2B Clients / pic_11_*",
  },
  {
    slug: "ofis-klientska-zona",
    title: "Клиентска зона в офис",
    buildingType: "Офис",
    audience: "b2b",
    services: ["ventilatsiya", "klimatizatsiya"],
    summary: "Клиентска зона с вентилационни решетки и дифузори, интегрирани в окачения таван.",
    photos: [ph("biznes-ofis-zona", 750, 562, "Клиентска зона с вентилационни решетки в окачения таван", "Клиентската зона")],
    sourceGroup: "B2B Clients / pic_16_*",
  },
  {
    slug: "kashta-termopompa-podovo-otoplenie",
    title: "Термопомпа и водно подово отопление в къща",
    buildingType: "Еднофамилна къща",
    audience: "b2c",
    services: ["termopompi", "podovo-otoplenie"],
    summary:
      "Термопомпа въздух-вода с вътрешен модул и бойлер в техническото помещение и водно подово отопление в жилищните помещения.",
    photos: [
      ph("dom-termopompa-vanshno-tyalo", 1013, 760, "Външно тяло на термопомпа въздух-вода до къща", "Външно тяло на термопомпата"),
      ph("dom-tehnichesko-pomeshtenie", 1013, 760, "Техническо помещение с вътрешен модул на термопомпа и бойлер", "Техническо помещение"),
      ph("podovo-otoplenie-montazh", 1600, 900, "Водно подово отопление, положено преди замазката", "Подово отопление преди замазка"),
      ph("dom-podovo-otoplenie-staya", 1200, 900, "Тръби за водно подово отопление в стая", "Кръгове в стая"),
      ph("dom-podovo-otoplenie-kragove", 1200, 900, "Кръгове на подово отопление върху системни плочи", "Системни плочи и кръгове"),
      ph("dom-podovo-otoplenie-kolektor", 1200, 900, "Подаващи тръби на кръговете на подовото отопление", "Подаващи тръби"),
    ],
    sourceGroup: "Underfloor heating and heat pumps / viber 2026-09-19 10-37 и 10-45",
  },
  {
    slug: "zhilishten-obekt-termopompa-klimatizatsiya",
    title: "Термопомпа и климатизация в жилищен обект",
    buildingType: "Жилищен обект",
    audience: "b2c",
    services: ["termopompi", "klimatizatsiya"],
    summary:
      "Монтаж на термопомпа въздух-вода от екипа на IMG Engineering и климатизация със стенни и подови вътрешни тела.",
    photos: [
      ph("montazh-termopompa-vazduh-voda", 1013, 760, "Екип на IMG Engineering монтира термопомпа въздух-вода", "Монтаж на термопомпата"),
      ph("dom-ekip-montazh-termopompa", 1013, 760, "Техници свързват външното тяло на термопомпа", "Свързване на външното тяло"),
      ph("proekt-termopompa-montazh-2", 1013, 760, "Техници при монтажа на термопомпата", "Монтажни работи"),
      ph("proekt-termopompa-montazh-3", 1013, 760, "Техник на IMG Engineering до външното тяло", "Подготовка на връзките"),
      ph("dom-vanshno-tyalo-fasada", 1013, 760, "Външно тяло на климатик, монтирано на фасада", "Външно тяло на климатик"),
      ph("dom-podov-konvektor", 1351, 1013, "Подов климатичен конвектор в жилищна стая", "Подов конвектор"),
    ],
    sourceGroup: "Underfloor heating and heat pumps / viber 2026-09-19 10-51",
  },
  {
    slug: "kashta-termopompa-vazduh-voda",
    title: "Термопомпа въздух-вода за еднофамилна къща",
    buildingType: "Еднофамилна къща",
    audience: "b2c",
    services: ["termopompi"],
    summary: "Външно тяло на термопомпа въздух-вода, монтирано на стойки върху бетонна основа до къщата.",
    photos: [
      ph("dom-termopompa-kashta", 1600, 900, "Термопомпа, монтирана на стойка до къща", "Термопомпата до къщата"),
      ph("proekt-kashta-termopompa-2", 1013, 760, "Стойки и основа на външното тяло на термопомпа", "Основа и стойки"),
    ],
    sourceGroup: "Underfloor heating and heat pumps / viber 2026-07-10",
  },
];

export const featuredProjectSlugs = ["pokrivni-ovk-sistemi-targovska-sgrada", "fitnes-tsentar", "kashta-termopompa-podovo-otoplenie"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
