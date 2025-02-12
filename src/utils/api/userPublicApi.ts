import { getBaseUrlBasedOnServer } from '../functions';
import { headers } from 'next/headers';
import { CleanUserType } from './usersApi';

export async function getUserPublic(username: string): Promise<CleanUserType | null> {
  const baseUrl = getBaseUrlBasedOnServer();
  const url = `${baseUrl}/api/user_public?username=${username}`;
  const res = await fetch(url, {
    headers: await headers(),
    next: { tags: ['getUserPublic'] },
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return await res.json();
}
