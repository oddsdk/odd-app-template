<script lang="ts">
  import Discord from '$components/icons/Discord.svelte'
  import ExternalLink from '$components/icons/ExternalLink.svelte'
  import Github from '$components/icons/Github.svelte'
</script>

<div
  class="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center max-w-[700px] m-auto gap-6 pb-5 text-sm"
>
  <h1 class="text-xl">404 - Page not found</h1>

  <p>The page you have requested does not exist.</p>

  <img
    class="relative z-0 w-[227px] h-[227px] rounded-full border-[16px] border-base-content"
    src={`${window.location.origin}/wn-404.gif`}
    alt={`Circle animation`}
  />

  <div class="flex items-center justify-between gap-6">
    <a
      class="flex items-center justify-center gap-2 font-bold text-sm text-base-content"
      href="https://guide.fission.codes/"
      target="_blank"
    >
      Docs <ExternalLink />
    </a>
    <a
      class="flex items-center justify-center gap-2 font-bold text-sm text-base-content"
      href="https://github.com/webnative-examples/"
      target="_blank"
    >
      Github <Github />
    </a>
    <a
      class="flex items-center justify-center gap-2 font-bold text-sm text-base-content"
      href="https://fission.codes/discord"
      target="_blank"
    >
      Discord <Discord />
    </a>
  </div>
</div>
