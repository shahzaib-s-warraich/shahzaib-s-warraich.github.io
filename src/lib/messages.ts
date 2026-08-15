// Single source of truth for site copy — English only (no more locale routing).
// Server components import this directly for static metadata; the client tree
// gets the same object via NextIntlClientProvider in the root layout.
import messages from '../../messages/en.json';

export default messages;
