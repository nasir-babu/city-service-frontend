import type { Metadata } from "next";
import Providers from "@/providers";
import "./globals.css";
import { Playfair_Display, DM_Sans } from "next/font/google"; // .    Playfair Display  DM Sans
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { AiChatbot } from "@/components/shared/AiChatbot";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "City Service Portal",
  description: "City Service Management System",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", playfair.variable, dmSans.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Providers>{children}</Providers>
          <AiChatbot />
          <Toaster
            position="top-right"
            richColors
            style={{
              top: "65px",
              right: "20px",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
