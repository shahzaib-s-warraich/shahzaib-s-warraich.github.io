import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactPageContent from './ContactPageContent';
import { getLatestCvPath } from '@/lib/cv';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: `${t("title")}, Shahzaib Warraich` };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cvHref = await getLatestCvPath();
  return <ContactPageContent cvHref={cvHref} />;
}
