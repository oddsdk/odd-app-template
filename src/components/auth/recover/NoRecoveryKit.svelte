<script lang="ts">
  import LeftArrow from '$components/icons/LeftArrow.svelte'

  let username = ''

  /**
   * TODO: Maybe send app-owned recover email to user?
   * @param event
   */
  const handleSubmit = (event: Event) => {
    event.preventDefault()

    console.log('username', username)
  }
</script>

<form
  on:submit={handleSubmit}
  class="min-h-[calc(100vh-96px)] flex flex-col items-start justify-center max-w-[590px] m-auto gap-6 pb-5 text-sm"
>
  <h1 class="text-xl">Recover your public data</h1>

  <p>Your private data is stored encrypted. We do not have any access to it.</p>
  <p>
    Unfortunately, if you’ve lost your recovery kit, we will be unable to
    recover your private data. However, we can give you a copy of your public
    data:
  </p>
  <ul class="pl-6 list-disc">
    <li>your public photos</li>
  </ul>

  <div class="flex flex-col gap-2">
    <h3 class="font-semibold text-sm">Enter your username</h3>
    <input
      class="btn border-2 !outline-0 rounded-lg !bg-base-100 !h-[48px] gap-2 text-left text-base-content"
      type="text"
      name="username"
      bind:value={username}
    />
    <p class="text-xxs">We will send you a follow-up email.</p>
  </div>

  <div class="flex flex-col gap-2">
    <button class="btn btn-primary" type="submit">
      Recover my public data
    </button>
    <a href="/recover" class="btn btn-outline gap-2">
      <LeftArrow /> I have a recovery kit! Go back
    </a>
  </div>
</form>
