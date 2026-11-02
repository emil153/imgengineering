import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={cx("h-4 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="square" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cx("h-5 w-5", className)} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
    </svg>
  );
}

/** Small monospace label used for section indexes and metadata. */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cx("font-mono text-xs font-medium uppercase tracking-[0.14em] text-img-grey-dark", className)}>
      {index && <span className="text-img-black">{index}</span>}
      {index && <span aria-hidden="true" className="mx-2">/</span>}
      {children}
    </p>
  );
}

type ButtonVariant = "primary" | "secondary" | "inverse" | "outline-inverse";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-img-green text-white hover:bg-img-green-hover",
  secondary: "border border-img-black text-img-black hover:bg-img-black hover:text-white",
  inverse: "bg-white text-img-black hover:bg-img-grey-light",
  "outline-inverse": "border border-white/40 text-white hover:border-white hover:bg-white hover:text-img-black",
};

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Link styled as a button. External / tel: links render a plain anchor. */
export function ButtonLink({ href, variant = "primary", children, className, withArrow = false, ...rest }: ButtonLinkProps) {
  const classes = cx(
    "group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[15px] font-medium transition-colors duration-200",
    buttonStyles[variant],
    className,
  );
  const content = (
    <>
      {children}
      {withArrow && <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/** Text link with arrow, used for secondary navigation actions. */
export function ArrowLink({ href, children, className, ...rest }: { href: string; children: ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-2 border-b border-current pb-1 text-[15px] font-medium transition-colors",
        className,
      )}
      {...rest}
    >
      {children}
      <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

/**
 * Stand-in for missing authentic photography. Deliberately looks like a placeholder,
 * so it can never be mistaken for an IMG Engineering project photo.
 */
export function PlaceholderMedia({ label, note = "Очаква се автентична снимка", className }: { label: string; note?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Временно изображение: ${label}. ${note}.`}
      className={cx("placeholder-hatch relative flex items-end overflow-hidden", className)}
    >
      <div className="m-4 bg-white/90 px-3 py-2 font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-img-grey-dark">
        <span className="block text-img-black">{label}</span>
        <span className="block">{note}</span>
      </div>
      <span aria-hidden="true" className="absolute right-4 top-4 h-3 w-3 border-r border-t border-black/40" />
      <span aria-hidden="true" className="absolute left-4 top-4 h-3 w-3 border-l border-t border-black/40" />
    </div>
  );
}

/**
 * Visible marker for prototype-only content that requires client verification.
 * Remove every instance before launch (grep: PrototypeNote).
 */
export function PrototypeNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        "flex items-start gap-3 border-l-2 border-img-yellow bg-img-yellow/10 px-4 py-3 text-sm leading-relaxed text-img-grey-dark",
        className,
      )}
    >
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-img-black">Прототип</span>
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  id,
  children,
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  id?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("grid gap-6 lg:grid-cols-12 lg:gap-12", className)}>
      <div className="lg:col-span-7">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
          {title}
        </h2>
      </div>
      {children && <div className="flex items-end lg:col-span-5 lg:justify-end">{children}</div>}
    </div>
  );
}
