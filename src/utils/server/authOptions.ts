import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import xss from 'xss';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';

import connectMongoDB from 'lib/mongo/DBConnection';
import User from 'lib/mongo/models/User';
// import { logInSchema } from '/lib/zod/ValidationSchemas';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }

        try {
          // await logInSchema.parseAsync({ password: credentials.password, email: credentials.email });

          const sanitizedPassword = xss(credentials.password);
          const sanitizedEmail = xss(credentials.email);

          await connectMongoDB();

          const user = await User.findOne({ email: sanitizedEmail });

          if (!user) {
            return null;
          }

          const match = await bcrypt.compare(sanitizedPassword, user.password);

          if (!match) {
            return null;
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw new Error('Authentication failed. Please try again.');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user._id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;

      return session;
    },
  },
};
