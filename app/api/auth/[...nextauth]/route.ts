import NextAuth, {type NextAuthOptions} from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter:PrismaAdapter(db),
  session:{
    strategy: 'jwt'
  },
  providers: [
    
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          return null
        }
        
        const existingUser = await db.user.findUnique({
          where:{
            email: credentials.email
          },
          select:{
            id:true,
            email:true,
            name:true,
            password:true
          }
        })

        if (!existingUser) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id:existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          password: existingUser.password
        }
      }
    }),
    
  ],
};

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}