"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/content/site";

type Props = {
  items: NavItem[];
  quote: NavItem;
  phone: { display: string; href: string };
};

/**
 * Accessible mobile navigation: disclosure button, Escape to close,
 * focus moves into the panel and is trapped while open, scroll locked,
 * auto-closes when the viewport reaches the desktop breakpoint.
 */
export function MobileMenu({ items, quote, phone }: Props) {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !buttonRef.current) return;
      const focusables = [
        buttonRef.current,
        ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center border border-black/15 transition-colors hover:border-black lg:hidden"
      >
        <span className="sr-only">{open ? "Затворете менюто" : "Отворете менюто"}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
        </svg>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/10 bg-white lg:hidden"
      >
        <nav aria-label="Основна навигация (мобилна)" className="container-x py-6">
          <ul className="divide-y divide-black/10 border-b border-black/10">
            {items.map((item, i) => {
              const active = item.href === currentPath;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="group/link flex items-baseline gap-4 py-4 text-2xl font-medium tracking-[-0.01em]"
                  >
                    <span className="w-6 font-mono text-xs text-img-grey-dark">{String(i + 1).padStart(2, "0")}</span>
                    <span className="group-aria-[current=page]/link:border-b-2 group-aria-[current=page]/link:border-img-green">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href={quote.href}
              onClick={() => setOpen(false)}
              data-event="quote_cta_click"
              data-location="mobile_menu"
              className="inline-flex min-h-12 items-center justify-center bg-img-green px-6 font-medium text-white"
            >
              {quote.label}
            </Link>
            <a
              href={phone.href}
              data-event="click_to_call"
              data-location="mobile_menu"
              className="inline-flex min-h-12 items-center justify-center border border-img-black px-6 font-medium"
            >
              Обадете се: {phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
