import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import logoFull from "../../public/brand/img-logo-full.png";
import { audiences, company, legalNav, mainNav, services } from "@/content/site";
import { FacebookIcon } from "./ui";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-img-grey-dark">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px]">{children}</ul>
    </div>
  );
}

const linkClass = "transition-colors hover:text-img-green";

export function Footer() {
  const year = new Date().getFullYear();
  const companyLinks = [
    ...mainNav.filter((i) => ["/oferti/", "/proekti/", "/polezno/", "/za-nas/", "/kontakti/"].includes(i.href)),
    { label: "Онлайн магазин", href: "/magazin/" },
  ];

  return (
    <footer className="bg-white">
      <div aria-hidden="true" className="grid h-1.5 grid-cols-4">
        <span className="bg-img-blue" />
        <span className="bg-img-red" />
        <span className="bg-img-yellow" />
        <span className="bg-img-green" />
      </div>
      <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="IMG Engineering, към началната страница" className="inline-block">
            <Image src={logoFull} alt="" className="h-auto w-44" sizes="176px" />
          </Link>
          <p className="mt-6 max-w-sm leading-relaxed text-img-grey-dark">{company.description}</p>
          <a
            href={company.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 border border-black/15 px-4 py-2.5 text-[15px] font-medium transition-colors hover:border-img-blue hover:bg-img-blue-soft"
          >
            <span className="flex h-7 w-7 items-center justify-center bg-img-blue text-img-black">
              <FacebookIcon />
            </span>
            Последвайте ни във Facebook
            <span className="sr-only"> (отваря се в нов прозорец)</span>
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          <Column title="Услуги">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/uslugi/${s.slug}/`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Решения">
            {audiences.map((a) => (
              <li key={a.key}>
                <Link href={a.cta.href} className={linkClass}>
                  {a.eyebrow}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Компания">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Контакти">
            <li>
              <address className="not-italic text-img-grey-dark">
                {company.address.street}
                <br />
                {company.address.city}
              </address>
            </li>
            <li>
              <a href={company.phone.href} data-event="click_to_call" data-location="footer" className={"font-medium " + linkClass}>
                {company.phone.display}
              </a>
            </li>
            {company.email && (
              <li>
                <a href={`mailto:${company.email}`} className={linkClass}>
                  {company.email}
                </a>
              </li>
            )}
            <li className="text-img-grey-dark">{company.hours.display}</li>
          </Column>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-img-grey-dark md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. Всички права запазени.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
