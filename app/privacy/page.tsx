import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for UTM Builder.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="shell max-w-3xl py-14 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Legal</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Privacy Policy</h1>
      <div className="prose-lite mt-8">
        <p><strong>Last updated: October 3, 2026.</strong></p>
        <p>UTM Builder is designed to work without sending the URLs or UTM values you enter to a server. URL generation and QR code generation happen in your browser.</p>
        <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Local storage</h2>
        <p>If you choose to save a campaign, the campaign details and generated URL are stored in your browser&apos;s localStorage. You can delete individual saved campaigns from the Recent campaigns section or clear your browser storage.</p>
        <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Analytics and tracking</h2>
        <p>This version does not include analytics or advertising tracking scripts. If analytics are added later, this policy should be updated before they are enabled.</p>
        <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Contact</h2>
        <p>Questions about this policy can be sent to <a className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </div>
    </main>
  );
}
