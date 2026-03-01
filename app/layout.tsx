import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import Provider from "./provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

const quranFont = localFont({
  variable: "--font-quran",
  src: [{
    path: "../public/fonts/uthmanic.otf"
  }],
  weight: "400",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Islamic App",
  description: "Islamic app built using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${quranFont.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
