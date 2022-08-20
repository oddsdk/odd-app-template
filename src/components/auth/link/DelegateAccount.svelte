<script lang="ts">
  import { goto } from '$app/navigation'

  import {
    accountLinkingProducerStore,
    filesystemStore,
    sessionStore
  } from '../../../stores'
  import { setBackupStatus } from '$lib/common/webnative'

  let pinInput = ''
  let pinError = false

  // TODO: Handle null store case
  const {
    accountLinkingProducer,
    pin,
    confirmPin,
    rejectPin
  } = $accountLinkingProducerStore

  // Subscribe to the link event
  const initAccountLinkingProducer = async () => {
    accountLinkingProducer.on('link', async ({ approved, username }) => {
      console.log('approved: ', approved)

      if (approved) {
        sessionStore.update(session => ({
          ...session,
          backupCreated: true
        }))

        const fs = $filesystemStore
        await setBackupStatus(fs, true)

        goto('/')
        // Send up a toast on '/'
      }
    })
  }

  // TODO: Better input validation and pin comparison
  const checkPin = () => {
    const input: number[] = Array.from(pinInput).map(n => +n)

    if (JSON.stringify(input) === JSON.stringify(pin)) {
      confirmPin()
    } else {
      pinError = true
      console.log(`Input ${pinInput} did not match expected pin.`)
    }
  }

  initAccountLinkingProducer()
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <div>
      <h3 class="mb-7 text-xl font-serif">
        A new device would like to connect to your account
      </h3>
      <div class="mb-5">
        <input
          id="pin"
          type="text"
          class="input input-bordered w-full max-w-xs mb-2"
          bind:value={pinInput}
        />
        <label for="pin" class="label">
          {#if !pinError}
            <span class="label-text-alt text-slate-500">
              Enter the connection code to approve the connection
            </span>
          {:else}
            <span class="label-text-alt text-error">
              Entered pin does not match a pin from a known device
            </span>
          {/if}
        </label>
      </div>
      <div>
        <button class="btn btn-primary mb-5 w-full" on:click={checkPin}>
          Approve the connection
        </button>
        <button class="btn btn-error btn-outline w-full" on:click={rejectPin}>
          Refuse the connection
        </button>
      </div>
    </div>
  </div>
</div>
