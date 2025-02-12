import { Metadata } from 'next';

import SignUpForm from '@/organisms/SignUpForm';

// ===============================================================

export default async function Page() {
  return <SignUpForm />;
}

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Registration',
  description: 'Sign Up to Blog',
};
