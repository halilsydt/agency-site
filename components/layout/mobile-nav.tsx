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
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
 * Mobile navigation drawer component using Sheet.
 * Displays a hamburger menu button that opens a slide-out navigation panel.
 * Automatically closes when a navigation link is clicked.
 *
 * @param props - Component props
 * @param props.items - Navigation items to display
 * @param props.isActive - Function to determine if a nav item is active
 *
 * @example
 * ```tsx
 * <MobileNav
 *   items={navItems}
 *   isActive={(href) => pathname === href}
 * />
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>{t.mobileNav.navigation}</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation menu
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-6" aria-label="Mobile navigation">
          <ul className="flex flex-col space-y-1">
            {items.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <span className="block px-3 py-2 text-sm font-medium text-muted-foreground">
                      {item.label}
                    </span>
                    <ul className="ml-4 flex flex-col space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                              isActive(child.href)
                                ? "bg-accent text-accent-foreground font-medium"
                                : "text-foreground"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive(item.href)
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="mt-6 border-t pt-6">
          <div className="flex items-center justify-between px-3">
            <span className="text-sm text-muted-foreground">{t.mobileNav.theme}</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Language Toggle */}
        <div className="mt-4">
          <div className="flex items-center justify-between px-3">
            <span className="text-sm text-muted-foreground">{t.mobileNav.language}</span>
            <LanguageToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
