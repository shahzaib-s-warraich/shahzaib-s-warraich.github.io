import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/SectionHeader';
import TimelineItem from '@/components/TimelineItem';
import messages from '@/lib/messages';

export const metadata = { title: `${messages.about.title}, Shahzaib Warraich` };

export default function AboutPage() {
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');
  const timeline = t.raw('timeline') as Array<{
    id: string;
    institution: string;
    degree: string;
    location: string;
    period: string;
    description: string;
    courses: string[];
    highlights: string[];
    logo: string;
    url?: string;
    type: 'master' | 'bachelor' | 'exchange';
  }>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="relative">
        {timeline.map((item, index) => (
          <TimelineItem
            key={item.id}
            title={item.degree}
            institution={item.institution}
            period={item.period}
            location={item.location}
            description={item.description}
            courses={item.courses}
            highlights={item.highlights}
            logo={item.logo}
            url={item.url || undefined}
            type={item.type}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
