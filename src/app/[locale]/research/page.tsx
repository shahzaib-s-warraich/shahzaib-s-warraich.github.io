import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/SectionHeader';
import TimelineItem from '@/components/TimelineItem';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research' });
  return { title: `${t("title")}, Shahzaib Warraich` };
}

export default async function ResearchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
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
