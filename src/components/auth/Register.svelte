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
  <div class="modal-box w-11/12 max-w-5xl">
    <div>
      <h3>Choose a username</h3>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
        on:input={checkUsername}
      />
      <div>
        <a class="btn btn-secondary" href="/connect">Back</a>
        <button class="btn btn-primary">Register</button>
      </div>
    </div>
  </div>
</div>
