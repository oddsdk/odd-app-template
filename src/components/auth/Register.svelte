<script lang="ts">
  import * as webnative from 'webnative'
  import { isUsernameValid, isUsernameAvailable } from '$lib/common/webnative'

  let username: string = ''
  let usernameValid = true
  let usernameAvailable = true

  const checkUsername = async (event: Event) => {
    const { value } = event.target as HTMLInputElement
    username = value
    console.log(username)

    usernameValid = await isUsernameValid(username)

    if (usernameValid) {
      usernameAvailable = await isUsernameAvailable(username)
      console.log(username, ' is available: ', usernameAvailable)
    }
  }
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

    <div>
      <h3 class="mb-7 text-xl font-serif">Choose a username</h3>
      <input
        id="registration"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full block"
        class:input-error={username.length !== 0 &&
          (!usernameValid || !usernameAvailable)}
        on:input={checkUsername}
      />

      {#if !(username.length === 0)}
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
      <div class="text-left mt-3">
        <input
          type="checkbox"
          id="shared-computer"
          class="cursor-pointer appearance-none w-5 h-5 border border-primary checked:bg-primary rounded-md align-bottom inline-grid place-content-center"
        />
        <label
          for="shared-computer"
          class="cursor-pointer ml-1 text-sm text-slate-700 inline-grid"
        >
          This is a shared computer
        </label>
      </div>

      <div class="mt-5">
        <a class="btn btn-primary btn-outline" href="/connect">Back</a>
        <button
          class="btn btn-primary"
          disabled={username.length === 0 ||
            !usernameValid ||
            !usernameAvailable}
        >
          Register
        </button>
      </div>
    </div>
  </div>
</div>
