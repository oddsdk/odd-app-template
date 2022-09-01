<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import { appName } from '$lib/app-info'
  import type { ConnectView } from '$lib/views'

  const dispatch = createEventDispatcher()

  const navigate = (view: ConnectView) => {
    dispatch('navigate', { view })
  }
</script>

<input type="checkbox" id="connect-modal" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <a
      href="/"
      class="btn btn-xs btn-circle absolute right-2 top-2 dark:bg-slate-600"
    >
      ✕
    </a>

    <div>
      <h3 class="mb-7 text-xl font-serif">Connect to {appName}</h3>
      <div>
        <a class="btn btn-primary mb-5 w-full" href="/register">
          Create a new account
        </a>
        <button
          class="btn btn-primary btn-outline w-full"
          on:click={() => navigate('open-connected-device')}
        >
          I have an existing account
        </button>
      </div>
    </div>
  </div>
</div>
