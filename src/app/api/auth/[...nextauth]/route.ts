import { authOptions } from '@/utils/server/authOptions';
import NextAuth from 'next-auth';

export interface CredentialsInterface {
  email: string;
  password: string;
}

const handler = NextAuth(authOptions);

export {
  handler as GET, handler as POST 
};
