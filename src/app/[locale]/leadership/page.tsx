'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import OrgIcon from '@/components/OrgIcon';

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

interface LeadershipItem {
  id: string;
  type: 'leadership' | 'teaching';
  title: string;
  org: string;
  location: string;
  period: string;
  highlights: string[];
  logo?: string;
}

export default function LeadershipPage() {
  const t = useTranslations('leadership');
  const items = t.raw('items') as LeadershipItem[];

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
                       hover:shadow-[0_12px_40px_rgba(47,102,144,0.20)] group flex gap-5"
          >
            <OrgIcon item={item} />
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
