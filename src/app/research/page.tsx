import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/SectionHeader';
import TimelineItem from '@/components/TimelineItem';
import messages from '@/lib/messages';

export const metadata = { title: `${messages.research.title}, Shahzaib Warraich` };

export default function ResearchPage() {
  return <ResearchContent />;
}

function ResearchContent() {
  const t = useTranslations('research');
  const papers = t.raw('papers') as Array<{
    id: string;
    title: string;
    venue: string;
    venueLogo?: string;
    supervisor: string;
    authors: string;
    period: string;
    description: string;
    highlights: string[];
    tech: string[];
    paper?: string;
  }>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="relative">
        {papers.map((paper, index) => (
          <TimelineItem
            key={paper.id}
            title={paper.title}
            institution={`${paper.venue} · ${paper.supervisor}`}
            venueLogo={paper.venueLogo}
            period={paper.period}
            location={paper.authors}
            description={paper.description}
            highlights={paper.highlights}
            tech={paper.tech}
            type="paper"
            index={index}
            url={paper.paper || undefined}
          />
        ))}
      </div>
    </section>
  );
}
