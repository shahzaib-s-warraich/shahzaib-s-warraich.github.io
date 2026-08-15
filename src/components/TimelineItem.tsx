'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

function initialsFor(name: string): string {
  const words = name.replace(/\(.*?\)/g, '').trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function renderRich(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer"
           className="text-accent hover:underline underline-offset-2">
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

interface TimelineItemProps {
  logo?: string;
  /** Small venue-credibility badge (e.g. a publication venue logo) rendered next to the institution line. */
  venueLogo?: string;
  title: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
  courses?: string[];
  tech?: string[];
  type?: 'master' | 'bachelor' | 'exchange' | 'work' | 'paper' | 'academia';
  index: number;
  url?: string;
}

export default function TimelineItem({
  logo,
  venueLogo,
  title,
  institution,
  period,
  location,
  description,
  highlights,
  courses,
  tech,
  type,
  index,
  url,
}: TimelineItemProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [venueLogoFailed, setVenueLogoFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // No badge for 'work'/'academia' — industry vs. academic positions aren't
  // tagged separately anymore. Degree/paper-type badges are still useful.
  const BadgeColor: Record<string, string> = {
    exchange: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    master: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    bachelor: 'bg-accent-glow text-accent border-accent/20',
    paper: 'bg-accent-glow text-accent border-accent/20',
  };

  const badgeLabel: Record<string, string> = {
    exchange: 'Erasmus+',
    master: "Master's",
    bachelor: "Bachelor's",
    paper: 'Paper',
  };

  const linkProps = url
    ? { href: url, target: '_blank' as const, rel: 'noopener noreferrer' }
    : null;

  const logoBadge = (
    <div className="w-10 h-10 rounded-md bg-accent-glow border border-accent/25 flex items-center justify-center
                     text-accent font-mono text-xs font-bold group-hover:scale-110 transition-transform duration-300">
      {initialsFor(institution)}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      {/* Timeline dot */}
      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-primary shadow-accent" />

      {/* Card — hover lifts and scales */}
      <motion.div
        whileHover={{ y: -4, scale: 1.012 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass rounded-xl p-6 border border-border hover:border-accent/35
                   transition-colors duration-300 group
                   hover:bg-white/[0.03]
                   hover:shadow-[0_12px_40px_rgba(47,102,144,0.20)]"
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">

          {/* Logo — clickable if url exists; falls back to an initials badge on 404 */}
          {logo && (
            linkProps ? (
              <a {...linkProps} className="flex-shrink-0 w-12 h-12 rounded-lg bg-bg-secondary border border-border
                                          flex items-center justify-center overflow-hidden p-0.5
                                          hover:border-accent/40 transition-colors duration-200 cursor-pointer">
                {logoFailed ? logoBadge : (
                  <img
                    src={logo}
                    alt={institution}
                    onError={() => setLogoFailed(true)}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </a>
            ) : (
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-bg-secondary border border-border flex items-center justify-center overflow-hidden p-0.5">
                {logoFailed ? logoBadge : (
                  <img
                    src={logo}
                    alt={institution}
                    onError={() => setLogoFailed(true)}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
            )
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              {/* Title (role / degree) — clickable if url exists */}
              {linkProps ? (
                <a
                  {...linkProps}
                  className="text-base font-semibold text-text-primary leading-snug
                             hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  {title}
                </a>
              ) : (
                <h3 className="text-base font-semibold text-text-primary leading-snug">{title}</h3>
              )}

              {type && badgeLabel[type] && (
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${BadgeColor[type]}`}>
                  {badgeLabel[type]}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-text-secondary">
              {/* Institution — always a link when url exists; omitted entirely when blank */}
              {institution && (
                linkProps ? (
                  <a {...linkProps} className="font-medium text-text-primary hover:text-accent transition-colors">
                    {institution}
                  </a>
                ) : (
                  <span className="font-medium text-text-primary">{institution}</span>
                )
              )}
              {venueLogo && !venueLogoFailed && (
                <img
                  src={venueLogo}
                  alt=""
                  onError={() => setVenueLogoFailed(true)}
                  className="h-4 w-auto max-w-[3.25rem] object-contain opacity-90"
                />
              )}
              <span>{location}</span>
              <span className="font-mono text-xs text-text-muted">{period}</span>
            </div>
          </div>
        </div>

        {description && (
          <p className="text-sm text-text-secondary leading-relaxed mb-4">{renderRich(description)}</p>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="space-y-1.5 mb-1.5">
            {(expanded ? highlights : highlights.slice(0, 1)).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-accent" />
                <span>{renderRich(h)}</span>
              </li>
            ))}
          </ul>
        )}

        {highlights && highlights.length > 1 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-medium text-accent hover:underline underline-offset-2 mb-4 inline-block"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {courses && courses.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">Key Courses</p>
            <div className="flex flex-wrap gap-1.5">
              {courses.map((c) => (
                <span key={c} className="tech-tag">{c}</span>
              ))}
            </div>
          </div>
        )}

        {tech && tech.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
