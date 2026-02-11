import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"; // <--- MATCHING YOUR FILE NAME (Singular)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Extress",
  description: "Clarity over chaos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
