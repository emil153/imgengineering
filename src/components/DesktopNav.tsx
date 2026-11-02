"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/site";

/** Desktop primary navigation with active state derived from the current route. */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav aria-label="Основна навигация" className="hidden lg:block">
      <ul className="flex items-center gap-x-5 text-[14px] xl:gap-x-7 xl:text-[15px]">
        {items
          .filter((item) => item.href !== "/")
          .map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="relative py-2 font-medium text-img-grey-dark transition-colors hover:text-img-green aria-[current=page]:text-img-black aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-px aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-img-green"
              >
                {item.label}
                {item.href === "/oferti/" && <span aria-hidden="true" className="absolute -right-2 top-1 h-1.5 w-1.5 rounded-full bg-img-red" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
