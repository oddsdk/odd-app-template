<script lang="ts">
  import { get } from 'svelte/store'

  import '../global.css'
  import { initialize } from '$lib/common/webnative'
  import { sessionStore, theme } from '../stores'
  import { storeTheme } from '$lib/theme'
  import Header from '$components/Header.svelte'

  theme.subscribe(val => {
    storeTheme(val)
  })

  const init = async () => {
    await initialize()

    // TODO: Remove this debugging statement
    const session = get(sessionStore)
    console.log('session at init', session)
  }

  init()
</script>

<div data-theme={$theme}>
  <Header />

  <slot />
</div>
