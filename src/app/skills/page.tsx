import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/SectionHeader';
import SkillCategory from '@/components/SkillCategory';
import LanguagesList from '@/components/LanguagesList';
import messages from '@/lib/messages';

export const metadata = { title: `${messages.skills.title}, Shahzaib Warraich` };

export default function SkillsPage() {
  return <SkillsContent />;
}

function SkillsContent() {
  const t = useTranslations('skills');
  const categories = t.raw('categories') as Array<{
    id: string;
    title: string;
    icon: string;
    skills: string[];
  }>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <SkillCategory
            key={cat.id}
            title={cat.title}
            icon={cat.icon}
            skills={cat.skills}
            index={index}
          />
        ))}
      </div>
      <LanguagesList />
    </section>
  );
}
