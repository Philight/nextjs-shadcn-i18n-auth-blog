import { Metadata } from 'next';

import SignInForm from '@/organisms/SignInForm';

// ===============================================================

export default async function Page() {
  return <SignInForm />;
}

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign In into Blog',
};
