"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { getTranslations } from "@/lib/translations";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavItem } from "@/components/layout/header";
import { LanguageToggle } from "@/components/ui/language-toggle";

/**
 * Props for the MobileNav component.
 */
export interface MobileNavProps {
  /** Navigation items to display in the mobile menu */
  items: NavItem[];
  /** Function to check if a path is currently active */
  isActive: (href: string) => boolean;
}

/**
 * Mobile navigation drawer (Atlas-styled). Shows a hamburger toggle below the
 * Atlas 860px breakpoint that opens a slide-out panel listing the nav links
 * plus a "Book a Call" CTA. Closes automatically on route change.
 *
 * @param props - Component props
 * @param props.items - Navigation items to display
 * @param props.isActive - Function to determine if a nav item is active
 *
 * @example
 * ```tsx
 * <MobileNav items={navItems} isActive={isActive} />
 * ```
 */
export function MobileNav({ items, isActive }: MobileNavProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  // Close sheet on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /** Render a single flat nav link in the drawer. */
  const renderLink = (item: NavItem) => (
    <Link
      href={item.href}
      className={cn(
        "block border-b border-line py-3 font-disp text-base font-medium transition-colors",
        isActive(item.href) ? "text-green-d" : "text-ink hover:text-green-d"
      )}
      onClick={() => setOpen(false)}
      aria-current={isActive(item.href) ? "page" : undefined}
    >
      {item.label}
    </Link>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="min-[861px]:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>{t.mobileNav.navigation}</SheetTitle>
          <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
        </SheetHeader>
        <nav className="mt-6" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    {renderLink(item)}
                    <ul className="ml-4 flex flex-col">
                      {item.children.map((child) => (
                        <li key={child.href}>{renderLink(child)}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  renderLink(item)
                )}
              </li>
            ))}
            {/* Book a Call CTA (Atlas: last mobile link is green, weight 600) */}
            <li>
              <Link
                href="/contact"
                className="block py-3 font-disp text-base font-semibold text-green-d transition-colors hover:text-green"
                onClick={() => setOpen(false)}
              >
                {t.nav.bookCall}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Language Toggle */}
        <div className="mt-6 border-t border-line pt-6">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-soft">{t.mobileNav.language}</span>
            <LanguageToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
