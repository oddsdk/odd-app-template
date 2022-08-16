<script lang="ts">
  import { accountLinkingProducerStore } from '../../../stores'

  let pinInput = ''

  // TODO: Handle null store case
  const {
    accountLinkingProducer,
    pin,
    confirmPin,
    rejectPin
  } = $accountLinkingProducerStore

  // Subscribe to the link event
  const initAccountLinkingProducer = async () => {
    accountLinkingProducer.on('link', ({ approved, username }) => {
      console.log('approved: ', approved)

      // Send up a toast
      // Redirect to '/'
    })
  }

  // TODO: Better input validation and pin comparison
  const checkPin = () => {
    const input: number[] = Array.from(pinInput).map(n => +n)

    if (JSON.stringify(input) === JSON.stringify(pin)) {
      confirmPin()
    } else {
      console.log(`Input ${pinInput} did not match expected pin.`)
    }
  }

  initAccountLinkingProducer()
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

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
          <span class="label-text-alt text-slate-500">
            Enter the connection code to approve the connection
          </span>
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
