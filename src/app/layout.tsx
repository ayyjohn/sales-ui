import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stackline Frontend Assessment",
  description: "Stackline Frontend Assessment",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="grid h-full min-h-screen w-full grid-rows-[5rem_1fr]">
        {children}
      </body>
    </html>
  );
}
