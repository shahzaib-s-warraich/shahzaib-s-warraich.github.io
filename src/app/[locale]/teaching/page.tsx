'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

function renderRich(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-text-primary font-semibold">{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">{link[1]}</a>;
    }
    return part;
  });
}

interface TeachingItem {
  id: string;
  type: 'teaching';
  title: string;
  org: string;
  location: string;
  period: string;
  highlights: string[];
}

export default function TeachingPage() {
  const t = useTranslations('teaching');
  const items = t.raw('items') as TeachingItem[];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -5, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            className="glass rounded-xl p-6 border border-border hover:border-accent/35
                       transition-colors duration-300
                       hover:bg-white/[0.03]
                       hover:shadow-[0_12px_40px_rgba(212,162,78,0.20)] group flex gap-5"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-purple-500/10 border-purple-500/20 text-purple-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors duration-200">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-text-muted flex-shrink-0">{item.period}</span>
              </div>
              <p className="text-sm font-medium text-text-secondary mb-2">{item.org} · {item.location}</p>
              {item.highlights && item.highlights.length > 0 && (
                <ul className="space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-accent" />
                      <span>{renderRich(h)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
