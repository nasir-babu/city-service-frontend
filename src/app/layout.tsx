import type { Metadata } from "next";
import Providers from "@/providers";
import "./globals.css";
import { Playfair_Display, DM_Sans } from "next/font/google"; // ১. গুগল ফন্ট থেকে Playfair Display ও DM Sans ইম্পোর্ট করা হলো
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

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
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          richColors
          style={{
            top: "65px",
            right: "20px",
          }}
        />
      </body>
    </html>
  );
}
