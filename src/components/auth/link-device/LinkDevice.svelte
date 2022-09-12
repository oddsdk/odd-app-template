<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let pin: string

  const dispatch = createEventDispatcher()

  const cancelConnection = () => {
    dispatch('cancel')
  }
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <div class="grid grid-flow-row auto-rows-max gap-7">
      <h3 class="text-xl font-serif">Connection Requested</h3>
      <div class="grid grid-flow-row auto-rows-max gap-4 justify-items-center">
        {#if pin}
          <span
            class="btn bg-blue-100 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900 border-0 btn-lg rounded-full text-3xl tracking-[.18em] w-3/4 cursor-default font-mono font-light"
          >
            {pin}
          </span>
        {/if}
        <span class="text-md">Enter this code on your connected device.</span>
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
          class="btn btn-primary btn-outline text-base font-normal mt-4"
          on:click={cancelConnection}
        >
          Cancel Request
        </button>
      </div>
    </div>
  </div>
</div>
