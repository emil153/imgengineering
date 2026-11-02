"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds .is-visible to .reveal elements as they enter the viewport (works in all browsers).
 * Children of [data-stagger] get increasing delays. Re-runs on client navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        (child as HTMLElement).classList.add("reveal");
        (child as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 8) * 80}ms`);
      });
    });
    const items = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Safety net: anything at or above the viewport bottom is revealed, so fast scrolling,
    // anchor jumps or scroll restoration can never leave content hidden.
    let ticking = false;
    const sweep = () => {
      ticking = false;
      const limit = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sweep);
      }
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));
    sweep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeprint", sweep);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeprint", sweep);
    };
  }, [pathname]);
  return null;
}
