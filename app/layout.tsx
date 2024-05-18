import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coaching Conundrum",
  description: "Simplify coaching-student scheduling, allowing coaches to add availability, view upcoming sessions, and access contact info.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <div className="container mx-auto px-5">
          {children}
        </div>
      </body>
    </html>
  );
}
