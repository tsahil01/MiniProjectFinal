import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/ModalProvider";
import SocketProvider from "@/components/providers/SocketProvider";
import QueryProvider from "@/components/providers/QueryProvider";

import { Inter as FontSans } from "next/font/google"
 
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext", "cyrillic", "greek", "hebrew"],
  weight: ["300", "400", "600", "700", "800", "500"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "ThisCode | Place to Learn new",
  description:
    "ThisCode is the simplest way to learn Code. Talk, chat, hang out, and stay close with your friends and communities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="ThisCode-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
