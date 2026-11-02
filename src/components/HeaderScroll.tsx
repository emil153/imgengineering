"use client";

import { useEffect } from "react";

/** Sets data-scrolled on the sticky header so CSS can add a shadow. */
export function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const onScroll = () => header.setAttribute("data-scrolled", String(window.scrollY > 8));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
