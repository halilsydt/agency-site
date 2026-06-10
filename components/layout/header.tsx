"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getTranslations } from "@/lib/translations";
import { useLanguage } from "@/components/providers/language-provider";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { LogoMark } from "@/components/layout/logo-mark";

/**
 * Represents a navigation item with optional children for dropdowns.
 * Retained for the shared {@link MobileNav} contract; the Atlas desktop nav
 * uses a flat link row, so `children` is unused there.
 */
export interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** URL path for the navigation item */
  href: string;
  /** Optional child items for dropdown menus */
  children?: NavItem[];
}

/**
 * Atlas sticky header: warm-paper translucent nav with the brand mark + wordmark,
 * a flat underline-link row, the `.lang` globe pill, a "Book a Call" CTA, and a
 * mobile drawer below the 860px breakpoint. Adds a `scrolled` border + shadow
 * once the page scrolls past 8px. Ports `docs/design system/atlas/atlas.js:39–51`.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <Header />
 * ```
 */
export function Header(): React.ReactElement {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  // Atlas `scrolled` state — border + soft shadow once scrolled past 8px.
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(document.documentElement.scrollTop > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Localized navigation items (Atlas flat set). Amazon/Etsy are top-level,
   * and Home + FAQ are added. Rebuilt when locale changes to update labels.
   */
  const navItems: NavItem[] = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.amazon, href: "/services/amazon" },
    { label: t.nav.etsy, href: "/services/etsy" },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.faq, href: "/faq" },
  ];

  /**
   * Checks if a navigation item is currently active.
   * Home (`/`) matches only exactly; other items match the path or its subtree.
   */
  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-[14px] transition-[border-color,box-shadow] duration-200",
        "bg-[rgba(247,246,241,0.82)]",
        scrolled ? "border-line shadow-[0_8px_26px_-20px_rgba(21,32,27,0.4)]" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-[78px] max-w-wrap items-center gap-11 px-9">
        {/* Logo */}
        <Link href="/" aria-label="Scalenty" className="flex items-center gap-2.5 no-underline">
          <LogoMark className="h-6 w-auto" />
          <span className="font-disp text-[33px] font-bold leading-none tracking-[-0.025em] text-ink">
            Scalenty
          </span>
        </Link>

        {/* Desktop Navigation (Atlas underline links, ≥861px) */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-9 text-[15px] font-medium min-[861px]:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative whitespace-nowrap py-1 no-underline transition-colors",
                isActive(item.href) ? "text-ink" : "text-ink-2 hover:text-ink"
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-0.5 left-0 h-0.5 rounded-sm bg-green transition-[width] duration-200",
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Right cluster: language pill + CTA (≥861px) + mobile drawer (≤860px) */}
        <div className="ml-auto flex items-center gap-3.5">
          <div className="hidden items-center min-[861px]:flex">
            <LanguageToggle />
          </div>
          <Link
            href="/contact"
            className="hidden items-center justify-center rounded-[10px] bg-green px-5 py-2.5 font-disp text-[15px] font-semibold text-white no-underline transition-colors hover:bg-green-d min-[861px]:inline-flex"
          >
            {t.nav.bookCall}
          </Link>

          {/* Mobile Navigation (hamburger + drawer, ≤860px) */}
          <MobileNav items={navItems} isActive={isActive} />
        </div>
      </div>
    </header>
  );
}
