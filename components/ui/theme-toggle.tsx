'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';

/**
 * Theme toggle button component.
 * Switches between light and dark modes with animated icon transition.
 *
 * @example
 * ```tsx
 * // In header or navigation
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative"
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${
          isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
