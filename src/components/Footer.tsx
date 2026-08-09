import { useTranslations } from 'next-intl';

export default function Footer({ cvHref }: { cvHref?: string }) {
  const t = useTranslations('footer');
  const tContact = useTranslations('contact');
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-bg-secondary/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <p>
          © {year} Shahzaib Saqib Warraich. {t('rights')}.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/shahzaib-s-warraich"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shahzaib-saqib-warraich/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/Shahzaibs98"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            aria-label="X / Twitter"
          >
            X
          </a>
          <a
            href={tContact('social.scholarUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            aria-label="Google Scholar"
          >
            Scholar
          </a>
          {cvHref && (
            <a
              href={cvHref}
              download
              className="hover:text-accent transition-colors duration-200"
              aria-label="Download CV"
            >
              CV
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
