<script lang="ts">
  import { onMount } from 'svelte'

  import '../global.css'
  import { appName } from '$lib/appName'
  import { initialize } from '$lib/common/webnative'
  import { deviceStore, sessionStore, theme } from '../stores'
  import { storeTheme } from '$lib/theme'
  import { errorToMessage, type Session } from '$lib/session'
  import Toast from '$components/notifications/Toast.svelte'
  import Header from '$components/Header.svelte'

  let session: Session = null

  theme.subscribe(val => {
    storeTheme(val)
  })

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

    // TODO: Remove this debugging statement
    console.log('session at init', session)
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
</svelte:head>

<svelte:window on:resize={setDevice} />

<div data-theme={$theme}>
  <Header />

  {#if session.error}
    <Toast
      kind="error"
      message={errorToMessage(session.error)}
      on:clear={clearNotification}
    />
  {/if}

  <slot />
</div>
