import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the UTM Builder team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="shell max-w-3xl py-14 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Contact</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Get in touch</h1>
      <div className="prose-lite mt-8">
        <p>For feedback, bug reports, partnership questions, or suggestions for future marketing tools, email us.</p>
        <p><a className="inline-flex rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <p>When reporting a problem, include the browser you used and the steps that reproduce it. Please do not email passwords, payment details, or other sensitive information.</p>
      </div>
    </main>
  );
}
