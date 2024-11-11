import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../components/mtt/styles/mttCss.css";
import { ThemeProvider } from "@/components/mtt/providers/ThemeProvider";
import ReactQueryProvider from "@/components/mtt/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import MttNoSSR from "@/components/mtt/components/MttNoSSR";

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
  title: "Mtt Components",
  description: "Built with extension in mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MttNoSSR>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}

              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </MttNoSSR>
      </body>
    </html>
  );
}
