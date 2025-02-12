import { Metadata } from 'next';

import ProfileView from '@/organisms/ProfileView';

// ===============================================================

export default async function Page() {
  return <ProfileView />;
}

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Profile',
  description: 'My Profile',
};
