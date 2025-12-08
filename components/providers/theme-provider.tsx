'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

/** Storage key for persisting theme preference in localStorage */
const STORAGE_KEY = 'scalenty-theme';

/** Available theme modes */
export type Theme = 'light' | 'dark' | 'system';

/** Resolved theme after applying system preference */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme context value providing current theme state and controls.
 */
interface ThemeContextValue {
  /** Current theme setting (may be 'system') */
  theme: Theme;
  /** Resolved theme after applying system preference */
  resolvedTheme: ResolvedTheme;
  /** Update the theme setting */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark (ignores system) */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  /** Child components to wrap with theme context */
  children: ReactNode;
  /** Default theme if no preference is stored */
  defaultTheme?: Theme;
}

/**
 * Provides theme context to the application.
 * Manages theme state, localStorage persistence, and system preference detection.
 *
 * @param props - Component props
 * @param props.children - Child components
 * @param props.defaultTheme - Default theme setting (defaults to 'system')
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }, []);

  // Resolve theme based on current setting
  const resolveTheme = useCallback(
    (themeValue: Theme): ResolvedTheme => {
      if (themeValue === 'system') {
        return getSystemTheme();
      }
      return themeValue;
    },
    [getSystemTheme]
  );

  // Apply theme to document
  const applyTheme = useCallback((resolved: ResolvedTheme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
  }, []);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initialTheme = stored || defaultTheme;
    setThemeState(initialTheme);
    const resolved = resolveTheme(initialTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, [defaultTheme, resolveTheme, applyTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        applyTheme(resolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted, getSystemTheme, applyTheme]);

  // Update theme and persist
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
      const resolved = resolveTheme(newTheme);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    },
    [resolveTheme, applyTheme]
  );

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme: Theme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context.
 * Must be used within a ThemeProvider.
 *
 * @returns Theme context value with current theme and controls
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { resolvedTheme, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {resolvedTheme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
