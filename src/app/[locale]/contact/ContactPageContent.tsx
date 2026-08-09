'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import ContactForm from '@/components/ContactForm';

/* Shared classes so every tile is consistent */
const TILE = `group glass rounded-2xl border border-accent/10 p-5
              shadow-[0_12px_40px_rgba(47,102,144,0.06)]
              hover:border-accent/35
              hover:shadow-[0_16px_50px_rgba(47,102,144,0.22)]
              hover:bg-accent/[0.08]
              transition-colors`;

const HOVER = { y: -5, scale: 1.018, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } };

export default function ContactPageContent({ cvHref = '/cv/CV.pdf' }: { cvHref?: string }) {
  const t = useTranslations('contact');
  const info = t.raw('info') as {
    email: string; phone: string; phoneHref: string;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* Background World Map */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1000 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 320 C150 200 300 180 420 250 C520 300 620 260 760 220 C820 200 900 240 950 280" fill="none" stroke="rgba(47,102,144,0.18)" strokeWidth="1.5" />
          <path d="M120 260 C160 240 190 230 230 240 C260 245 300 260 340 255 C380 250 415 265 455 270" fill="none" stroke="rgba(47,102,144,0.16)" strokeWidth="1" />
          <path d="M520 210 C560 200 600 205 635 215 C665 225 700 230 740 225 C780 220 820 230 860 245" fill="none" stroke="rgba(47,102,144,0.16)" strokeWidth="1" />
          <path d="M220 110 C260 120 300 135 340 145 C380 155 420 165 460 170" fill="none" stroke="rgba(47,102,144,0.14)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-stretch">

          {/* Left: Contact Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">

            {/* Email — spans full width so the address stays on one line */}
            <motion.div whileHover={HOVER} className={TILE + ' sm:col-span-2'}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">Email</p>
                  <a href={`mailto:${info.email}`} className="block text-[13px] sm:text-sm font-semibold text-text-primary hover:text-accent transition-colors whitespace-nowrap overflow-x-auto">{info.email}</a>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.a href={info.phoneHref} whileHover={HOVER} className={TILE + ' block'}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a11.25 11.25 0 01-6.223-6.224l1.293-.97a1.125 1.125 0 00.417-1.173L8.963 3.102a1.125 1.125 0 00-1.091-.852H6.5A2.25 2.25 0 004.25 4.5v.25" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">Phone</p>
                  <p className="text-sm font-semibold text-text-primary">{info.phone}</p>
                </div>
              </div>
            </motion.a>

            {/* Book a Call — Google Calendar appointment scheduling */}
            <motion.a
              href={t('social.calendarUrl')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={HOVER}
              className={TILE + ' block border-accent/25 bg-accent/[0.06]'}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-13.5-6h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3-3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">Schedule</p>
                  <p className="text-sm font-semibold text-text-primary">{t('social.calendar')}</p>
                </div>
              </div>
            </motion.a>

            {/* Twitter / X */}
            <motion.a
              href="https://x.com/Shahzaibs98"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={HOVER}
              className={TILE + ' block'}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">X / Twitter</p>
                  <p className="text-sm font-semibold text-text-primary">{t('social.twitter')}</p>
                </div>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/shahzaib-saqib-warraich/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={HOVER}
              className={TILE + ' block'}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">LinkedIn</p>
                  <p className="text-sm font-semibold text-text-primary">{t('social.linkedin')}</p>
                </div>
              </div>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/shahzaib-s-warraich"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={HOVER}
              className={TILE + ' block'}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">GitHub</p>
                  <p className="text-sm font-semibold text-text-primary">{t('social.github')}</p>
                </div>
              </div>
            </motion.a>

            {/* Google Scholar */}
            <motion.a
              href={t('social.scholarUrl')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={HOVER}
              className={TILE + ' block'}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">Scholar</p>
                  <p className="text-sm font-semibold text-text-primary">{t('social.scholar')}</p>
                </div>
              </div>
            </motion.a>

            {/* CV Download */}
            <motion.a
              href={cvHref}
              download
              whileHover={HOVER}
              className={TILE + ' block'}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent
                                group-hover:scale-110 group-hover:bg-accent/20
                                transition-all duration-300 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-1">Résumé</p>
                  <p className="text-sm font-semibold text-text-primary">{t('social.cv')}</p>
                </div>
              </div>
            </motion.a>

          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-[2rem] p-7 border border-accent/15 shadow-[0_30px_90px_rgba(47,102,144,0.12)]"
          >
            <div className="mb-5">
              <p className="text-sm uppercase tracking-[0.35em] text-accent font-medium mb-2">Send a message</p>
              <h3 className="text-xl font-semibold text-text-primary">Get in touch</h3>
              <p className="text-sm text-text-secondary mt-2">Send me a message and I'll respond as soon as possible.</p>
            </div>
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
