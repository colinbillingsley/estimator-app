import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 border border-black/5 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
        <span className="mx-auto inline-flex border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          Welcome
        </span>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Build estimates with a secure sign-in flow.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          Use the controls in the top navigation to create your first Clerk
          account, sign in, and manage your estimate sessions.
        </p>
      </section>
    </main>
  );
}
