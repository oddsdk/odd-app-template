<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import clipboardCopy from 'clipboard-copy'

  import { appName } from '$lib/app-info'
  import { addNotification } from '$lib/notifications'

  export let pin: string

  const dispatch = createEventDispatcher()

  const cancelConnection = () => {
    dispatch('cancel')
  }

  const copyCode = async () => {
    await clipboardCopy(pin)
    addNotification('Copied to clipboard', 'success')
  }
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box w-narrowModal relative text-center dark:border-slate-600 dark:border"
  >
    <div class="grid grid-flow-row auto-rows-max gap-7">
      <h3 class="text-base">Connect to {appName}</h3>
      <div class="grid grid-flow-row auto-rows-max gap-4 justify-items-center">
        {#if pin}
          <span
            on:click={copyCode}
            class="btn text-base-100 hover:text-base-100 bg-base-content hover:bg-base-content border-0 btn-lg rounded-full text-deviceCode tracking-[.18em] w-3/4 cursor-pointer font-mono font-light"
          >
            {pin}
          </span>
        {/if}
        <span class="text-sm text-left">
          Enter this code on your connected device.
        </span>
        <div
          class="grid grid-flow-col auto-cols-max gap-4 justify-center items-center text-slate-500"
        >
          <span
            class="rounded-lg border-t-2 border-l-2 border-slate-600 dark:border-slate-50 w-4 h-4 block animate-spin"
          />
          Waiting for a response...
        </div>
      </div>
      <div>
        <button
          class="btn btn-outline text-base mt-4"
          on:click={cancelConnection}
        >
          Cancel Request
        </button>
      </div>
    </div>
  </div>
</div>
