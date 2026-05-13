import type { Metadata } from "next";
import "./globals.css";
import layoutStyles from "./layout.module.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { SosWidget } from "@/components/SosWidget/SosWidget";
import { ChatWidget } from "@/components/chatWidget/ChatWidget";
import { ThemeScript } from "@/components/ThemeScript";

export const metadata: Metadata = {
  title: "BBAU Smart Campus Navigation",
  description:
    "Discover and navigate Babasaheb Bhimrao Ambedkar University campus with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <div className={layoutStyles.shell}>
          <Navbar />
          <main className={layoutStyles.main}>{children}</main>
          <Footer />
          <SosWidget />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
