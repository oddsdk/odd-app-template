<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let pinInput: string
  export let pinError: boolean

  const dispatch = createEventDispatcher()

  const cancelConnection = () => {
    dispatch('cancel')
  }

  const checkPin = () => {
    dispatch('checkpin')
  }
</script>

<input
  type="checkbox"
  id="delegate-account-modal"
  checked
  class="modal-toggle"
/>
<div class="modal">
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <div>
      <h3 class="mb-7 text-xl font-serif">
        A new device would like to connect to your account
      </h3>
      <div class="mb-5">
        <input
          id="pin"
          type="text"
          class="input input-bordered w-full max-w-xs mb-2 rounded-full h-16 font-mono text-3xl text-center tracking-[0.18em] font-light dark:border-slate-300"
          bind:value={pinInput}
        />
        <label for="pin" class="label">
          {#if !pinError}
            <span class="label-text-alt text-slate-500">
              Enter the connection code to approve the connection.
            </span>
          {:else}
            <span class="label-text-alt text-error">
              Entered pin does not match a pin from a known device.
            </span>
          {/if}
        </label>
      </div>
      <div>
        <button class="btn btn-primary mb-5 w-full" on:click={checkPin}>
          Approve the connection
        </button>
        <button
          class="btn btn-primary btn-outline w-full"
          on:click={cancelConnection}
        >
          Cancel Request
        </button>
      </div>
    </div>
  </div>
</div>
