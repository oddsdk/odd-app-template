<script lang="ts">
  import { sessionStore } from '$src/stores'
  import Authed from '$components/home/Authed.svelte'
  import Public from '$components/home/Public.svelte'

  $: console.log('$sessionStore', $sessionStore)
</script>

{#if $sessionStore?.session}
  <Authed />
{:else}
  <Public />
{/if}
