import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from 'sonner'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Streamify",
  description: "Place where you can live streem your screen and cat realtime",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" forcedTheme="dark" storageKey="streamify-theme" >
        <Toaster theme="light" position="bottom-center"/>
        <Navbar  session = {session || null}/>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
