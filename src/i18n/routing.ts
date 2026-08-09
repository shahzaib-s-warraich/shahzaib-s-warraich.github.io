import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': { en: '/about', fr: '/a-propos' },
    '/research': { en: '/research', fr: '/recherche' },
    '/experience': { en: '/experience', fr: '/experience' },
    '/projects': { en: '/projects', fr: '/projets' },
    '/skills': { en: '/skills', fr: '/competences' },
    '/leadership': { en: '/leadership', fr: '/leadership' },
    '/awards': { en: '/awards', fr: '/distinctions' },
    '/contact': { en: '/contact', fr: '/contact' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
