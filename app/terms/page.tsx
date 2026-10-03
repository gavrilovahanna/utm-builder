import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for UTM Builder.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="shell max-w-3xl py-14 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Legal</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Terms of Use</h1>
      <div className="prose-lite mt-8">
        <p><strong>Last updated: October 3, 2026.</strong></p>
        <p>UTM Builder is provided as a convenience for creating campaign URLs. You are responsible for reviewing generated URLs and using them in accordance with the policies of your analytics, advertising, email, and other platforms.</p>
        <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">No guarantee</h2>
        <p>The tool is provided on an “as is” and “as available” basis. We do not guarantee that a third-party analytics platform will interpret a campaign URL exactly as you expect.</p>
        <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Acceptable use</h2>
        <p>Do not use the service to create URLs containing unlawful content, credentials, passwords, payment data, or other sensitive personal information.</p>
        <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Changes</h2>
        <p>These terms may be updated as the service changes. The date above identifies the latest revision.</p>
      </div>
    </main>
  );
}
