
import { redirect } from 'next/navigation';

export default function LegalRoot() {
  // Redirect /legal directly to /legal/privacy
  redirect('/legal/privacy');
}
