import ContactPageContent from './ContactPageContent';
import { getLatestCvPath } from '@/lib/cv';
import messages from '@/lib/messages';

export const metadata = { title: `${messages.contact.title}, Shahzaib Warraich` };

export default async function ContactPage() {
  const cvHref = await getLatestCvPath();
  return <ContactPageContent cvHref={cvHref} />;
}
