import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/providers/Providers";

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
      <body>
        <Providers>
          <AppRouterCacheProvider>
            <>
              <Toaster position={"top-center"} />
              {children}
            </>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
