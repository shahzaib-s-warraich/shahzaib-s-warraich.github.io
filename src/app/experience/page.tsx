import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/SectionHeader';
import TimelineItem from '@/components/TimelineItem';
import messages from '@/lib/messages';

export const metadata = { title: `${messages.experience.title}, Shahzaib Warraich` };

export default function ExperiencePage() {
  return <ExperienceContent />;
}

function ExperienceContent() {
  const t = useTranslations('experience');
  const jobs = t.raw('jobs') as Array<{
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
      <div className="relative">
        {jobs.map((job, index) => (
          <TimelineItem
            key={job.id}
            title={job.role}
            institution={job.company}
            period={job.period}
            location={job.location}
            description={job.description}
            highlights={job.highlights}
            tech={job.tech}
            logo={job.logo}
            type={job.type ?? 'work'}
            index={index}
            url={job.url || undefined}
          />
        ))}
      </div>
    </section>
  );
}
