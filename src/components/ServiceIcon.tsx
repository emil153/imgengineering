import type { ReactNode } from "react";
import type { ServiceIconName } from "@/content/site";

/** Custom line icons (24px grid, 1.5 stroke). Decorative: always aria-hidden. */
const paths: Record<ServiceIconName, ReactNode> = {
  heating: (
    <>
      <path d="M5 6v13M9.5 6v13M14 6v13M18.5 6v13" />
      <path d="M3 9h18M3 16h18" />
      <path d="M5 19v2M18.5 19v2" />
    </>
  ),
  ventilation: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 10.8c0-3 1-5.3 3.2-5.3 1.4 0 1.9 1.5.8 2.7L13 10.8M13.2 12c3 0 5.3 1 5.3 3.2 0 1.4-1.5 1.9-2.7.8L13.2 13M12 13.2c0 3-1 5.3-3.2 5.3-1.4 0-1.9-1.5-.8-2.7L11 13.2M10.8 12c-3 0-5.3-1-5.3-3.2 0-1.4 1.5-1.9 2.7-.8L10.8 11" />
    </>
  ),
  cooling: (
    <>
      <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
      <path d="M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5" />
    </>
  ),
  heatpump: (
    <>
      <rect x="2.5" y="5" width="19" height="14" />
      <circle cx="9" cy="12" r="4.5" />
      <path d="M9 7.5v9M4.5 12h9" />
      <path d="M16.5 9h2.5M16.5 12h2.5M16.5 15h2.5" />
    </>
  ),
  underfloor: (
    <>
      <path d="M3 4h15a2 2 0 0 1 0 4H6a2 2 0 0 0 0 4h12a2 2 0 0 1 0 4H6a2 2 0 0 0 0 4h15" />
    </>
  ),
  design: (
    <>
      <path d="M3 21 12 3l9 18" />
      <path d="M6.5 14h11" />
      <circle cx="12" cy="3.5" r="1" />
      <path d="M3 21h4M17 21h4" />
    </>
  ),
  gas: (
    <>
      <path d="M12 21.5c-4 0-6.5-2.7-6.5-6.3 0-3.6 2.8-5.6 3.8-9.7 2.5 1.5 3.4 3.6 3.4 5.4 1-.6 1.6-1.7 1.7-3 2.6 2 4.1 4.6 4.1 7.3 0 3.6-2.5 6.3-6.5 6.3Z" />
      <path d="M12 21.5c-1.6 0-2.6-1-2.6-2.5 0-1.6 1.4-2.4 2.6-4 1.2 1.6 2.6 2.4 2.6 4 0 1.5-1 2.5-2.6 2.5Z" />
    </>
  ),
  service: (
    <>
      <path d="M14.5 3.5a5 5 0 0 0-5.6 6.9L3 16.3 7.7 21l5.9-5.9a5 5 0 0 0 6.9-5.6l-3 3-3.4-.6-.6-3.4 3-3Z" strokeLinejoin="round" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className ?? "h-8 w-8"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {paths[name]}
    </svg>
  );
}
