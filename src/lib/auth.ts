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

  session: {
    strategy: 'jwt'
  }
});

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