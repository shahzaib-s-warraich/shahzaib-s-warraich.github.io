'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

// Primary links stay directly on the desktop bar; secondary/newer sections
// nest under a "More" dropdown so the bar doesn't overflow at 12 sections.
const PRIMARY_LINKS = [
  { key: 'home', href: '/' },
  { key: 'experience', href: '/experience' },
  { key: 'research', href: '/research' },
  { key: 'projects', href: '/projects' },
  { key: 'contact', href: '/contact' },
] as const;

const MORE_LINKS = [
  { key: 'researchExperience', href: '/research-experience' },
  { key: 'about', href: '/about' },
  { key: 'skills', href: '/skills' },
  { key: 'leadership', href: '/leadership' },
  { key: 'teaching', href: '/teaching' },
  { key: 'blog', href: '/blog' },
  { key: 'books', href: '/books' },
  { key: 'awards', href: '/awards' },
] as const;

// Flat order used for the mobile drawer (matches one-page scroll order).
const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'experience', href: '/experience' },
  { key: 'researchExperience', href: '/research-experience' },
  { key: 'research', href: '/research' },
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
  { key: 'skills', href: '/skills' },
  { key: 'leadership', href: '/leadership' },
  { key: 'teaching', href: '/teaching' },
  { key: 'blog', href: '/blog' },
  { key: 'books', href: '/books' },
  { key: 'awards', href: '/awards' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Navbar({ cvHref }: { cvHref: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu / More dropdown on route change
  useEffect(() => { setMenuOpen(false); setMoreOpen(false); }, [pathname]);


  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isMoreActive = MORE_LINKS.some(({ href }) => isActive(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border shadow-[0_1px_0_rgba(47,102,144,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-mono text-xl font-bold text-accent hover:text-glow transition-all duration-200"
        >
          SSW<span className="text-text-secondary">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {PRIMARY_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive(href)
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-accent'
              }`}
            >
              {t(key as keyof typeof t)}
              {isActive(href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-px bg-accent"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* "More" dropdown — nests secondary/newer sections so the bar never overflows */}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isMoreActive || moreOpen
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-accent'
              }`}
            >
              {t('more')}
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              {isMoreActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-px bg-accent"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-56 py-1.5 rounded-lg bg-bg-primary/95 backdrop-blur-md border border-border shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                >
                  {MORE_LINKS.map(({ key, href }) => (
                    <a
                      key={key}
                      href={href}
                      className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive(href)
                          ? 'text-accent bg-accent-glow'
                          : 'text-text-secondary hover:text-accent hover:bg-bg-card'
                      }`}
                    >
                      {t(key as keyof typeof t)}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right side: theme toggle + CV download (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={cvHref}
            download
            className="px-4 py-2 text-sm font-medium bg-accent text-bg-primary rounded-lg hover:bg-accent-muted transition-colors duration-200"
          >
            {t('downloadCV')}
          </a>
        </div>

        {/* Mobile: theme toggle + menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-5 bg-text-primary transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-text-primary transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-text-primary transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-secondary border-b border-border overflow-hidden"
          >
            <nav className="px-4 sm:px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-accent bg-accent-glow'
                      : 'text-text-secondary hover:text-accent hover:bg-bg-card'
                  }`}
                >
                  {t(key as keyof typeof t)}
                </a>
              ))}

              <a
                href={cvHref}
                download
                className="mt-3 px-3 py-2.5 text-sm font-medium bg-accent text-bg-primary rounded-md text-center"
              >
                {t('downloadCV')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
