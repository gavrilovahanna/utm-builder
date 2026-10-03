import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about UTM Builder and its privacy-first approach to campaign URL creation.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="shell max-w-3xl py-14 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">About</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">A simple tool for better campaign tracking.</h1>
      <div className="prose-lite mt-8">
        <p>UTM Builder is designed to make campaign URL tagging quick enough that teams actually use consistent naming.</p>
        <p>The builder works in your browser. There is no account, campaign database, or API required to generate a URL. Recent campaigns are optional and stay in localStorage on your device.</p>
        <p>The project is intentionally focused: fast page load, clear inputs, useful presets, accessible controls, and concise guidance instead of a long marketing page.</p>
      </div>
    </main>
  );
}
