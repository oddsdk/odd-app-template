<script lang="ts">
  import { goto } from '$app/navigation'
  import { onDestroy } from 'svelte'

  import { sessionStore } from '../stores'
  import { appName } from '$lib/app-name'
  import type { Session } from '$lib/session'

  let session: Session

  const unsubscribe = sessionStore.subscribe(val => {
    session = val
  })

  onDestroy(unsubscribe)
</script>

<div class="grid grid-flow-row auto-rows-max gap-5 justify-center">
  <h1 class="text-2xl">Welcome to {appName}!</h1>

  {#if session?.authed}
    <div class="card card-bordered w-96">
      <div class="card-body items-center text-center">
        <h2 class="card-title">Account</h2>
        <p>👋 Your username is {session.username}</p>
        {#if session.backupCreated}
          <p>✅ You have connected your account on another device</p>
        {:else}
          <p>⚠ Your have not connected your account on another device.</p>
        {/if}
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            on:click={() => goto('/delegate-account')}
          >
            Connect a new device
          </button>
        </div>
      </div>
    </div>

    <div class="card w-96 card-bordered">
      <div class="card-body items-center text-center">
        <h2 class="card-title">Photo Gallery</h2>
        <p>📷 Store your photos in public and private storage</p>

        <div class="card-actions justify-end">
          <a class="btn btn-primary" href="/gallery">Open Photos</a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
</style>
