# adityajamuar.com

Personal site of Aditya Jamuar, built with [Astro](https://astro.build) and hosted on Cloudflare Pages.

## Develop

```sh
npm install
npm run dev
```

## Edit content

All copy lives in `src/data/site.ts`: highlights, the AI workflow cards, changelog releases and talks. Components in `src/components/` only handle layout.

## Deploy

Cloudflare Pages, connected to this repo:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22`
