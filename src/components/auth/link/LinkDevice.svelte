<script lang="ts">
  import clipboardCopy from 'clipboard-copy'
  import QRCode from 'qrcode-svg'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { createAccountLinkingConsumer } from '$lib/auth/linking'
  import { isUsernameValid, isUsernameAvailable } from '$lib/common/webnative'
  import { loadAccount } from '$lib/common/webnative'
  import { theme } from '../../../stores'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  let view: 'connect-account' | 'open-linked-device' | 'link-device' =
    'connect-account'

  let displayPin: string = ''
  let url = $page.url
  let username = url.searchParams.get('username')

  // clear the params
  url.searchParams.delete('username')
  history.replaceState(null, document.title, url.toString())

  const origin = window.location.origin

  let connectionLink = null
  let qrcode = null

  let showUsernameError = false

  const initAccountLinkingConsumer = async () => {
    const accountLinkingConsumer = await createAccountLinkingConsumer(username)

    accountLinkingConsumer.on('challenge', ({ pin }) => {
      displayPin = pin.join(' ')
      view = 'link-device'
    })

    accountLinkingConsumer.on('link', async ({ approved, username }) => {
      if (approved) {
        await loadAccount(username)
        goto('/')
        // Send up a toast on '/'
      }
    })
  }

  const copyLink = async () => {
    await clipboardCopy(connectionLink)
  }

  const linkDevice = async () => {
    const usernameValid = await isUsernameValid(username)
    const usernameAvailable = await isUsernameAvailable(username)

    console.log('valid', usernameValid)
    console.log('available', usernameAvailable)

    if (!usernameValid || usernameAvailable) {
      showUsernameError = true
      return
    }

    view = 'open-linked-device'

    connectionLink = `${origin}/delegate-account?username=${username}`
    qrcode = new QRCode({
      content: connectionLink,
      color: $theme === 'light' ? '#334155' : '#E2E8F0',
      background: '#ffffff00'
    }).svg()

    initAccountLinkingConsumer()
  }

  if (username) {
    view = 'link-device'
    initAccountLinkingConsumer()
  }
</script>

<input type="checkbox" id="link-device-modal" checked class="modal-toggle" />
{#if view === 'connect-account'}
  <div class="modal">
    <div class="modal-box w-80 relative text-center">
      <h3 class="mb-4 text-xl font-serif">Connect your account</h3>
      <div class="relative">
        <label class="label" for="registration">
          <span class="label-text">Enter your username</span>
        </label>
        <input
          id="registration"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full block"
          bind:value={username}
          on:input={() => {
            showUsernameError = false
          }}
        />
        {#if showUsernameError}
          <span class="label-text-alt text-error mt-2">
            Unable to establish a connection for {username}
          </span>
        {/if}
      </div>

      <div class="mt-5">
        <a class="btn btn-primary btn-outline" href="/connect">Back</a>
        <button class="btn btn-primary" on:click={linkDevice}>Continue</button>
      </div>
    </div>
  </div>
{:else if view === 'open-linked-device'}
  <div class="modal">
    <div class="modal-box w-80 relative text-center">
      <div>
        <h3 class="pb-1 text-xl font-serif">Connect a backup device</h3>
        {@html qrcode}
        <p class="font-extralight pt-1 mb-8">
          Scan this code on your connected device, or share the connection link.
        </p>
        <button class="btn btn-primary btn-outline" on:click={copyLink}>
          <ClipboardIcon />
          <span class="ml-2">Copy connection link</span>
        </button>
      </div>
    </div>
  </div>
{:else if view === 'link-device'}
  <div class="modal">
    <div class="modal-box w-80 relative text-center">
      <div class="grid grid-flow-row auto-rows-max gap-7">
        <h3 class="text-xl font-serif">Connection Requested</h3>
        <div
          class="grid grid-flow-row auto-rows-max gap-4 justify-items-center"
        >
          {#if displayPin}
            <span
              class="btn btn-info btn-lg rounded-full text-2xl font-extralight tracking-widest w-3/4 cursor-default"
            >
              {displayPin}
            </span>
          {/if}
          <span class="text-md">Enter this code on your connected device.</span>
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
          <button
            class="btn btn-primary btn-outline text-base font-normal mt-4"
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
