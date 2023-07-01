import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any) {
        try {
          await connectMongo();

          // check user exists
          const result = await Users.findOne({ email: credentials.email });
          if (!result) {
            throw new Error('No user found');
          }

          // compare
          const checkPassword = await compare(credentials.password, result.password);

          // incorrect password
          if (!checkPassword) {
            throw new Error('Incorrect Password');
          }

          return result;
        } catch (error) {
          console.error(error);
          throw new Error('Connection Failed...!');
        }
      },
    }),
  ],
  secret: 'gl/o0pwlj9Q0RiUkBDH6rMQQMMHoxnjvbO0GWTnhprU=',
};

export default NextAuth(authOptions);
