<script lang="ts">
  import { sessionStore } from '../stores'
  import { appName } from '$lib/app-info'
  import AboutThisTemplate from '$components/home/AboutThisTemplate.svelte'
  import Home from '$components/home/Home.svelte'
</script>

{#if $sessionStore?.authed}
  <Home />
{:else}
  <div
    class="min-h-[calc(100vh-96px)] flex flex-col items-start justify-center max-w-[700px] m-auto gap-6 pb-5 text-sm"
  >
    <AboutThisTemplate title={`Welcome to the ${appName}`} />
  </div>
{/if}
