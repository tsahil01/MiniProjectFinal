import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Live code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen",
          fontSans.variable
        )}>
        <div className="flex flex-col gap-5 p-1 justify-center w-screen mx-auto overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}