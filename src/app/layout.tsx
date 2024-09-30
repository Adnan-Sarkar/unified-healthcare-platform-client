import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unified Healthcare Platform",
  description:
    "Unified Healthcare Platform: A comprehensive solution for seamless access to healthcare services, including doctor consultations, pharmacies, blood donations, and more—empowering users with quality healthcare at their fingertips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
