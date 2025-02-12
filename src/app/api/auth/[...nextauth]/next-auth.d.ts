import NextAuth from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

export interface SocialsInterface {
  label: string;
  url: string;
  tag: string;
  _id: string;
}

export interface UserInterface {
  _id: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  avatar: string;
  socials: SocialsInterface[];
}

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
    } & NextAuth.DefaultSession['user'];
  }

  interface User extends UserInterface {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
    };
  }
}
