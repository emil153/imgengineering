"use client";

import { useState } from "react";
import { AREA_RADIUS_KM, areaTowns } from "@/content/area";
import { company } from "@/content/site";

const SIZE = 420;
const C = SIZE / 2;
const PX_PER_KM = 180 / AREA_RADIUS_KM;

/** Equirectangular projection around central Sofia, in km → px. */
const project = (lat: number, lng: number) => {
  const x = (lng - company.geo.lng) * Math.cos((company.geo.lat * Math.PI) / 180) * 111.32;
  const y = (lat - company.geo.lat) * 110.57;
  return { x: C + x * PX_PER_KM, y: C - y * PX_PER_KM, km: Math.hypot(x, y) };
};

const towns = areaTowns.map((t) => ({ ...t, ...project(t.lat, t.lng) })).sort((a, b) => a.name.localeCompare(b.name, "bg"));
/** Labels always shown for outer towns; inner ones appear on hover to avoid clutter. */
const ALWAYS = new Set(["Своге", "Сливница", "Перник", "Елин Пелин", "Банкя", "Железница", "Нови Искър", "Петърч", "Лозен"]);

export function AreaMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="order-2 lg:order-1 lg:col-span-5">
        <ul className="flex flex-wrap gap-2" aria-label="Населени места в обслужвания район">
          <li>
            <span className="inline-flex items-center gap-2 bg-img-green px-3 py-1.5 text-[15px] font-semibold text-white">София</span>
          </li>
          {towns.map((t) => (
            <li key={t.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(t.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(t.name)}
                onBlur={() => setActive(null)}
                aria-label={`${t.name}, около ${Math.round(t.km)} km от центъра на София`}
                className={
                  "inline-flex items-center gap-2 border px-3 py-1.5 text-[15px] transition-colors " +
                  (active === t.name ? "border-img-black bg-img-black text-white" : "border-black/15 bg-white hover:border-img-black")
                }
              >
                {t.name}
                <span className={"font-mono text-[11px] " + (active === t.name ? "text-white/70" : "text-img-grey-dark")}>{Math.round(t.km)} km</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] leading-relaxed text-img-grey-dark">
          Разстоянията са по права линия от центъра на София. За обекти извън района се свържете с нас, за да обсъдим възможностите.
        </p>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-7">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto h-auto w-full max-w-[520px]"
          role="img"
          aria-label={`Схема на обслужвания район: София и населените места в радиус от ${AREA_RADIUS_KM} km.`}
        >
          <defs>
            <radialGradient id="area-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-img-blue)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-img-blue)" stopOpacity="0.08" />
            </radialGradient>
          </defs>
          <circle cx={C} cy={C} r={AREA_RADIUS_KM * PX_PER_KM} fill="url(#area-fill)" stroke="var(--color-img-blue)" strokeWidth="2" />
          {[10, 20].map((km) => (
            <circle key={km} cx={C} cy={C} r={km * PX_PER_KM} fill="none" stroke="black" strokeOpacity="0.18" strokeDasharray="4 5" />
          ))}
          {[10, 20, 30].map((km) => (
            <text key={km} x={C + 4} y={C - km * PX_PER_KM + 13} className="fill-img-grey-dark font-mono" fontSize="10">
              {km} km
            </text>
          ))}
          <path d={`M${C} 14V${SIZE - 14}M14 ${C}H${SIZE - 14}`} stroke="black" strokeOpacity="0.08" />

          {towns.map((t) => {
            const on = active === t.name;
            const show = on || ALWAYS.has(t.name);
            const left = t.x < C;
            return (
              <g key={t.name} onMouseEnter={() => setActive(t.name)} onMouseLeave={() => setActive(null)}>
                <circle cx={t.x} cy={t.y} r={on ? 7 : 4.5} fill={on ? "var(--color-img-red)" : "black"} style={{ transition: "r .2s, fill .2s" }} />
                {show && (
                  <text
                    x={left ? t.x - 9 : t.x + 9}
                    y={t.y + 4}
                    textAnchor={left ? "end" : "start"}
                    fontSize={on ? 14 : 12}
                    fontWeight={on ? 600 : 400}
                    className="fill-img-black"
                    style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 4 }}
                  >
                    {t.name}
                  </text>
                )}
              </g>
            );
          })}
          <circle cx={C} cy={C} r="11" fill="var(--color-img-green)" />
          <circle cx={C} cy={C} r="4" fill="white" />
          <text x={C + 16} y={C + 5} fontSize="16" fontWeight="600" className="fill-img-black" style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 4 }}>
            София
          </text>
        </svg>
        <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-img-grey-dark">Схема · разстояния по права линия</p>
      </div>
    </div>
  );
}
