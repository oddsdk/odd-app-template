<script lang="ts">
  import { get as getStore } from 'svelte/store'

  import { sessionStore } from '$src/stores'
  import { appName } from '$lib/app-info'
  import {
    createDID,
    isUsernameValid,
    isUsernameAvailable,
    prepareUsername,
    register,
    USERNAME_STORAGE_KEY
  } from '$lib/auth/account'
  import CheckIcon from '$components/icons/CheckIcon.svelte'
  import XIcon from '$components/icons/XIcon.svelte'
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

    usernameValid = await isUsernameValid(encodedUsername)

    if (usernameValid) {
      usernameAvailable = await isUsernameAvailable(encodedUsername)
    }
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
</script>

{#if initializingFilesystem}
  <FilesystemActivity activity="Initializing" />
{:else}
  <input type="checkbox" id="register-modal" checked class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-narrowModal relative text-center">
      <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

      <form on:submit={registerUser}>
        <h3 class="mb-7 text-base">Choose a username</h3>
        <div class="relative">
          <input
            id="registration"
            type="text"
            placeholder="Type here"
            class="input input-bordered focus:outline-none w-full px-3 block"
            class:input-error={username.length !== 0 &&
              (!usernameValid || !usernameAvailable)}
            on:input={checkUsername}
          />
          {#if checkingUsername}
            <span
              class="rounded-lg border-t-2 border-l-2 border-base-content w-4 h-4 block absolute top-4 right-4 animate-spin"
            />
          {/if}
          {#if !(username.length === 0) && usernameAvailable && usernameValid && !checkingUsername}
            <span class="w-4 h-4 block absolute top-[17px] right-4">
              <CheckIcon />
            </span>
          {/if}
          {#if !(username.length === 0) && !checkingUsername && !(usernameAvailable && usernameValid)}
            <span class="w-4 h-4 block absolute top-[17px] right-4">
              <XIcon />
            </span>
          {/if}
        </div>

        {#if !(username.length === 0)}
          <!-- Status of username: valid, available, etc -->
          <label for="registration" class="label mt-1">
            {#if usernameValid && usernameAvailable}
              <span class="label-text-alt text-green-700 dark:text-green-500">
                This username is available.
              </span>
            {:else if !usernameValid}
              <span class="label-text-alt text-error">
                This username is invalid.
              </span>
            {:else if !usernameAvailable}
              <span class="label-text-alt text-error">
                This username is unavailable.
              </span>
            {/if}
          </label>
        {/if}
        {#if !registrationSuccess}
          <!-- Error when registration fails -->
          <label for="registration" class="label mt-1">
            <span class="label-text-alt text-error text-left">
              There was an issue registering your account. Please try again.
            </span>
          </label>
        {/if}

        <div class="text-left mt-3">
          <input
            type="checkbox"
            id="shared-computer"
            class="peer checkbox checkbox-primary border-2 border-base-content hover:border-orange-300 transition-colors duration-250 ease-in-out inline-grid align-bottom"
          />
          <!-- Warning when "This is a shared computer" is checked -->
          <label
            for="shared-computer"
            class="cursor-pointer ml-1 text-sm grid-inline"
          >
            This is a shared computer
          </label>
          <label
            for="registration"
            class="label mt-1 hidden peer-checked:block"
          >
            <span class="label-text-alt text-error text-left">
              For security reasons, {appName} doesn't support shared computers at
              this time.
            </span>
          </label>
        </div>

        <div class="mt-5">
          <a class="btn btn-outline" href="/connect">Back</a>
          <button
            class="ml-2 btn btn-primary disabled:opacity-50 disabled:border-neutral-900 disabled:text-neutral-900"
            disabled={username.length === 0 ||
              !usernameValid ||
              !usernameAvailable ||
              checkingUsername}
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
