<script lang="ts">
  import '../global.css'
  import { addNotification } from '$lib/notifications'
  import { appDescription, appImageURL, appName, appURL } from '$lib/app-info'
  import { sessionStore, themeStore } from '../stores'
  import { errorToMessage } from '$lib/session'
  import { initialize } from '$lib/init'
  import Footer from '$components/Footer.svelte'
  import FullScreenLoadingSpinner from '$components/common/FullScreenLoadingSpinner.svelte'
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

  <meta name="description" content={appDescription} />
  <meta property="og:title" content={appName} />
  <meta property="og:description" content={appDescription} />
  <meta property="og:url" content={appURL} />
  <meta property="og:image" content={appImageURL} />
  <meta name="twitter:title" content={appName} />
  <meta name="twitter:description" content={appDescription} />
  <meta name="twitter:image" content={appImageURL} />
  <meta name="twitter:image:alt" content={appName} />
</svelte:head>

<div data-theme={$themeStore.selectedTheme} class="min-h-screen">
  <Notifications />

  {#if $sessionStore.loading}
    <FullScreenLoadingSpinner />
  {:else}
    <SidebarNav>
      <Header />
      <div class="px-4">
        <slot />
      </div>
    </SidebarNav>
  {/if}
  <Footer />
</div>
