# Webnative App Template

[![Netlify Status](https://api.netlify.com/api/v1/badges/7b7418ef-86eb-43c4-a668-0118568c7f46/deploy-status)](https://app.netlify.com/sites/webnative/deploys)

The Webnative App Template is a clone-and-go template for building a web application using Webnative, fast. Clone it, modify it, and deploy it to have a running application in mere minutes.

The Webnative App Template provides a silky-smooth user experience. The end-user experience of creating an account and linking a second device feels familiar, comfortable, and obvious. Webnative authentication is key-based rather than password-based, so we've focused heavily on the authentication flows, borrowing language and screens from two-factor auth flows. Our hope is that the authentication patterns in the Webnative App Template will provide a model for friendly UX for other applications that leverage key-based authentication.

## What's Webnative?

[The Webnative SDK](https://github.com/fission-codes/webnative) empowers developers to build fully distributed web applications without needing a complex back-end. The SDK provides:

- user accounts (via [the browser's Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)),
- authorization (using [UCAN](https://ucan.xyz))
- encrypted file storage (via the [Webnative File System](https://guide.fission.codes/developers/webnative/file-system-wnfs), backed by the [InterPlanetary File System](https://ipfs.io/), or IPFS)
- and key management (via websockets and a two-factor auth-like flow).

Webnative applications work offline and store data encrypted for the user by leveraging the power of the web platform. You can read more about Webnative in Fission's [Webnative Guide](https://guide.fission.codes/developers/webnative).

## Getting Started

You can try out the template yourself [here](https://webnative.netlify.app/).

Ready? LFG.

1. Clone the repository:

   ```shell
   git clone git@github.com:fission-codes/webnative.git
   ```

2. Install the dependencies.

   ```shell
   npm install
   ```

3. Start the local development server.

   ```shell
   npm run dev
   ```

4. Navigate to `http://localhost:5173` in your web browser.

## Build

Export a static build.

```shell
npm run build
```

The build outputs the static site to the `build` directory.

## Deploy

NOTE: You can't currently deploy to Fission. SvelteKit Single-Page Applications require redirects in order to support routing. This is not currently supported by IPFS, so the [Fission Publish GitHub action](https://github.com/fission-codes/publish-action) is not currently supported.

The [Webnative Template App demo](https://webnative.netlify.app) is currently hosted on Netlify, but it should be supported on any static hosting platform (Vercel, Cloudflare Pages, etc).

In order to deploy your own Webnative application on Netlify, simply create a new Netlify site connected to your app's repository and Netlify will take care of the rest. No Netlify-specific configuration is needed.

## Customize

- `app.html` - the SEO meta tags will need to be changed.
- `lib/app-name.ts` - choose a better application name
- To customize the application's Tailwind theme, change `tailwind.config.ts` - link to DaisyUI customization page.
