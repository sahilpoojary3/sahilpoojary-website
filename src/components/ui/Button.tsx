import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-accent px-6 py-3 will-change-transform hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-paper shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_-8px_var(--color-accent)] hover:bg-accent-strong",
  secondary:
    "bg-transparent text-ink border border-line hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-ink-soft hover:text-accent px-3 py-2",
};

export default function Button({
  children,
  href,
  variant = "primary",
  external = false,
  onClick,
  type = "button",
  icon = true,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span>{children}</span>
      {icon && external && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
