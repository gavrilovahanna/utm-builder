# UTM Builder

A fast, privacy-first UTM URL builder built with Next.js, TypeScript, Tailwind CSS, and `qrcode.react`.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production check

```bash
npm run lint
npm run build
npm run start
```

## Site URL

Copy `.env.example` to `.env.local` and set:

```text
SITE_URL=https://your-real-domain.com
```

This value is used for the canonical URL, Open Graph metadata, sitemap, and robots file.

## Important privacy note

Recent campaigns are stored only in the browser's localStorage. No account or database is used.

## Deployment

Push the project to GitHub and import the repository into Vercel. In Vercel Project Settings → Environment Variables, add `SITE_URL` with your production URL, then redeploy.

## Future premium version

Good candidates for a premium tier include team workspaces, synced campaign libraries, naming-rule validation, bulk UTM generation, CSV import/export, saved templates, branded QR codes, and shareable campaign links. Keep those features out of the free version until there is evidence of demand.
