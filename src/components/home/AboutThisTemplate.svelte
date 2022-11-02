<script lang="ts">
  import { appName } from '$lib/app-info'

  export let title = `Welcome to the ${appName}`
</script>

<div
  class="min-h-[calc(100vh-96px)] flex flex-col items-start justify-center max-w-[690px] m-auto gap-6 pb-5 text-sm"
>
  <h1 class="text-xl">{title}</h1>

  <div class="max-w-[573px]">
    <p class="mb-5">
      <a
        class="link link-primary whitespace-nowrap"
        href="https://github.com/fission-codes/webnative"
        target="_blank"
      >
        Webnative SDK
        <span class="-scale-x-100 scale-y-100 inline-block">⎋</span>
      </a>
      is a true local-first edge computing stack.
    </p>
    <p>
      You can fork this
      <a
        class="link link-primary whitespace-nowrap"
        href="https://github.com/webnative-examples/webnative-app-template"
        target="_blank"
      >
        template
        <span class="-scale-x-100 scale-y-100 inline-block">⎋</span>
      </a>
      to start writing your own Webnative app. Learn more in the
      <a
        class="link link-primary whitespace-nowrap"
        href="https://guide.fission.codes/"
        target="_blank"
      >
        Webnative Guide
        <span class="-scale-x-100 scale-y-100 inline-block">⎋</span>
      </a>
      .
    </p>
  </div>
</div>
