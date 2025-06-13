import type { Metadata } from "next";
import { Geist} from "next/font/google";
import "./globals.css";
import { Sen } from "next/font/google";


const sen = Sen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sen",
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "RestauManager",
  description: "Votre solution de gestion de restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  ${sen.variable}  scroll-smooth font-sen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
