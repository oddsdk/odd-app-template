<script lang="ts">
  import { themeStore } from '../stores'

  /**
   * Firefox doesn't fully support background-clip so the marquee text is cut off half way through the animation
   */
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1
</script>

<div
  class="fixed z-0 lg:z-20 right-0 bottom-0 left-0 h-8 flex items-center motion-reduce:justify-center motion-safe:justify-end bg-neutral-700 dark:bg-neutral-200 overflow-x-hidden"
>
  {#if $themeStore.selectedTheme === 'light'}
    <p
      class="motion-safe:animate-marquee motion-safe:left-full whitespace-nowrap font-bold text-xxs {isFirefox
        ? 'text-orange-500'
        : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600'}"
    >
      *** Experimental *** - You are currently previewing Webnative SDK Alpha
      0.2
    </p>
  {:else}
    <p
      class="motion-safe:animate-marquee motion-safe:left-full whitespace-nowrap font-bold text-xxs text-[#DD1F13]"
    >
      *** Experimental *** - You are currently previewing Webnative SDK Alpha
      0.2
    </p>
  {/if}
</div>
