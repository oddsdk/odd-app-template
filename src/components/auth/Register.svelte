<script lang="ts">
  // Check if username is valid

  // Check if username is available

  const checkUsername = (event: Event) => {
    const { value: username } = event.target as HTMLInputElement

    console.log(username)
  }

  // Register the user
  // Bootstrap the filesystem if successful
  // Report an error
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

    <div>
      <h3 class="mb-7 text-xl font-serif">Choose a username</h3>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-11/12 mb-3 block"
        on:input={checkUsername}
      />
      <div class="text-left">
        <input
          type="checkbox"
          id="shared-computer"
          class="cursor-pointer appearance-none w-5 h-5 border border-primary checked:bg-primary rounded-md align-bottom inline-grid place-content-center"
        />
        <label
          for="shared-computer"
          class="cursor-pointer ml-1 text-sm text-slate-700 inline-grid"
          >This is a shared computer</label
        >
      </div>

      <div class="mt-5">
        <a class="btn btn-primary btn-outline" href="/connect">Back</a>
        <button class="btn btn-primary" disabled>Register</button>
      </div>
    </div>
  </div>
</div>
