'use client';
import { useState } from 'react';

interface OrgIconItem {
  type: 'leadership' | 'teaching';
  org: string;
  logo?: string;
}

/** Leadership/teaching tile icon — shows the org's actual logo (scaled to
 * fill the tile) when provided, falling back to a generic type icon on a
 * missing/broken image. Shared between the home-page leadership section
 * and the standalone /leadership page so they never drift out of sync. */
export default function OrgIcon({ item }: { item: OrgIconItem }) {
  const [logoFailed, setLogoFailed] = useState(false);

  if (item.logo && !logoFailed) {
    return (
      <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-border bg-bg-secondary
                       flex items-center justify-center overflow-hidden p-0.5
                       group-hover:scale-110 transition-transform duration-300">
        <img
          src={item.logo}
          alt={item.org}
          onError={() => setLogoFailed(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
      item.type === 'leadership'
        ? 'bg-accent/10 border-accent/20 text-accent'
        : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
    }`}>
      {item.type === 'leadership' ? (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      )}
    </div>
  );
}
