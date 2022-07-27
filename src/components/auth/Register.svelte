<script lang="ts">
  import * as webnative from 'webnative'
  import {
    isUsernameValid,
    isUsernameAvailable,
    register
  } from '$lib/common/webnative'

  let username: string = ''
  let usernameValid = true
  let usernameAvailable = true
  let registrationSuccess = true
  let checkingUsername = false

  const checkUsername = async (event: Event) => {
    checkingUsername = true
    const { value } = event.target as HTMLInputElement
    username = value
    console.log(username)

    usernameValid = await isUsernameValid(username)

    if (usernameValid) {
      usernameAvailable = await isUsernameAvailable(username)
      console.log(username, ' is available: ', usernameAvailable)
    }
    checkingUsername = false
  }

  const registerUser = async (event: Event) => {
    registrationSuccess = await register(username)
    console.log('registration success: ', registrationSuccess)
    if (registrationSuccess) {
      // Redirect to device linking?
    }
  }
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
