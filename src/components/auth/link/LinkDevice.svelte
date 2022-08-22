<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { accountLinkingConsumerStore } from '../../../stores'
  import { appName } from '$lib/app-name'
  import { createAccountLinkingConsumer } from '$lib/auth/linking'
  import { loadAccount } from '$lib/common/webnative'

  let displayPin: string = ''
  let url = $page.url
  const username = url.searchParams.get('username')

  // clear the params
  url.searchParams.delete('username')
  history.replaceState(null, document.title, url.toString())

  console.log('username: ', username)

  const initAccountLinkingConsumer = async () => {
    const accountLinkingConsumer = await createAccountLinkingConsumer(username)
    accountLinkingConsumerStore.set(accountLinkingConsumer)

    accountLinkingConsumer.on('challenge', ({ pin }) => {
      displayPin = pin.join(' ')
      console.log('pin: ', pin)
    })

    accountLinkingConsumer.on('link', async ({ approved, username }) => {
      console.log('approved: ', approved)

      if (approved) {
        await loadAccount(username)
        goto('/')
        // Send up a toast on '/'
      }
    })
  }

  initAccountLinkingConsumer()
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <div class="grid grid-flow-row auto-rows-max gap-7">
      <h3 class="text-xl font-serif">Connection Requested</h3>
      <div class="grid grid-flow-row auto-rows-max gap-4 justify-items-center">
        {#if displayPin}
          <span
            class="btn btn-info btn-lg rounded-full text-2xl font-extralight tracking-widest w-3/4 cursor-default"
          >
            {displayPin}
          </span>
        {/if}
        <span class="text-md">
          Open {appName} on your already connected device and enter this code.
        </span>
        <div
          class="grid grid-flow-col auto-cols-max gap-4 justify-center items-center text-slate-500"
        >
          <span
            class="rounded-lg border-t-2 border-l-2 border-slate-600 w-4 h-4 block animate-spin"
          />
          Waiting for a response...
        </div>
      </div>
      <div>
        <button class="btn btn-primary btn-outline text-base font-normal mt-4">
          Cancel Request
        </button>
      </div>
    </div>
  </div>
</div>
