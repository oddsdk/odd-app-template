<script lang="ts">
  import { sessionStore } from '../stores'
  import AboutThisTemplate from '$components/home/AboutThisTemplate.svelte'
  import Home from '$components/home/Home.svelte'
</script>

{#if $sessionStore?.authed}
  <Home />
{:else}
  <AboutThisTemplate />
{/if}
