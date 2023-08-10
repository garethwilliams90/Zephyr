import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/util/prisma"
import Stripe from "stripe"
import { Hmac, generateKey } from "crypto"
import { User } from "@prisma/client"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    //Add another provider...
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        name: {
          label: "Name",
          type: "name",
          placeholder: "Michael Tychal",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }

        const dbUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            name: credentials.name,
          },
        })

        //   if (dbUser dbUser.password === credentials.password) {
        //     const {password, createdAt, id, ...dbWithoutPassword } = dbUser
        //     return dbUser  as User
        //   }

        //   return null
        // },
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      })

      //Let's create a stripe customer
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        name: user.name || undefined,
      })

      //Also update our prisma user with the stripecustomerid
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      })
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = user
      return session
    },
  },
}

export default NextAuth(authOptions)
