import { getRequestConfig } from 'next-intl/server';
import messages from '@/lib/messages';

// Single static locale — next-intl's SSR/prerender path still needs this
// config module resolvable (wired up via next-intl/plugin in next.config.ts)
// even though there's no more per-request locale detection or routing.
//
// next-intl's AbstractIntlMessages type disallows array leaves (e.g.
// `roles: string[]`), but arrays are used throughout this app's messages
// and work fine at runtime via t.raw() — cast rather than fight that
// mismatch.
export default getRequestConfig(async () => ({
  locale: 'en',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: messages as any,
}));
