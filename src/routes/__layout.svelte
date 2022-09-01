<script lang="ts">
  import { onMount } from 'svelte'

  import '../global.css'
  import { appDescription, appName, appURL } from '$lib/app-info'
  import { initialize } from '$lib/common/webnative'
  import { deviceStore, sessionStore, theme } from '../stores'
  import { errorToMessage, type Session } from '$lib/session'
  import Toast from '$components/notifications/Toast.svelte'
  import Notifications from '$components/notifications/Notifications.svelte'
  import Header from '$components/Header.svelte'

  let session: Session = null

  sessionStore.subscribe(val => {
    session = val
  })

  onMount(() => { setDevice() })

  const setDevice = () => {
    if (window.innerWidth <= 768) {
      deviceStore.set({ isMobile: true })
    } else {
      deviceStore.set({ isMobile: false })
    }
  }

  const init = async () => {
    await initialize()
  }

  const clearNotification = () => {
    sessionStore.update(session => ({
      ...session,
      error: null
    }))
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
  <meta property="og:image" content="TODO" />
  <meta property="og:image:alt" content="WebNative Template" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={appName} />
  <meta name="twitter:description" content={appDescription} />
  <meta name="twitter:image" content="TODO" />
  <meta name="twitter:image:alt" content={appName} />

  <!-- See https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs for description. -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>

<svelte:window on:resize={setDevice} />

<div data-theme={$theme} class="min-h-screen">
  <Header />
  <Notifications />

  {#if session.error}
    <Toast
      kind="error"
      message={errorToMessage(session.error)}
      on:clear={clearNotification}
    />
  {/if}

  <slot />
</div>
