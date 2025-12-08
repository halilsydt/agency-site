'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { type Locale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/lib/types';

/** Storage key for persisting locale preference in localStorage */
const STORAGE_KEY = 'scalenty-locale';

/**
 * Language context value providing current locale state and controls.
 */
interface LanguageContextValue {
  /** Current locale setting */
  locale: Locale;
  /** Update the locale setting */
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

/**
 * Props for the LanguageProvider component.
 */
interface LanguageProviderProps {
  /** Child components to wrap with language context */
  children: ReactNode;
}

/**
 * Detects the browser's preferred locale and maps it to a supported locale.
 * Falls back to default locale if browser locale is not supported.
 *
 * @returns The detected or default locale
 */
function getBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('tr')) return 'tr';
  return DEFAULT_LOCALE;
}

/**
 * Validates if a string is a supported locale.
 *
 * @param value - The value to validate
 * @returns True if the value is a supported locale
 */
function isValidLocale(value: string | null): value is Locale {
  return value !== null && SUPPORTED_LOCALES.includes(value as Locale);
}

/**
 * Provides language context to the application.
 * Manages locale state, localStorage persistence, and browser locale detection.
 *
 * @param props - Component props
 * @param props.children - Child components
 *
 * @example
 * ```tsx
 * <LanguageProvider>
 *   <App />
 * </LanguageProvider>
 * ```
 */
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // Apply locale to document
  const applyLocale = useCallback((newLocale: Locale) => {
    document.documentElement.lang = newLocale;
  }, []);

  // Initialize locale from localStorage or browser detection on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let initialLocale: Locale;

    if (isValidLocale(stored)) {
      initialLocale = stored;
    } else {
      // First visit - detect browser locale
      initialLocale = getBrowserLocale();
      localStorage.setItem(STORAGE_KEY, initialLocale);
    }

    setLocaleState(initialLocale);
    applyLocale(initialLocale);
    setMounted(true);
  }, [applyLocale]);

  // Update locale and persist
  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);
      localStorage.setItem(STORAGE_KEY, newLocale);
      applyLocale(newLocale);
    },
    [applyLocale]
  );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context.
 * Must be used within a LanguageProvider.
 *
 * @returns Language context value with current locale and setLocale function
 * @throws Error if used outside of LanguageProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { locale, setLocale } = useLanguage();
 *
 *   return (
 *     <button onClick={() => setLocale('tr')}>
 *       Current locale: {locale}
 *     </button>
 *   );
 * }
 * ```
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
