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
  <div class="modal-box w-narrowModal relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

    <div>
      <h3 class="mb-7 text-base">Connect to {appName}</h3>
      <div>
        <a class="btn btn-primary mb-5 w-full" href="/register">
          Create a new account
        </a>
        <button
          class="btn btn-outline w-full"
          on:click={() => navigate('open-connected-device')}
        >
          I have an existing account
        </button>
      </div>
    </div>
  </div>
</div>
