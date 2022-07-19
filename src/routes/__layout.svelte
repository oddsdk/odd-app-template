<script lang="ts">
  import '../global.css'
  import { theme } from '../stores'
  import { storeTheme } from '$lib/theme'
  import Header from '$components/Header.svelte'

  theme.subscribe(val => {
    storeTheme(val)
  })
</script>


<div data-theme={$theme}>
  <Header></Header>

  <slot />
</div>

