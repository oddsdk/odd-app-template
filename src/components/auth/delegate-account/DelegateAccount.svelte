<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let pinInput: string
  export let pinError: boolean

  const dispatch = createEventDispatcher()

  const cancelConnection = () => {
    dispatch('cancel')
  }

  /**
   * Auto submit the form when the pinInput is equal to the TARGET_PIN_LENGTH
   */
  const TARGET_PIN_LENGTH = 6
  const checkPin = () => {
    if (pinInput.length === TARGET_PIN_LENGTH) {
      dispatch('checkpin')
    } else {
      pinError = false
    }
  }
</script>

<input
  type="checkbox"
  id="delegate-account-modal"
  checked
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box w-narrowModal relative text-center">
    <div>
      <h3 class="mb-8 text-base">
        A new device would like to connect to your account
      </h3>
      <div class="mb-5">
        <input
          id="pin"
          type="text"
          class="input input-bordered w-full max-w-[197px] mb-2 rounded-full h-[68px] focus:outline-none font-mono text-deviceCode text-center tracking-[0.1em] font-light {pinError
            ? '!text-red-500 !border-red-500'
            : ''}"
          maxlength="6"
          bind:value={pinInput}
          on:keyup={checkPin}
        />
        <label for="pin" class="label">
          {#if !pinError}
            <span class="label-text-alt">
              Enter the connection code from that device to approve this
              connection.
            </span>
          {:else}
            <span class="label-text-alt text-error">
              Entered pin does not match a pin from a known device.
            </span>
          {/if}
        </label>
      </div>
      <div>
        <button class="btn btn-outline w-full" on:click={cancelConnection}>
          Cancel Request
        </button>
      </div>
    </div>
  </div>
</div>
