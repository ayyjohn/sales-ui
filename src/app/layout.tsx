import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Stackline Frontend Assessment",
  description: "Stackline Frontend Assessment",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="grid h-full min-h-screen w-full grid-rows-[5rem_1fr]">
        {children}
      </body>
    </html>
  );
}
