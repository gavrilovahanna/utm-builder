import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-xl" aria-label="UTM Builder home">
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
              <path d="M5 7h14M5 12h9M5 17h6" strokeLinecap="round" />
              <circle cx="17" cy="12" r="2.5" />
            </svg>
          </span>
          <span className="text-[15px] font-bold tracking-tight text-slate-950 dark:text-white">UTM Builder</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
            <Link className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" href="/about">About</Link>
            <Link className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" href="/privacy">Privacy</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
