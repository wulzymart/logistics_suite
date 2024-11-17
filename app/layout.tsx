import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "../hooks/query-provider";
import WhatsAppWidget from "@/app/(website)/_components/whatsapp-widget";
import React from "react";
// import { getServerSession } from "next-auth";
// import SessionProvider from "../hooks/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " First Line Logistics || Reliable Logistics Provider in Nigeria",
  description:
    "Need a reliable logistics provider in Nigeria? Look no further! Our team offers a wide range of logistics services to meet your needs. Contact us today to learn more and schedule your shipment.",
  openGraph: {
    url: "https://firstlinelogistics.ng",
    title: "First Line Logistics Nigeria LTD",
    description:
      "Need a reliable logistics provider in Nigeria? Look no further! Our team offers a wide range of logistics services to meet your needs. Contact us today to learn more and schedule your shipment.",
    images: [
      {
        url: "https://www.firstlinelogistics.ng/logo.png",
        width: 800,
        height: 600,
        alt: "First Line Logistics",
        type: "image/png",
      },
    ],
    siteName: "First Line Logistics",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*<SessionProvider session={session}>*/}
          <QueryProvider>
            {children}
            <WhatsAppWidget/>
            <Toaster />
          </QueryProvider>
        {/*</SessionProvider>*/}
      </body>
    </html>
  );
}
