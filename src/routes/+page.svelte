<script lang="ts">
  import { sessionStore } from '../stores'
  import Authed from '$components/home/Authed.svelte'
  import Public from '$components/home/Public.svelte'
</script>

{#if $sessionStore?.authed}
  <Authed />
{:else}
  <Public />
{/if}
