import { authOptions } from "@/pages/api/auth/[...nextauth]"

import NextAuth from "next-auth/next"

const handler = NextAuth(authOptions)

export { handler as GET, handler as Post }
