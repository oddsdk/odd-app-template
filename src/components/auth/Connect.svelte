<script lang="ts">
  import { goto } from '$app/navigation'
  import { onDestroy, onMount } from 'svelte'

  import { appName } from '$lib/app-name'
  import { sessionStore } from '../../stores'
  import type { Session } from '$lib/session'

  let unsubscribeSessionStore: () => void = () => {}

  onMount(() => {
    unsubscribeSessionStore = sessionStore.subscribe((session: Session) => {
      // BIZZARRO WORLD: This redirect executed after register when we were on the
      // register page! I would think that `unsubscribeSessionStore` would have torn
      // down the subscription and this code could not be reached.
      // if (session.authed) {
      //   goto('/')
      // }
    })
  })

  onDestroy(unsubscribeSessionStore)
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

    <div>
      <h3 class="mb-7 text-xl font-serif">Connect to {appName}</h3>
      <div>
        <a class="btn btn-primary mb-5 w-full" href="/register">
          Create a new account
        </a>
        <a class="btn btn-primary btn-outline w-full" href="/">
          I have an existing account
        </a>
      </div>
    </div>
  </div>
</div>
