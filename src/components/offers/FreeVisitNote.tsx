import Link from "next/link";
import { freeVisit } from "@/content/offers";
import { cx } from "../ui";

/** One-line reminder of the free site visit / heating calculation, used under hero CTAs. */
export function FreeVisitNote({ className }: { className?: string }) {
  return (
    <Link
      href={freeVisit.href}
      data-event="free_visit_click"
      className={cx("group inline-flex items-center gap-2.5 text-[15px] font-medium text-img-black", className)}
    >
      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center bg-img-green text-white transition-transform group-hover:scale-110">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6">
          <path d="M4 10.5l4 4 8-9" />
        </svg>
      </span>
      <span className="underline decoration-img-green/40 decoration-2 underline-offset-4 transition-colors group-hover:text-img-green group-hover:decoration-img-green">
        {freeVisit.short}
      </span>
    </Link>
  );
}
