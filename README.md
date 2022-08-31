# Webnative App Template

[![Netlify Status](https://api.netlify.com/api/v1/badges/7b7418ef-86eb-43c4-a668-0118568c7f46/deploy-status)](https://app.netlify.com/sites/webnative/deploys)

A web app template for Webnative.

## Setup

Install dependencies.

```shell
npm install
```

## Develop

Work on the application in local development.

```shell
npm run dev
```

Navigate to `http://localhost:5173` in your web browser.

## Build

Export a static build.

```shell
npm run build
```

The build outputs the static site to the `build` directory.

## Publish

NOTE: SvelteKit Single-Page Applications require redirects in order to support routing. This is not currently supported by IPFS, so the [Fission Publish GitHub action](https://github.com/fission-codes/publish-action) is not currently supported.

The [Webnative Template App demo](https://webnative.netlify.app) is currently hosted on Netlify, but it should be supported on any static hosting platform (Vercel, Cloudflare Pages, etc).

In order to deploy your own Webnative application on Netlify, simply create a new Netlify site connected to your app's repository and Netlify will take care of the rest. No Netlify-specific configuration is needed.

## Customize

- `app.html` - the SEO meta tags will need to be changed.
- `lib/app-name.ts` - choose a better application name
- To customize the application's Tailwind theme, change `tailwind.config.ts` - link to DaisyUI customization page.
