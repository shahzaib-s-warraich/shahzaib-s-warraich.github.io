import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/SectionHeader';
import TimelineItem from '@/components/TimelineItem';
import messages from '@/lib/messages';

export const metadata = { title: `${messages.researchExperience.title}, Shahzaib Warraich` };

export default function ResearchExperiencePage() {
  return <ResearchExperienceContent />;
}

function ResearchExperienceContent() {
  const t = useTranslations('researchExperience');
  const positions = t.raw('positions') as Array<{
    id: string;
    company: string;
    role: string;
    location: string;
    period: string;
    description: string;
    highlights: string[];
    tech: string[];
    logo: string;
    url: string;
    type?: 'work' | 'academia';
  }>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">
        {t('positionsLabel')}
      </p>
      <div className="relative">
        {positions.map((position, index) => (
          <TimelineItem
            key={position.id}
            title={position.role}
            institution={position.company}
            period={position.period}
            location={position.location}
            description={position.description}
            highlights={position.highlights}
            tech={position.tech}
            logo={position.logo}
            type={position.type ?? 'academia'}
            index={index}
            url={position.url || undefined}
          />
        ))}
      </div>
    </section>
  );
}
