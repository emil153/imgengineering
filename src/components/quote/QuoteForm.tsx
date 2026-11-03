"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { company } from "@/content/site";
import {
  OFFER_OPTIONS,
  PROPERTY_OPTIONS_B2B,
  PROPERTY_OPTIONS_B2C,
  SERVICE_OPTIONS,
  fromFormData,
  validateQuote,
  type FieldErrors,
} from "@/lib/quote/schema";

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; id: string } | { kind: "error"; message: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
/** Pushes to the GTM/GA4 data layer only if one exists (it is loaded after consent). No personal data. */
const track = (event: string, params: Record<string, string>) => window.dataLayer?.push({ event, ...params });

const inputCls =
  "mt-2 block w-full border border-black/25 bg-white px-4 py-3 text-base text-img-black placeholder:text-img-grey-dark/70 transition-colors hover:border-black/50 focus:border-img-black focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-img-red";

const FIELD_ORDER = ["audience", "name", "company", "contact", "phone", "email", "service", "propertyType", "location", "message"] as const;
const FIELD_LABELS: Record<string, string> = {
  audience: "Тип запитване",
  name: "Име",
  company: "Компания",
  contact: "Телефон или имейл",
  phone: "Телефон",
  email: "Имейл",
  service: "Услуга",
  propertyType: "Тип обект",
  location: "Местоположение",
  message: "Описание",
};

function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[15px] font-medium">
        {label}
        {required && (
          <span className="text-img-red" aria-hidden="true">
            {" "}*
          </span>
        )}
        {required && <span className="sr-only"> (задължително)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-img-grey-dark">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-img-red">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: boolean) =>
  [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

type QuoteFormProps = {
  /** Pre-attach an offer (e.g. the new-customer discount form). URL ?oferta= also works. */
  offer?: string;
  submitLabel?: string;
  /** Pre-tick the free site visit / heating calculation box. URL ?ogled=1 also works. */
  freeVisitDefault?: boolean;
};

export function QuoteForm({ offer: fixedOffer, submitLabel = "Изпратете запитване", freeVisitDefault = false }: QuoteFormProps = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [offer, setOffer] = useState<string | null>(fixedOffer ?? null);
  const offerLabel = offer ? OFFER_OPTIONS.find((o) => o.value === offer)?.label : null;

  // Prefill from ?za=doma|biznes and ?usluga=<slug>; stamp the start time for the spam check.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    (form.elements.namedItem("t") as HTMLInputElement).value = String(Date.now());
    (form.elements.namedItem("page") as HTMLInputElement).value = document.referrer ? new URL(document.referrer).pathname : "";
    const q = new URLSearchParams(window.location.search);
    const za = q.get("za");
    const audience = za === "biznes" ? "b2b" : za === "doma" ? "b2c" : null;
    if (audience) (form.querySelector(`input[name="audience"][value="${audience}"]`) as HTMLInputElement | null)?.click();
    const oferta = q.get("oferta");
    if (!fixedOffer && oferta && OFFER_OPTIONS.some((o) => o.value === oferta)) setOffer(oferta);
    if (q.get("ogled") === "1") (form.elements.namedItem("freeVisit") as HTMLInputElement).checked = true;
    const usluga = q.get("usluga");
    if (usluga && SERVICE_OPTIONS.some((o) => o.value === usluga)) (form.elements.namedItem("service") as HTMLSelectElement).value = usluga;
  }, [fixedOffer]);

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("quote_form_start", {});
  };

  const clearError = (name: string) =>
    setErrors((e) => {
      if (!(name in e) && !(name === "phone" || name === "email")) return e;
      const next = { ...e };
      delete next[name as keyof FieldErrors];
      if (name === "phone" || name === "email") delete next.contact;
      return next;
    });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const check = validateQuote(fromFormData(fd));
    if (!check.ok) {
      setErrors(check.errors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/quote/", { method: "POST", body: fd, headers: { accept: "application/json" } });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.ok) {
        track("quote_form_submit", { audience: check.data.audience, service: check.data.service, offer: check.data.offer ?? "" });
        setStatus({ kind: "success", id: body.id });
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (body?.error === "validation") {
        setErrors(body.fields ?? {});
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setStatus({
        kind: "error",
        message:
          body?.error === "rate_limited"
            ? "Изпратихте няколко запитвания за кратко време. Опитайте отново след малко или ни се обадете."
            : "Запитването не можа да бъде изпратено поради технически проблем. Опитайте отново или ни се обадете.",
      });
    } catch {
      setStatus({ kind: "error", message: "Няма връзка със сървъра. Проверете интернет връзката си и опитайте отново или ни се обадете." });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="border border-black/10 bg-white p-8 md:p-10">
        <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center bg-img-green text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-6 text-3xl font-semibold tracking-[-0.02em] outline-none">
          Благодарим! Получихме вашето запитване.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-img-grey-dark">Наш специалист ще се свърже с вас, за да уточни детайлите.</p>
        {offerLabel && <p className="mt-2 text-lg leading-relaxed">Офертата „{offerLabel}“ е отбелязана в запитването ви.</p>}
        <p className="mt-2 font-mono text-sm text-img-grey-dark">Номер на запитването: {status.id}</p>
        <p className="mt-6 leading-relaxed">
          Ако е спешно, обадете се на{" "}
          <a href={company.phone.href} className="font-semibold underline underline-offset-4" data-event="click_to_call" data-location="quote_success">
            {company.phone.display}
          </a>{" "}
          ({company.hours.display.toLowerCase()}).
        </p>
        <Link href="/" className="mt-8 inline-flex border-b border-current pb-1 font-medium hover:text-img-green">
          Към началната страница
        </Link>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f as keyof FieldErrors]);
  const submitting = status.kind === "submitting";

  return (
    <form
      ref={formRef}
      action="/api/quote/"
      method="post"
      noValidate
      onSubmit={onSubmit}
      onFocus={onFirstInteraction}
      onChange={(e) => clearError(((e.target as unknown as HTMLInputElement).name ?? "").replace(/B2[BC]$/, ""))}
      className="quote-form border border-black/10 bg-white p-6 md:p-10"
      aria-describedby="quote-required-note"
    >
      <input type="hidden" name="t" defaultValue="0" />
      <input type="hidden" name="page" defaultValue="" />
      <input type="hidden" name="offer" value={offer ?? ""} readOnly />
      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="qf-website">Уебсайт</label>
        <input id="qf-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 border-l-2 border-img-red bg-img-red/5 px-5 py-4 outline-none">
          <p className="font-semibold">Моля, проверете {errorList.length === 1 ? "следното поле" : "следните полета"}:</p>
          <ul className="mt-2 list-disc pl-5 text-[15px]">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#qf-${f === "contact" ? "phone" : f}`} className="underline underline-offset-2">
                  {FIELD_LABELS[f]}: {errors[f as keyof FieldErrors]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status.kind === "error" && (
        <div role="alert" className="mb-8 border-l-2 border-img-red bg-img-red/5 px-5 py-4">
          <p className="font-semibold">{status.message}</p>
          <p className="mt-1 text-[15px]">
            Телефон:{" "}
            <a href={company.phone.href} className="font-semibold underline underline-offset-2">
              {company.phone.display}
            </a>{" "}
            · Имейл:{" "}
            <a href={`mailto:${company.email}`} className="font-semibold underline underline-offset-2">
              {company.email}
            </a>
          </p>
        </div>
      )}

      {offerLabel && (
        <div className="mb-8 flex items-start justify-between gap-4 border-l-2 border-img-green bg-img-green-soft px-5 py-4">
          <p className="text-[15px]">
            <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-img-grey-dark">Оферта</span>
            <span className="font-semibold">{offerLabel}</span>
          </p>
          {!fixedOffer && (
            <button type="button" onClick={() => setOffer(null)} className="shrink-0 text-sm underline underline-offset-2 hover:text-img-green">
              Премахни
            </button>
          )}
        </div>
      )}

      <p id="quote-required-note" className="mb-8 text-sm text-img-grey-dark">
        Полетата, отбелязани със <span className="text-img-red">*</span>, са задължителни.
      </p>

      {/* 1. Audience */}
      <fieldset aria-describedby={errors.audience ? "qf-audience-error" : undefined}>
        <legend className="text-[15px] font-medium">
          Запитването е за<span className="text-img-red" aria-hidden="true"> *</span>
          <span className="sr-only"> (задължително)</span>
        </legend>
        <div id="qf-audience" className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { value: "b2c", title: "Дом", text: "Къща или апартамент" },
            { value: "b2b", title: "Бизнес обект", text: "Офис, търговски, производствен обект" },
          ].map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-3 border border-black/25 p-4 transition-colors hover:border-black/50 has-[:checked]:border-img-green has-[:checked]:bg-img-green/5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2"
            >
              <input type="radio" name="audience" value={o.value} className="mt-1 h-4 w-4 accent-[#396039]" required />
              <span>
                <span className="block font-semibold">{o.title}</span>
                <span className="block text-sm text-img-grey-dark">{o.text}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.audience && (
          <p id="qf-audience-error" className="mt-2 text-sm font-medium text-img-red">
            {errors.audience}
          </p>
        )}
      </fieldset>

      {/* 2. Contact */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id="qf-name" label="Име" required error={errors.name}>
          <input id="qf-name" name="name" type="text" autoComplete="name" maxLength={100} className={inputCls} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("qf-name", errors.name)} />
        </Field>
        <Field id="qf-company" label="Компания" required error={errors.company} className="b2b-only">
          <input id="qf-company" name="company" type="text" autoComplete="organization" maxLength={150} className={inputCls} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy("qf-company", errors.company)} />
        </Field>
      </div>
      <p id="qf-contact-hint" className="mt-6 text-sm text-img-grey-dark">
        Телефон или имейл, поне едно от двете<span className="text-img-red" aria-hidden="true"> *</span>
      </p>
      {errors.contact && (
        <p id="qf-contact-error" className="mt-1 text-sm font-medium text-img-red">
          {errors.contact}
        </p>
      )}
      <div className="mt-2 grid gap-6 sm:grid-cols-2">
        <Field id="qf-phone" label="Телефон" error={errors.phone}>
          <input id="qf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="08XX XXX XXX" className={inputCls} aria-invalid={Boolean(errors.phone ?? errors.contact)} aria-describedby={["qf-contact-hint", errors.contact ? "qf-contact-error" : null, errors.phone ? "qf-phone-error" : null].filter(Boolean).join(" ")} />
        </Field>
        <Field id="qf-email" label="Имейл" error={errors.email}>
          <input id="qf-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} className={inputCls} aria-invalid={Boolean(errors.email ?? errors.contact)} aria-describedby={["qf-contact-hint", errors.contact ? "qf-contact-error" : null, errors.email ? "qf-email-error" : null].filter(Boolean).join(" ")} />
        </Field>
      </div>

      {/* 3. Project */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id="qf-service" label="Услуга" required error={errors.service} className="sm:col-span-2">
          <select id="qf-service" name="service" defaultValue="" className={inputCls} aria-invalid={Boolean(errors.service)} aria-describedby={describedBy("qf-service", errors.service)}>
            <option value="" disabled>
              Изберете услуга
            </option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="qf-property-b2c" label="Тип имот" error={errors.propertyType} className="b2c-only">
          <select id="qf-property-b2c" name="propertyTypeB2C" defaultValue="" className={inputCls} aria-invalid={Boolean(errors.propertyType)} aria-describedby={describedBy("qf-property-b2c", errors.propertyType)}>
            <option value="">Изберете (по желание)</option>
            {PROPERTY_OPTIONS_B2C.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="qf-propertyType" label="Тип обект" required error={errors.propertyType} className="b2b-only">
          <select id="qf-propertyType" name="propertyTypeB2B" defaultValue="" className={inputCls} aria-invalid={Boolean(errors.propertyType)} aria-describedby={describedBy("qf-propertyType", errors.propertyType)}>
            <option value="" disabled>
              Изберете тип обект
            </option>
            {PROPERTY_OPTIONS_B2B.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="qf-area" label={<><span className="b2c-only">Приблизителна площ</span><span className="b2b-only">Приблизителен мащаб</span> <span className="font-normal text-img-grey-dark">(по желание)</span></>}>
          <input id="qf-area" name="area" type="text" maxLength={40} placeholder="напр. 120 m²" className={inputCls} />
        </Field>

        <Field id="qf-location" label={<><span className="b2c-only">Населено място</span><span className="b2b-only">Местоположение на обекта</span></>} required error={errors.location} className="sm:col-span-2">
          <input id="qf-location" name="location" type="text" autoComplete="address-level2" maxLength={120} className={inputCls} aria-invalid={Boolean(errors.location)} aria-describedby={describedBy("qf-location", errors.location)} />
        </Field>

        <div className="sm:col-span-2">
          <label htmlFor="qf-message" className="text-[15px] font-medium">
            <span className="b2c-only">Допълнителна информация (по желание)</span>
            <span className="b2b-only">
              Описание на проекта<span className="text-img-red" aria-hidden="true"> *</span>
              <span className="sr-only"> (задължително)</span>
            </span>
          </label>
          <p id="qf-message-hint" className="mt-1 text-sm text-img-grey-dark">
            <span className="b2c-only">Например етап на строителството, сегашна система или въпроси.</span>
            <span className="b2b-only">Вид сграда, обхват, етап на проекта, срокове. Документация можете да изпратите на {company.email}.</span>
          </p>
          <textarea id="qf-message" name="message" rows={5} maxLength={3000} className={inputCls} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("qf-message", errors.message, true)} />
          {errors.message && (
            <p id="qf-message-error" className="mt-2 text-sm font-medium text-img-red">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* 4. Free site visit / heating calculation (standing benefit) */}
      <label className="mt-8 flex cursor-pointer items-start gap-3 border border-img-green/40 bg-img-green-soft p-4 transition-colors hover:border-img-green has-[:checked]:border-img-green has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2">
        <input type="checkbox" name="freeVisit" defaultChecked={freeVisitDefault} className="mt-1 h-4 w-4 shrink-0 accent-[#396039]" />
        <span>
          <span className="block font-semibold">Искам безплатен оглед или изчисление на отоплението</span>
          <span className="block text-sm text-img-grey-dark">За обекти в София и населените места в радиус от 30 km.</span>
        </span>
      </label>

      {/* 5. Privacy */}
      <div className="mt-8 border-t border-black/10 pt-6">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed">
          <input type="checkbox" name="marketingConsent" className="mt-1 h-4 w-4 shrink-0 accent-[#396039]" />
          <span>Съгласен/на съм да получавам информация за услуги и предложения на IMG Engineering по имейл. (по желание)</span>
        </label>
        <p className="mt-4 text-sm leading-relaxed text-img-grey-dark">
          Използваме данните ви само за да отговорим на запитването и да подготвим оферта. Повече информация в{" "}
          <Link href="/poveritelnost/" className="underline underline-offset-2 hover:text-img-green">
            Политиката за поверителност
          </Link>
          .
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-img-green px-8 text-base font-medium text-white transition-colors hover:bg-img-green-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {submitting ? (
          <>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 animate-spin motion-reduce:animate-none" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
            Изпращане…
          </>
        ) : (
          submitLabel
        )}
      </button>
      <p aria-live="polite" className="sr-only">
        {submitting ? "Изпращане на запитването" : ""}
      </p>
    </form>
  );
}
