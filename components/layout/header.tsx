"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "@/components/layout/mobile-nav";

/**
 * Represents a navigation item with optional children for dropdowns.
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
 * Main navigation items configuration.
 * Defines the structure of the site navigation including dropdowns.
 */
export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Amazon Services", href: "/services/amazon" },
      { label: "Etsy Services", href: "/services/etsy" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Sticky header component with logo, desktop navigation, and mobile menu.
 * Provides site-wide navigation that remains visible during scrolling.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * import { Header } from "@/components/layout/header";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <Header />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function Header(): React.ReactElement {
  const pathname = usePathname();

  /**
   * Checks if a navigation item is currently active.
   * An item is active if the current pathname matches or starts with the item's href.
   */
  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span className="text-primary">Scalenty</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex" aria-label="Main navigation">
            <NavigationMenuList>
              {navItems.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={cn(
                        isActive(item.href) && "text-primary"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-48 gap-1 p-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                  isActive(child.href) &&
                                    "bg-accent text-accent-foreground"
                                )}
                              >
                                {child.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive(item.href) && "text-primary"
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <MobileNav items={navItems} isActive={isActive} />
        </div>
      </Container>
    </header>
  );
}
