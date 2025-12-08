'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/language-provider';

/**
 * Language toggle button component.
 * Switches between English and Turkish locales.
 *
 * @example
 * ```tsx
 * // In header or navigation
 * <LanguageToggle />
 * ```
 */
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'tr' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      aria-label={locale === 'en' ? "Türkçe'ye geç" : 'Switch to English'}
    >
      {locale.toUpperCase()}
    </Button>
  );
}
