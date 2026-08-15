import HomeClient from './HomeClient';
import { getLatestCvPath } from '@/lib/cv';
import messages from '@/lib/messages';

export const metadata = {
  title: { absolute: 'Shahzaib Saqib Warraich: AI Research Scientist' },
  description: messages.home.description,
};

export default async function HomePage() {
  const cvHref = await getLatestCvPath();
  return <HomeClient cvHref={cvHref} />;
}
