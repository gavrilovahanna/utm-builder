/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  DEFAULT_FIELDS,
  PRESETS,
  UTMFields,
  UTMHistoryItem,
  buildUtmUrl,
  validateWebsiteUrl,
} from "@/lib/utm";

const HISTORY_KEY = "utm-builder-history";
const MAX_HISTORY = 8;

const fieldMeta: Array<{
  key: keyof UTMFields;
  label: string;
  placeholder: string;
  required?: boolean;
  hint: string;
}> = [
  { key: "websiteUrl", label: "Website URL", placeholder: "https://example.com/pricing", required: true, hint: "The page people should land on." },
  { key: "source", label: "Campaign source", placeholder: "google", required: true, hint: "Where the traffic comes from." },
  { key: "medium", label: "Campaign medium", placeholder: "cpc", required: true, hint: "The marketing channel." },
  { key: "campaign", label: "Campaign name", placeholder: "spring_sale", required: true, hint: "The campaign or promotion." },
  { key: "term", label: "Campaign term", placeholder: "running+shoes", hint: "Optional keyword or targeting term." },
  { key: "content", label: "Campaign content", placeholder: "hero_button", hint: "Optional creative or link variant." },
];

function Icon({ name }: { name: "copy" | "check" | "external" | "refresh" | "save" | "trash" }) {
  const common = { className: "size-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "copy") return <svg {...common}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === "external") return <svg {...common}><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></svg>;
  if (name === "refresh") return <svg {...common}><path d="M20 11a8.1 8.1 0 0 0-14.8-4L3 10" /><path d="M3 5v5h5" /><path d="M4 13a8.1 8.1 0 0 0 14.8 4L21 14" /><path d="M21 19v-5h-5" /></svg>;
  if (name === "save") return <svg {...common}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>;
  return <svg {...common}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5" /></svg>;
}

export function UTMBuilder() {
  const [fields, setFields] = useState<UTMFields>(DEFAULT_FIELDS);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<UTMHistoryItem[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || historyLoaded) return;
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      if (Array.isArray(stored)) setHistory(stored);
    } catch {
      setHistory([]);
    }
    setHistoryLoaded(true);
  }, [historyLoaded]);

  const urlError = fields.websiteUrl ? validateWebsiteUrl(fields.websiteUrl) : null;
  const generatedUrl = buildUtmUrl(fields);
  const requiredComplete = Boolean(
    fields.websiteUrl.trim() &&
      fields.source.trim() &&
      fields.medium.trim() &&
      fields.campaign.trim(),
  );
  const ready = requiredComplete && !urlError && Boolean(generatedUrl);

  function updateField(key: keyof UTMFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setCopied(false);
    setSaved(false);
  }

  function applyPreset(name: string) {
    setFields((current) => ({ ...current, ...PRESETS[name] }));
    setCopied(false);
    setSaved(false);
    window.requestAnimationFrame(() => document.getElementById("websiteUrl")?.focus());
  }

  function reset() {
    setFields(DEFAULT_FIELDS);
    setCopied(false);
    setSaved(false);
  }

  async function copyUrl() {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function saveCampaign() {
    if (!generatedUrl || !ready) return;
    const item: UTMHistoryItem = {
      ...fields,
      id: crypto.randomUUID(),
      url: generatedUrl,
      createdAt: new Date().toISOString(),
    };
    const next = [item, ...history.filter((old) => old.url !== generatedUrl)].slice(0, MAX_HISTORY);
    setHistory(next);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  function deleteHistory(id: string) {
    const next = history.filter((item) => item.id !== id);
    setHistory(next);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  }

  function loadHistory(item: UTMHistoryItem) {
    setFields({
      websiteUrl: item.websiteUrl,
      source: item.source,
      medium: item.medium,
      campaign: item.campaign,
      term: item.term,
      content: item.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-5">
      <section aria-labelledby="builder-heading" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_-30px_rgba(15,23,42,.35)] dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-7 dark:border-slate-800">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="builder-heading" className="text-lg font-bold tracking-tight">Build your campaign URL</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill in the essentials. Optional fields can stay empty.</p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="UTM presets">
              {Object.keys(PRESETS).map((name) => (
                <button key={name} type="button" onClick={() => applyPreset(name)} className="focus-ring rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300">
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_0.92fr]">
          <div className="p-5 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {fieldMeta.map((field) => {
                const value = fields[field.key];
                const invalid = field.key === "websiteUrl" && Boolean(urlError);
                return (
                  <div key={field.key} className={field.key === "websiteUrl" ? "sm:col-span-2" : ""}>
                    <label htmlFor={field.key} className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <span>{field.label} {field.required && <span className="text-indigo-600 dark:text-indigo-400">*</span>}</span>
                      {!field.required && <span className="text-xs font-medium text-slate-400">Optional</span>}
                    </label>
                    <input
                      id={field.key}
                      name={field.key}
                      type={field.key === "websiteUrl" ? "url" : "text"}
                      value={value}
                      onChange={(event) => updateField(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      aria-invalid={invalid}
                      aria-describedby={`${field.key}-hint`}
                      autoComplete="off"
                      className={`focus-ring mt-2 w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-950 placeholder:text-slate-400 outline-none transition dark:bg-slate-950 dark:text-white ${invalid ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400 dark:border-slate-700 dark:focus:border-indigo-500"}`}
                    />
                    <p id={`${field.key}-hint`} className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {invalid ? <span className="text-red-600 dark:text-red-400">{urlError}</span> : field.hint}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={copyUrl} disabled={!ready} className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-45">
                <Icon name={copied ? "check" : "copy"} />
                {copied ? "Copied!" : "Copy UTM URL"}
              </button>
              <button type="button" onClick={saveCampaign} disabled={!ready} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                <Icon name={saved ? "check" : "save"} />
                {saved ? "Saved" : "Save campaign"}
              </button>
              <button type="button" onClick={reset} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                <Icon name="refresh" /> Reset
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50/80 p-5 sm:p-7 lg:border-l lg:border-t-0 dark:border-slate-800 dark:bg-slate-950/45">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Generated URL</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your final link updates as you type.</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${ready ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                {ready ? "Ready" : "Waiting"}
              </span>
            </div>

            <div className="mt-4 min-h-28 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="break-all font-mono text-xs leading-6 text-slate-700 dark:text-slate-200" aria-live="polite">
                {generatedUrl || "Your UTM URL will appear here once the required fields are complete."}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href={ready ? generatedUrl! : undefined} target="_blank" rel="noreferrer" aria-disabled={!ready} className={`focus-ring inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${ready ? "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200" : "pointer-events-none bg-slate-200 text-slate-400 dark:bg-slate-800"}`}>
                <Icon name="external" /> Open URL
              </a>
              <a href="#qr-code" className={`focus-ring inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-bold transition ${ready ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" : "pointer-events-none border-slate-200 text-slate-400 dark:border-slate-800"}`}>
                Show QR code
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="qr-code" aria-labelledby="qr-heading" className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 lg:grid-cols-[auto_1fr] dark:border-slate-800 dark:bg-slate-900">
        <div className="grid min-h-52 min-w-52 place-items-center rounded-2xl bg-white p-4 shadow-inner ring-1 ring-slate-200">
          {ready ? <QRCodeSVG value={generatedUrl!} size={190} includeMargin level="M" title="QR code for generated UTM URL" /> : <div className="px-5 text-center text-xs font-medium text-slate-400">Complete the required fields to generate your QR code.</div>}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Offline QR generation</p>
          <h2 id="qr-heading" className="mt-2 text-xl font-bold tracking-tight">Turn your campaign link into a QR code</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">The QR code is generated directly in your browser. No URL is sent to a QR service, so your campaign link stays on your device.</p>
          <div className="mt-5">
            <a href={ready ? generatedUrl! : undefined} target="_blank" rel="noreferrer" className={`focus-ring inline-flex rounded-xl px-4 py-2.5 text-sm font-bold ${ready ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300" : "pointer-events-none bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>Test destination</a>
          </div>
        </div>
      </section>

      {history.length > 0 && (
        <section aria-labelledby="recent-heading" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="recent-heading" className="text-lg font-bold tracking-tight">Recent campaigns</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Saved only on this device in your browser.</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">{history.length}/{MAX_HISTORY}</span>
          </div>
          <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
            {history.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => loadHistory(item)} className="focus-ring min-w-0 text-left">
                  <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">{item.campaign || "Untitled campaign"}</span>
                  <span className="mt-1 block truncate font-mono text-xs text-slate-500 dark:text-slate-400">{item.url}</span>
                </button>
                <button type="button" onClick={() => deleteHistory(item.id)} className="focus-ring inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-300">
                  <Icon name="trash" /> Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
