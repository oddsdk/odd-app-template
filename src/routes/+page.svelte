<script lang="ts">
  import { goto } from '$app/navigation'
  import { onDestroy } from 'svelte'

  import { appName } from '$lib/app-info'
  import { sessionStore } from '../stores'
  import type { Session } from '$lib/session'
  import AboutThisTemplate from '$components/about/AboutThisTemplate.svelte'
  import Shield from '$components/icons/Shield.svelte'

  let session: Session

  const unsubscribe = sessionStore.subscribe(val => {
    session = val
  })

  onDestroy(unsubscribe)
</script>

{#if session?.authed}
  <div
    class="min-h-[calc(100vh-96px)] flex flex-col items-start max-w-[690px] m-auto gap-10 pb-5 text-sm"
  >
    <h1 class="text-xl">Welcome, {session.username}!</h1>

    <div class="flex flex-col items-start justify-center gap-5">
      <h2 class="text-lg">Photo Gallery Demo</h2>
      <p>
        Webnative makes it easy to implement private, encrypted, user-owned
        storage in your app. See it in action with our photo gallery demo.
      </p>
      <a class="btn btn-primary" href="/gallery">Try the Photo Gallery Demo</a>
    </div>

    <div class="flex flex-col items-start justify-center gap-5">
      <h2 class="text-lg">Device Connection Demo</h2>
      <p>
        With Webnative SDK, a user’s account lives only on their connected
        devices—entirely under their control. It’s easy for them to connect as
        many devices as they’d like. For recoverability, we recommend they
        always connect at least 2.
      </p>
      <button
        class="btn btn-primary"
        on:click={() => goto('/delegate-account')}
      >
        Connection an additional device
      </button>
    </div>
  </div>
{:else}
  <AboutThisTemplate />
{/if}
