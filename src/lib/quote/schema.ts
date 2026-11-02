/**
 * Quote request schema. Shared by the client (inline errors) and the server (authoritative check).
 * No external validation library: the rules are few and explicit.
 */

export type Audience = "b2c" | "b2b";

export const SERVICE_OPTIONS = [
  { value: "termopompi", label: "Термопомпа" },
  { value: "podovo-otoplenie", label: "Подово отопление" },
  { value: "klimatizatsiya", label: "Климатизация" },
  { value: "otoplenie", label: "Отопление" },
  { value: "ventilatsiya", label: "Вентилация" },
  { value: "ovk-proektirane", label: "ОВК проектиране" },
  { value: "gazifikatsiya", label: "Газификация" },
  { value: "serviz-i-poddrazhka", label: "Сервиз и поддръжка" },
  { value: "konsultatsiya", label: "Не съм сигурен, нужна ми е консултация" },
  { value: "drugo", label: "Друго запитване" },
] as const;

export const PROPERTY_OPTIONS_B2C = [
  { value: "kashta", label: "Къща" },
  { value: "apartament", label: "Апартамент" },
  { value: "drugo", label: "Друго" },
] as const;

export const PROPERTY_OPTIONS_B2B = [
  { value: "ofis", label: "Офис сграда" },
  { value: "targovski", label: "Търговски обект" },
  { value: "proizvodstven", label: "Производствена или складова сграда" },
  { value: "hotel-obshtestvena", label: "Хотел или обществена сграда" },
  { value: "zhilishtna-sgrada", label: "Жилищна сграда (инвеститор)" },
  { value: "drugo", label: "Друго" },
] as const;

export type QuoteInput = {
  audience: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  propertyType: string;
  area: string;
  location: string;
  message: string;
  marketingConsent: boolean;
};

export type QuoteData = {
  audience: Audience;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  service: string;
  propertyType: string | null;
  area: string | null;
  location: string;
  message: string | null;
  marketingConsent: boolean;
};

export type FieldErrors = Partial<Record<keyof QuoteInput | "contact", string>>;

const LIMITS = { name: 100, company: 150, phone: 30, email: 254, area: 40, location: 120, message: 3000 };

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Accepts Bulgarian and international numbers: +359 88 123 4567, 0888123456, 0700 14 400. */
const PHONE_RE = /^\+?[0-9\s\-()]{6,30}$/;
const digits = (v: string) => v.replace(/\D/g, "").length;

export const labelOf = (options: readonly { value: string; label: string }[], value: string | null) =>
  options.find((o) => o.value === value)?.label ?? value ?? "";

/** Read a FormData (browser or server) into a plain input object. */
export function fromFormData(fd: FormData): QuoteInput {
  const get = (k: string) => (fd.get(k) as string | null) ?? "";
  const audience = get("audience");
  return {
    audience,
    name: get("name"),
    company: get("company"),
    phone: get("phone"),
    email: get("email"),
    service: get("service"),
    // Separate selects per audience (both are in the DOM so the form works without JavaScript).
    propertyType: get(audience === "b2b" ? "propertyTypeB2B" : "propertyTypeB2C") || get("propertyType"),
    area: get("area"),
    location: get("location"),
    message: get("message"),
    marketingConsent: fd.get("marketingConsent") === "on" || fd.get("marketingConsent") === "true",
  };
}

export function validateQuote(raw: QuoteInput): { ok: true; data: QuoteData } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const audience = raw.audience === "b2b" ? "b2b" : raw.audience === "b2c" ? "b2c" : null;
  const name = clean(raw.name, LIMITS.name);
  const company = clean(raw.company, LIMITS.company);
  const phone = clean(raw.phone, LIMITS.phone);
  const email = clean(raw.email, LIMITS.email).toLowerCase();
  const service = clean(raw.service, 40);
  const propertyType = clean(raw.propertyType, 40);
  const area = clean(raw.area, LIMITS.area);
  const location = clean(raw.location, LIMITS.location);
  const message = clean(raw.message, LIMITS.message);

  if (!audience) errors.audience = "Изберете дали запитването е за дома или за бизнес обект.";
  if (name.length < 2) errors.name = "Въведете вашето име.";
  if (audience === "b2b" && company.length < 2) errors.company = "Въведете името на компанията.";
  if (!phone && !email) errors.contact = "Въведете телефон или имейл, за да можем да се свържем с вас.";
  if (phone && (!PHONE_RE.test(phone) || digits(phone) < 6)) errors.phone = "Въведете валиден телефонен номер.";
  if (email && !EMAIL_RE.test(email)) errors.email = "Въведете валиден имейл адрес.";
  if (!SERVICE_OPTIONS.some((o) => o.value === service)) errors.service = "Изберете вид услуга.";
  const props = audience === "b2b" ? PROPERTY_OPTIONS_B2B : PROPERTY_OPTIONS_B2C;
  if (propertyType && !props.some((o) => o.value === propertyType)) errors.propertyType = "Изберете тип обект от списъка.";
  if (audience === "b2b" && !propertyType) errors.propertyType = "Изберете тип обект.";
  if (location.length < 2) errors.location = audience === "b2b" ? "Въведете местоположението на обекта." : "Въведете населено място.";
  if (audience === "b2b" && message.length < 10) errors.message = "Опишете накратко проекта (поне няколко думи).";
  // Link-stuffing is the most common spam pattern in free-text fields.
  if ((message.match(/https?:\/\//gi) ?? []).length > 2) errors.message = "Съобщението съдържа твърде много връзки.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      audience: audience as Audience,
      name,
      company: audience === "b2b" ? company : null,
      phone: phone || null,
      email: email || null,
      service,
      propertyType: propertyType || null,
      area: area || null,
      location,
      message: message || null,
      marketingConsent: Boolean(raw.marketingConsent),
    },
  };
}
