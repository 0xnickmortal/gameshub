import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders"; // 导入新的 Provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Games Hub",
  description: "A modern game distribution platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-white dark:bg-[#020617]`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

