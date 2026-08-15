'use client';
import { useTranslations } from 'next-intl';

interface LanguageItem {
  id: string;
  name: string;
  level: string;
  note?: string;
}

/** Standalone languages block — kept separate from the Skills grid (spoken
 * languages aren't a technical skill), reused by both the Skills page and
 * the home page's Skills section. */
export default function LanguagesList() {
  const t = useTranslations('languages');
  const items = t.raw('items') as LanguageItem[];
  const footnotes = items.filter((item) => item.note);

  return (
    <section id="languages" className="mt-14 pt-10 border-t border-border">
      <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-1">
        {t('title')}
      </h3>
      <p className="text-sm text-text-muted mb-5">{t('subtitle')}</p>

      <div className="flex flex-wrap gap-3">
        {items.map((lang) => (
          <div
            key={lang.id}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bg-card border border-border"
          >
            <span className="text-sm font-medium text-text-primary">{lang.name}</span>
            <span className="text-text-muted">·</span>
            <span className="text-xs font-mono text-accent">{lang.level}</span>
            {lang.note && <span className="text-xs text-text-muted align-super">*</span>}
          </div>
        ))}
      </div>

      {footnotes.length > 0 && (
        <p className="mt-3 text-xs text-text-muted">
          {footnotes.map((f) => `* ${f.note}`).join('  ')}
        </p>
      )}
    </section>
  );
}
