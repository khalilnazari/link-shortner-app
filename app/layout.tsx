import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ClerkThemeWrapper } from "@/components/clerk-theme-wrapper";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener - Shorten URLs & Track Performance",
  description: "Transform long URLs into short, memorable links. Track clicks, analyze performance, and share with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeWrapper>
            <header className="max-w-5xl mx-auto flex justify-between items-center py-4">
              <div>
                <Link href="/" className="text-xl font-bold tracking-tight">
                  Link Shortner App
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Sign Up</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            {children}
          </ClerkThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
