'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

interface BlogItem {
  id: string;
  type: 'linkedin' | 'press';
  title: string;
  description: string;
  cta: string;
  url: string;
  status: 'live' | 'coming-soon';
}

const ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  press: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const items = t.raw('items') as BlogItem[];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item, index) => {
          const isComingSoon = item.status === 'coming-soon';
          const content = (
            <>
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-300 ${
                isComingSoon
                  ? 'bg-bg-secondary border-border text-text-muted'
                  : 'bg-accent/10 border-accent/20 text-accent group-hover:scale-110'
              }`}>
                {ICONS[item.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 className={`text-base font-semibold leading-snug transition-colors duration-200 ${
                    isComingSoon ? 'text-text-secondary' : 'text-text-primary group-hover:text-accent'
                  }`}>
                    {item.title}
                  </h3>
                  {isComingSoon && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-border bg-bg-secondary text-text-muted flex-shrink-0">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{item.description}</p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  isComingSoon ? 'text-text-muted' : 'text-accent'
                }`}>
                  {item.cta}
                  {!isComingSoon && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  )}
                </span>
              </div>
            </>
          );

          const baseClass = 'group glass rounded-xl p-6 border transition-colors duration-300 flex gap-5';

          if (isComingSoon) {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: 'easeOut' }}
                className={`${baseClass} border-dashed border-border/70 opacity-80`}
              >
                {content}
              </motion.div>
            );
          }

          return (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -5, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
              className={`${baseClass} border-border hover:border-accent/35 hover:bg-white/[0.03] hover:shadow-[0_12px_40px_rgba(47,102,144,0.20)]`}
            >
              {content}
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
