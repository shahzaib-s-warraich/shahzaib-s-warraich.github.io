'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  url: string;
}

export default function BooksPage() {
  const t = useTranslations('books');
  const items = t.raw('items') as BookItem[];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (index % 4) * 0.07, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            className="group glass rounded-xl overflow-hidden border border-border hover:border-accent/45
                       transition-colors duration-300 flex flex-col
                       hover:shadow-[0_12px_40px_rgba(212,162,78,0.25)] hover:bg-white/[0.02]"
          >
            <div className="relative aspect-[2/3] overflow-hidden bg-bg-secondary">
              <img
                src={item.cover}
                alt={`${item.title} cover`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-xs font-mono text-accent bg-bg-card/80 backdrop-blur-sm border border-accent/20 px-2 py-0.5 rounded-full">
                  view on Amazon ↗
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-text-primary leading-snug mb-1 group-hover:text-accent transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-xs font-medium text-text-secondary mb-2">{item.author}</p>
              <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
