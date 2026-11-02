/**
 * Service area: Sofia + settlements within ~30 km (straight-line distance from central Sofia).
 * Coordinates are approximate town centres; the map is a schematic, not a navigation map.
 */
export const AREA_RADIUS_KM = 30;

export const areaTowns: { name: string; lat: number; lng: number }[] = [
  { name: "Герман", lat: 42.617, lng: 23.408 },
  { name: "Божурище", lat: 42.7569, lng: 23.2042 },
  { name: "Владая", lat: 42.634, lng: 23.203 },
  { name: "Казичене", lat: 42.66, lng: 23.461 },
  { name: "Нови Искър", lat: 42.8089, lng: 23.35 },
  { name: "Бистрица", lat: 42.588, lng: 23.364 },
  { name: "Панчарево", lat: 42.596, lng: 23.413 },
  { name: "Мърчаево", lat: 42.623, lng: 23.188 },
  { name: "Банкя", lat: 42.7068, lng: 23.145 },
  { name: "Костинброд", lat: 42.815, lng: 23.2144 },
  { name: "Кокаляне", lat: 42.57, lng: 23.432 },
  { name: "Лозен", lat: 42.6, lng: 23.483 },
  { name: "Железница", lat: 42.536, lng: 23.361 },
  { name: "Елин Пелин", lat: 42.668, lng: 23.6 },
  { name: "Перник", lat: 42.605, lng: 23.038 },
  { name: "Петърч", lat: 42.68, lng: 23.006 },
  { name: "Сливница", lat: 42.851, lng: 23.038 },
  { name: "Своге", lat: 42.96, lng: 23.35 },
];
