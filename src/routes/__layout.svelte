<script lang="ts">
  import '../global.css'
  import { theme } from '../stores'
  import { storeTheme } from '$lib/theme'

  theme.subscribe(val => {
    storeTheme(val)
  })
</script>


<div data-theme={$theme}>
  <slot />
</div>

