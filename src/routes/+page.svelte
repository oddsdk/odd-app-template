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

<div
  class="min-h-[calc(100vh-96px)] flex flex-col items-start justify-center max-w-[690px] m-auto gap-6 pb-5 text-sm"
>
  {#if session?.authed}
    <div class="card card-bordered w-96 dark:border-slate-600">
      <div class="card-body">
        <h2 class="card-title">👋 Account</h2>
        <p>
          Your username is
          <span
            class="inline-block px-2 font-mono bg-slate-300 dark:bg-slate-700 rounded-md"
          >
            {session.username}
          </span>
        </p>

        {#if session.backupCreated}
          <p>✅ You have connected your account on another device.</p>
        {:else}
          <p>
            <span
              class="h-7 w-7 inline-block bg-orange-300 rounded-full font-normal text-center"
            >
              <Shield />
            </span>

            You have not connected your account on another device.
          </p>
        {/if}
        <div class="card-actions justify-center mt-3">
          <button
            class="btn btn-primary"
            on:click={() => goto('/delegate-account')}
          >
            Connect a new device
          </button>
        </div>
      </div>
    </div>

    <div class="card w-96 card-bordered dark:border-slate-600">
      <div class="card-body">
        <h2 class="card-title">📷 Photo Gallery Demo</h2>
        <p>
          Try out the Webnative File System by storing your photos in public and
          private storage.
        </p>
        <div class="card-actions justify-center">
          <a class="btn btn-primary" href="/gallery">Go to Photos</a>
        </div>
      </div>
    </div>
  {:else}
    <AboutThisTemplate />
  {/if}
</div>
