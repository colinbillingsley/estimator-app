import type { Metadata } from "next";
import { Outfit, Oxanium } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";

const oxaniumHeading = Oxanium({
  subsets: ["latin"],
  variable: "--font-heading",
});

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Estimator App",
  description: "An estimator app with Clerk authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
      className={cn(
        "h-screen w-full",
        outfit.variable,
        oxaniumHeading.variable,
      )}
    >
      <div className="flex h-screen flex-col">
        <Header />

        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
