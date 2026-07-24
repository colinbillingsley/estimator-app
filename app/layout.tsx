import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Outfit, Oxanium } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth, currentUser } from "@clerk/nextjs/server";

const oxaniumHeading = Oxanium({
  subsets: ["latin"],
  variable: "--font-heading",
});

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Estimator App",
  description: "An estimator app with Clerk authentication.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use `currentUser()` to get the Backend `User` object
  const user = await currentUser();

  const isSignedIn = user ? true : false;

  return (
    <html
      lang="en"
      className={cn("h-full", outfit.variable, oxaniumHeading.variable)}
    >
      <body
        className={cn(
          `min-h-full flex ${isSignedIn ? "flex-row" : "flex-col"} bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50`,
        )}
      >
        <ClerkProvider>
          <Show when="signed-in">
            <Sidebar />
          </Show>

          <Show when="signed-out">
            <header className="border-b border-black/5 bg-white/80 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-black/60">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">Estimator App</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Sign in to save and manage estimate sessions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Show when="signed-out">
                    <SignInButton>
                      <span className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
                        Sign in
                      </span>
                    </SignInButton>
                    <SignUpButton>
                      <span className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                        Sign up
                      </span>
                    </SignUpButton>
                  </Show>
                </div>
              </div>
            </header>
          </Show>

          <TooltipProvider>{children}</TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
