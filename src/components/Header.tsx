import Image from "next/image";
import Link from "next/link";
import logoLockup from "../../public/brand/img-logo-lockup.png";
import { company, mainNav, quoteHref } from "@/content/site";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { PhoneIcon } from "./ui";

/** Slim utility bar with verified contact details (desktop only). */
export function UtilityBar() {
  return (
    <div className="hidden bg-img-black text-white lg:block">
      <div className="container-x flex h-9 items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em]">
        <p className="text-white/70">Отопление · Вентилация · Климатизация · Газификация</p>
        <div className="flex items-center gap-6">
          <span className="text-white/70">{company.hours.short}</span>
          <span className="text-white/70">
            {company.address.street}, {company.address.city}
          </span>
          <a href={company.phone.href} data-event="click_to_call" data-location="utility_bar" className="hover:text-img-yellow">
            {company.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[76px]">
        <Link href="/" aria-label="IMG Engineering, към началната страница" className="shrink-0">
          {/* Logo lockup: cropped from the supplied master artwork, no redraw or recolor. Pending approval. */}
          <Image src={logoLockup} alt="" priority className="h-10 w-auto lg:h-12" sizes="96px" />
        </Link>

        <DesktopNav items={mainNav} />

        <div className="flex items-center gap-2">
          <Link
            href={quoteHref}
            data-event="quote_cta_click"
            data-location="header"
            className="hidden min-h-11 items-center bg-img-green px-5 text-[14px] font-medium text-white transition-colors hover:bg-img-green-hover lg:inline-flex"
          >
            Поискайте оферта
          </Link>
          <a
            href={company.phone.href}
            data-event="click_to_call"
            data-location="header_mobile"
            className="inline-flex h-11 w-11 items-center justify-center border border-black/15 transition-colors hover:border-black lg:hidden"
          >
            <span className="sr-only">Обадете се: {company.phone.display}</span>
            <PhoneIcon />
          </a>
          <MobileMenu
            items={mainNav}
            quote={{ label: "Поискайте оферта", href: quoteHref }}
            phone={company.phone}
          />
        </div>
      </div>
    </header>
  );
}

/** Persistent, non-obstructive conversion bar on small screens (Blueprint: mobile navigation). */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-black/10 bg-white lg:hidden">
      <a
        href={company.phone.href}
        data-event="click_to_call"
        data-location="mobile_bar"
        className="flex min-h-14 items-center justify-center gap-2 text-[15px] font-medium"
      >
        <PhoneIcon className="h-4 w-4" />
        Обадете се
      </a>
      <Link
        href={quoteHref}
        data-event="quote_cta_click"
        data-location="mobile_bar"
        className="flex min-h-14 items-center justify-center bg-img-green text-[15px] font-medium text-white"
      >
        Поискайте оферта
      </Link>
    </div>
  );
}
