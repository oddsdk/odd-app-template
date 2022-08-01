<script lang="ts">
  import '../global.css'
  import { initialize } from '$lib/common/webnative'
  import { sessionStore, theme } from '../stores'
  import { storeTheme } from '$lib/theme'
  import type { Session } from '$lib/session'
  import Toast from '$components/notifications/Toast.svelte'
  import Header from '$components/Header.svelte'

  let session: Session = null

  theme.subscribe(val => {
    storeTheme(val)
  })

  sessionStore.subscribe(val => {
    session = val
  })

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

<div data-theme={$theme}>
  <Header />

  {#if session.error}
    <Toast kind="error" message={session.error} on:clear={clearNotification} />
  {/if}

  <slot />
</div>
