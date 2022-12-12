<script lang="ts">
  import { sessionStore } from '$src/stores'
  import Upload from '$components/icons/Upload.svelte'
</script>

<div
  class="min-h-[calc(100vh-96px)] flex flex-col items-start justify-center max-w-[590px] m-auto gap-6 pb-5 text-sm"
>
  <h1 class="text-xl">Recover your public data</h1>

  <p>Your private data is stored encrypted. We do not have any access to it.</p>
  <p>
    Unfortunately, if you’ve lost your recovery kit, we will be unable to
    recover your private data. However, we can give you a copy of your public
    data:
  </p>
  <ul>
    <li>your public photos</li>
  </ul>

  <div class="flex flex-col gap-2">
    <a
      class="btn btn-primary !btn-lg !h-[56px] !min-h-0 w-fit gap-2"
      href="/register"
    >
      <Upload /> Upload your recovery kit
    </a>
    <p class="text-xxs">
      {`It should be a file named Webnative-RecoveryKit-{yourUsername}.txt`}
    </p>
  </div>

  <a href="#" class="underline">I don’t have a recovery kit</a>
</div>
