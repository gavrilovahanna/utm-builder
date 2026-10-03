import type { Metadata } from "next";
import Link from "next/link";
import { UTMBuilder } from "@/components/utm-builder";

export const metadata: Metadata = {
  title: "UTM Builder — Free UTM URL Generator",
  description:
    "Build a campaign URL with UTM parameters in seconds. Free UTM builder with presets, QR codes, local history, validation, and clean URL encoding.",
  alternates: { canonical: "/" },
};

const parameterRows = [
  ["utm_source", "Required", "Traffic source", "google, newsletter, linkedin"],
  ["utm_medium", "Required", "Marketing channel", "cpc, email, paid_social"],
  ["utm_campaign", "Required", "Campaign name", "spring_sale, product_launch"],
  ["utm_term", "Optional", "Keyword or targeting term", "running_shoes"],
  ["utm_content", "Optional", "Creative or link variant", "hero_button, blue_banner"],
];

const faqs = [
  ["What is a UTM URL?", "A UTM URL is a normal web address with campaign parameters added to the query string. Analytics platforms can use those parameters to identify where a visit came from and which campaign, creative, or keyword generated it."],
  ["Should UTM values use spaces?", "You can type normal words with spaces. UTM Builder URL-encodes them correctly. For campaign naming, many teams still prefer lowercase words separated by underscores or hyphens so reports stay consistent."],
  ["Do UTM parameters change the destination page?", "No. They normally preserve the same path and add tracking information after the question mark. Your analytics platform reads the parameters separately from the page itself."],
  ["Where are my recent campaigns stored?", "Saved campaigns are stored in your browser's localStorage on the device and browser you are using. There is no account, server database, or sync between devices."],
];

export default function HomePage() {
  return (
    <main>
      <section className="shell pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-950/40 dark:text-indigo-300">
            Free · No login · Runs in your browser
          </div>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">UTM Builder</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            Build clean, trackable campaign URLs in seconds. Add UTM parameters, copy your link, generate a QR code, and keep recent campaigns on your device.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-5xl">
          <UTMBuilder />
        </div>
      </section>

      <div className="shell max-w-5xl">
        <section id="how-to-use" className="border-b border-slate-200 py-16 dark:border-slate-800">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Start here</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">How to use this UTM builder</h2>
            <ol className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                ["1", "Enter your destination", "Paste the exact page you want people to visit."],
                ["2", "Name the campaign", "Set the source, medium, and campaign name. Add term or content when useful."],
                ["3", "Copy and use it", "Copy the generated URL or open the QR code section for offline and print campaigns."],
              ].map(([number, title, body]) => (
                <li key={number} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-xs font-bold text-white dark:bg-white dark:text-slate-950">{number}</span>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="what-are-utm-parameters" className="border-b border-slate-200 py-16 dark:border-slate-800">
          <div className="max-w-3xl prose-lite">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">The basics</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">What are UTM parameters?</h2>
            <p>UTM parameters are labels added to a URL so analytics tools can understand campaign traffic. They do not replace your normal analytics setup; they give that setup more campaign context.</p>
            <p>The five standard fields are source, medium, campaign, term, and content. Source, medium, and campaign are the core fields most teams use. Term and content are useful when you need more detail about keywords, audiences, creatives, or individual links.</p>
          </div>
        </section>

        <section id="utm-guide" className="border-b border-slate-200 py-16 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Reference</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">UTM parameter guide</h2>
          <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                  <tr><th className="px-5 py-4 font-bold">Parameter</th><th className="px-5 py-4 font-bold">Use</th><th className="px-5 py-4 font-bold">Meaning</th><th className="px-5 py-4 font-bold">Examples</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {parameterRows.map((row) => <tr key={row[0]}><td className="px-5 py-4 font-mono font-bold text-indigo-700 dark:text-indigo-300">{row[0]}</td><td className="px-5 py-4 text-slate-500">{row[1]}</td><td className="px-5 py-4 text-slate-700 dark:text-slate-200">{row[2]}</td><td className="px-5 py-4 font-mono text-xs text-slate-500">{row[3]}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="naming-best-practices" className="border-b border-slate-200 py-16 dark:border-slate-800">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="prose-lite">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Keep reporting clean</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">UTM naming best practices</h2>
              <ul>
                <li>Choose lowercase values and keep the same spelling across campaigns.</li>
                <li>Define a small source and medium vocabulary before a team starts tagging links.</li>
                <li>Use campaign names that describe the business initiative, not a temporary task.</li>
                <li>Use <code>utm_content</code> for meaningful link or creative variants.</li>
                <li>Avoid personal information and sensitive customer data in UTM values.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Example UTM URLs</p>
              <div className="mt-5 space-y-4 font-mono text-xs leading-6">
                <p className="break-all">https://example.com/pricing?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=spring_sale</p>
                <p className="break-all">https://example.com/guide?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=weekly_digest&amp;utm_content=hero_link</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="border-b border-slate-200 py-16 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Questions</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">FAQ</h2>
          <div className="mt-7 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group p-5">
                <summary className="focus-ring cursor-pointer list-none pr-8 font-bold text-slate-900 marker:hidden dark:text-white">{question}<span className="float-right text-slate-400 transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 sm:p-8 dark:border-indigo-500/20 dark:bg-indigo-950/30">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">More tools coming later</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Related marketing tools</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">This area is ready for future free tools. Add links here as they launch so visitors can move between useful marketing utilities.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="#how-to-use" className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-indigo-100 dark:bg-slate-900 dark:text-slate-200 dark:ring-indigo-500/20">Campaign URL Builder</Link>
              <Link href="#utm-guide" className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-indigo-100 dark:bg-slate-900 dark:text-slate-200 dark:ring-indigo-500/20">UTM Parameter Guide</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
