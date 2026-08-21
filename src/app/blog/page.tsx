'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

interface Article {
  id: string;
  title: string;
  publication: string;
  description: string;
  cta: string;
  url: string;
  image: string;
}

// This page lists digital/print media pieces only — the LinkedIn Newsletter
// is a home-page-only card (see HomeClient's Writing & Media section) and
// isn't duplicated here.
export default function BlogPage() {
  const t = useTranslations('blog');
  const articles = t.raw('articles') as Article[];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map((article, index) => (
          <motion.a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -5, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            className="group glass rounded-xl border border-border overflow-hidden transition-colors duration-300
                       hover:border-accent/35 hover:bg-white/[0.03] hover:shadow-[0_12px_40px_rgba(47,102,144,0.20)]
                       flex flex-col p-6"
          >
            <div className="relative aspect-video overflow-hidden rounded-t-xl bg-bg-secondary -m-6 mb-0">
              <img
                src={article.image}
                alt={`${article.title} thumbnail`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="pt-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold leading-snug text-text-primary group-hover:text-accent transition-colors duration-200">
                  {article.title}
                </h3>
                <span className="text-xs font-mono text-text-muted flex-shrink-0">{article.publication}</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{article.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {article.cta}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
