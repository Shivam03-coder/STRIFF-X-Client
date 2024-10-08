import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import "./globals.css";
import AppWrapper from "./appwrapper";

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
  title: "STRIFF-X",
  description: "Project Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <head>
        <link rel="icon" href="/faviocn.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWrapper>{children}</AppWrapper>
        <div id="Moadalproject-root"></div>
        <Toaster />
      </body>
    </html>
  );
}
