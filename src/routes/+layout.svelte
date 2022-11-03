<script lang="ts">
  import '../global.css'
  import { addNotification } from '$lib/notifications'
  import { appDescription, appImageURL, appName, appURL } from '$lib/app-info'
  import { sessionStore, themeStore } from '../stores'
  import { errorToMessage } from '$lib/session'
  import { initialize } from '$lib/init'
  import Footer from '$components/Footer.svelte'
  import Header from '$components/Header.svelte'
  import Notifications from '$components/notifications/Notifications.svelte'
  import SidebarNav from '$components/nav/SidebarNav.svelte'

  sessionStore.subscribe(session => {
    if (session.error) {
      const message = errorToMessage(session.error)
      addNotification(message, 'error')
    }
  })

  const init = async () => {
    await initialize()
  }

  init()
</script>

<svelte:head>
  <title>{appName}</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index,follow" />
  <meta name="googlebot" content="index,follow" />
  <meta name="description" content={appDescription} />
  <meta property="og:title" content={appName} />
  <meta property="og:description" content={appDescription} />
  <meta property="og:url" content={appURL} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={appImageURL} />
  <meta property="og:image:alt" content="WebNative Template" />
  <meta property="og:image:width" content="1250" />
  <meta property="og:image:height" content="358" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={appName} />
  <meta name="twitter:description" content={appDescription} />
  <meta name="twitter:image" content={appImageURL} />
  <meta name="twitter:image:alt" content={appName} />

  <!-- See https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs for description. -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>

<div data-theme={$themeStore} class="min-h-screen">
  <Notifications />
  <SidebarNav>
    <Header />
    <div class="px-4">
      <slot />
    </div>
  </SidebarNav>
  <Footer />
</div>
