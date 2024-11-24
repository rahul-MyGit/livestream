import prisma from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
import { NextResponse } from "next/server";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github],
  pages: {
    signIn: '/signin'
  },

  callbacks: {
    async session({session, token}) {
      if(session?.user){
        session.user.id = token.sub || '';
      }
      return session
    },

    async jwt({token, user}) {
      if(user){
        token.sub = user.id;
      }
      return token;
    }
  },

  session: {
    strategy: 'jwt'
  }
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
    }
  }
}

export const authMiddleware = auth((req) => {
    const isLoggedIn = !!req.auth;
    const isHomePage = req.nextUrl.pathname === '/';
    const isPublicFile = req.nextUrl.pathname.includes('.');
  
    if (isPublicFile) {
      return NextResponse.next();
    }
  
    if (isHomePage) {
      return NextResponse.next();
    }
  
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  
    return NextResponse.next();
  });