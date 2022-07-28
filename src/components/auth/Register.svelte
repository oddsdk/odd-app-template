<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  import {
    isUsernameValid,
    isUsernameAvailable,
    register
  } from '$lib/common/webnative'
  import { sessionStore } from '../../stores'
  import type { Session } from '$lib/session'

  let username: string = ''
  let usernameValid = true
  let usernameAvailable = true
  let registrationSuccess = true
  let checkingUsername = false

  let unsubscribeSessionStore: () => void = () => {}

  let checkIcon = `<svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2071 0.292893C14.5976 0.683417 14.5976 1.31658 14.2071 1.70711L6.20711 9.70711C5.81658 10.0976 5.18342 10.0976 4.79289 9.70711L0.792893 5.70711C0.402369 5.31658 0.402369 4.68342 0.792893 4.29289C1.18342 3.90237 1.81658 3.90237 2.20711 4.29289L5.5 7.58579L12.7929 0.292893C13.1834 -0.0976311 13.8166 -0.0976311 14.2071 0.292893Z" fill="#16A34A"/> </svg> `
  let xIcon = `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.792893 0.292893C1.18342 -0.0976311 1.81658 -0.0976311 2.20711 0.292893L6.5 4.58579L10.7929 0.292893C11.1834 -0.0976311 11.8166 -0.0976311 12.2071 0.292893C12.5976 0.683417 12.5976 1.31658 12.2071 1.70711L7.91421 6L12.2071 10.2929C12.5976 10.6834 12.5976 11.3166 12.2071 11.7071C11.8166 12.0976 11.1834 12.0976 10.7929 11.7071L6.5 7.41421L2.20711 11.7071C1.81658 12.0976 1.18342 12.0976 0.792893 11.7071C0.402369 11.3166 0.402369 10.6834 0.792893 10.2929L5.08579 6L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893Z" fill="#DC2626"/> </svg>`

  onMount(() => {
    unsubscribeSessionStore = sessionStore.subscribe((session: Session) => {
      if (session.authed) {
        goto('/')
      }
    })
  })

  const checkUsername = async (event: Event) => {
    checkingUsername = true
    const { value } = event.target as HTMLInputElement
    username = value

    usernameValid = await isUsernameValid(username)

    if (usernameValid) {
      usernameAvailable = await isUsernameAvailable(username)
      console.log(username, ' is available: ', usernameAvailable)
    }
    checkingUsername = false
  }

  const registerUser = async () => {
    registrationSuccess = await register(username)

    if (registrationSuccess) {
      sessionStore.update(session => ({
        ...session,
        username,
        authed: true
      }))

      console.log('session after registration', $sessionStore)

      goto('/linkDevice')
    }
  }

  unsubscribeSessionStore()
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

    <div>
      <h3 class="mb-7 text-xl font-serif">Choose a username</h3>
      <div class="relative">
        <input
          id="registration"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full block"
          class:input-error={username.length !== 0 &&
            (!usernameValid || !usernameAvailable)}
          on:input={checkUsername}
        />
        {#if checkingUsername}
          <span
            class="rounded-lg border-t-2 border-l-2 border-slate-600 w-4 h-4 block absolute top-4 right-4 animate-spin"
          />
        {/if}
        {#if !(username.length === 0) && usernameAvailable && usernameValid && !checkingUsername}
          <span class="w-4 h-4 block absolute top-4 right-4">
            {@html checkIcon}
          </span>
        {/if}
        {#if !(username.length === 0) && !checkingUsername && !(usernameAvailable && usernameValid)}
          <span class="w-4 h-4 block absolute top-4 right-4">
            {@html xIcon}
          </span>
        {/if}
      </div>

      {#if !(username.length === 0)}
        <!-- Status of username: valid, available, etc -->
        <label for="registration" class="label mt-1">
          {#if usernameValid && usernameAvailable}
            <span class="label-text-alt text-success">
              The username is available.
            </span>
          {:else if !usernameValid}
            <span class="label-text-alt text-error">
              The username is invalid.
            </span>
          {:else if !usernameAvailable}
            <span class="label-text-alt text-error">
              The username is unavailable.
            </span>
          {/if}
        </label>
      {/if}
      {#if !registrationSuccess}
        <!-- Error when registration fails -->
        <label for="registration" class="label mt-1">
          <span class="label-text-alt text-error text-left">
            There was an issue registering your account. Please try again.
            <a href="#" class="underline">More info</a>
          </span>
        </label>
      {/if}

      <div class="text-left mt-3">
        <input
          type="checkbox"
          id="shared-computer"
          class="peer checkbox checkbox-primary inline-grid align-bottom"
        />
        <!-- Warning when "This is a shared computer" is checked -->
        <label
          for="shared-computer"
          class="cursor-pointer ml-1 text-sm text-slate-700 grid-inline"
        >
          This is a shared computer
        </label>
        <label for="registration" class="label mt-1 hidden peer-checked:block">
          <span class="label-text-alt text-error text-left">
            <!-- TODO: Swap in application name for AppName -->
            For security reasons, AppName doesn't support shared computers at this
            time.
          </span>
        </label>
      </div>

      <div class="mt-5">
        <a class="btn btn-primary btn-outline" href="/connect">Back</a>
        <button
          class="btn btn-primary"
          disabled={username.length === 0 ||
            !usernameValid ||
            !usernameAvailable}
          on:click={registerUser}
        >
          Register
        </button>
      </div>
    </div>
  </div>
</div>
