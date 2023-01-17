<script lang="ts">
  import { get as getStore } from 'svelte/store'

  import { sessionStore } from '$src/stores'
  import {
    createDID,
    prepareUsername,
    register,
    USERNAME_STORAGE_KEY
  } from '$lib/auth/account'
  import FilesystemActivity from '$components/common/FilesystemActivity.svelte'

  let username: string = ''
  let encodedUsername: string = ''
  let usernameValid = true
  let usernameAvailable = true
  let registrationSuccess = true
  let checkingUsername = false

  let initializingFilesystem = false

  const checkUsername = async (event: Event) => {
    const { value } = event.target as HTMLInputElement
    const {
      program: {
        components: { crypto, storage }
      }
    } = getStore(sessionStore)

    username = value
    checkingUsername = true

    /**
     * Create a new DID for the user, which will be appended to their username, concatenated
     * via a `#`, hashed and encoded to ensure uniqueness
     */
    const did = await createDID(crypto)
    const fullUsername = `${value}#${did}`
    await storage.setItem(USERNAME_STORAGE_KEY, fullUsername)

    encodedUsername = await prepareUsername(fullUsername)

    checkingUsername = false
  }

  const registerUser = async (event: Event) => {
    event.preventDefault()

    if (checkingUsername) {
      return
    }

    initializingFilesystem = true

    registrationSuccess = await register(encodedUsername)

    if (!registrationSuccess) initializingFilesystem = false
  }

  $: usernameApproved =
    username.length > 0 &&
    !checkingUsername &&
    usernameValid &&
    usernameAvailable
  $: usernameError =
    username.length > 0 &&
    !checkingUsername &&
    (!usernameValid || !usernameAvailable)

  let existingAccount = false
  const toggleExistingAccount = () => (existingAccount = !existingAccount)
</script>

{#if initializingFilesystem}
  <FilesystemActivity activity="Initializing" />
{:else}
  <div
    class="flex flex-col items-center justify-center gap-8 min-h-[calc(100vh-128px)] md:min-h-[calc(100vh-160px)] max-w-[352px] m-auto"
  >
    <h1 class="text-base">Connect this device</h1>

    <!-- Registration Form -->
    <form
      on:submit={registerUser}
      class="w-full p-6 rounded bg-base-content text-base-100"
    >
      <h2 class="mb-2 text-sm font-semibold">Choose a username</h2>
      <div class="relative">
        <input
          id="registration"
          type="text"
          class="input input-bordered bg-neutral-50 !text-neutral-900 dark:border-neutral-900 rounded-lg focus:outline-none w-full px-3 block {usernameApproved
            ? '!border-green-300'
            : ''} {usernameError ? '!border-red-400' : ''}"
          class:input-error={username.length !== 0 &&
            (!usernameValid || !usernameAvailable)}
          on:input={checkUsername}
        />
        {#if checkingUsername}
          <span
            class="rounded-lg border-t-2 border-l-2 border-base-content w-4 h-4 block absolute top-4 right-4 animate-spin"
          />
        {/if}
      </div>

      {#if !registrationSuccess}
        <!-- Error when registration fails -->
        <label for="registration" class="label">
          <span class="text-xxs !p-0 text-error text-left">
            There was an issue registering your account. Please try again.
          </span>
        </label>
      {/if}

      <div class="text-left mt-4">
        <input
          type="checkbox"
          id="shared-computer"
          class="peer checkbox checkbox-primary hover:border-base-100 rounded-lg border-2 border-base-100 transition-colors duration-250 ease-in-out inline-grid align-bottom checked:bg-base-100"
        />
        <!-- Warning when "This is a shared computer" is checked -->
        <label
          for="shared-computer"
          class="cursor-pointer ml-1 text-sm grid-inline"
        >
          This is a public or shared computer
        </label>
        <label
          for="registration"
          class="label mt-4 !p-0 hidden peer-checked:block"
        >
          <span class="text-red-400 text-left">
            In order to ensure the security of your private data, Webnative does
            not recommend creating an account from a public or shared computer.
          </span>
        </label>
      </div>

      <div class="flex items-center mt-4">
        <a
          class="!h-[52px] btn btn-outline !text-neutral-900 !border-neutral-900 !bg-neutral-50"
          href="/"
        >
          Cancel
        </a>
        <button
          class="ml-2 !h-[52px] flex-1 btn btn-primary disabled:opacity-50 disabled:border-neutral-900 disabled:text-neutral-900"
          disabled={username.length === 0 ||
            !usernameValid ||
            !usernameAvailable ||
            checkingUsername}
          type="submit"
        >
          Create your account
        </button>
      </div>
    </form>

    <!-- Existing Account -->
    <div class="flex flex-col gap-5 w-full">
      <button
        class="btn btn-outline !h-[52px] w-full {existingAccount
          ? '!bg-base-content !text-base-100 !border-base-content'
          : ''}"
        on:click={toggleExistingAccount}
      >
        I have an existing account
      </button>
      {#if existingAccount}
        <div
          class="flex flex-col gap-4 p-6 rounded bg-neutral-200 text-neutral-900"
        >
          <h3 class="text-sm text-center">
            Which device are you connected on?
          </h3>
          <p>To connect your existing account, you'll need to:</p>
          <ol class="pl-6 list-decimal">
            <li>Find a device the account is already connected on</li>
            <li>Navigate to your Account Settings</li>
            <li>Click "Connect a new device"</li>
          </ol>
        </div>
      {/if}
    </div>

    <!-- Recovery Link -->
    <a href="/recover" class="underline">Recover an account</a>
  </div>
{/if}
