// Fetching data on the server with the fetch API: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api
import { headers } from 'next/headers';
import { getBaseUrlBasedOnServer } from '../functions';
import { CleanUserType } from './usersApi';

export async function getUser(): Promise<CleanUserType | null> {
  const baseUrl = getBaseUrlBasedOnServer();
  const url = `${baseUrl}/api/user`;
  const res = await fetch(url, {
    headers: await headers(),
    next: { tags: ['getUser'] },
    cache: 'no-store',
  });

  return await res.json();
}
