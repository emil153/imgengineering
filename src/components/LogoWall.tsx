import Image from "next/image";
import type { LogoItem } from "@/content/site";
import { PrototypeNote } from "./ui";

/**
 * Logo grid on hairlines. Logos render in greyscale and regain their own colors on hover,
 * so dozens of third-party brand colors don't compete with the IMG palette.
 */
export function LogoWall({ items, label, emptyNote }: { items: LogoItem[]; label: string; emptyNote: string }) {
  if (items.length === 0) {
    return (
      <>
        <div className="grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-4" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="placeholder-hatch h-16" />
          ))}
        </div>
        <PrototypeNote className="mt-4">{emptyNote}</PrototypeNote>
      </>
    );
  }
  return (
    <ul aria-label={label} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
      {items.map((logo) => (
        <li key={logo.name} className="flex h-12 items-center">
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            sizes="160px"
            className="h-auto max-h-10 w-auto max-w-[140px] object-contain opacity-75 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
