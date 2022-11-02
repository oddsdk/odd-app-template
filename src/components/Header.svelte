<script lang="ts">
  import { goto } from '$app/navigation'

  import { sessionStore, themeStore } from '../stores'
  import { storeTheme, type Theme } from '$lib/theme'
  import Brand from '$components/icons/Brand.svelte'
  import BrandFull from '$components/icons/BrandFull.svelte'
  import DarkMode from '$components/icons/DarkMode.svelte'
  import LightMode from '$components/icons/LightMode.svelte'
  import Shield from '$components/icons/Shield.svelte'

  const setTheme = (newTheme: Theme) => {
    themeStore.set(newTheme)
    storeTheme(newTheme)
  }
</script>

<header class="navbar bg-base-100 pt-0">
  <div class="flex-1 items-center cursor-pointer" on:click={() => goto('/')}>
    <Brand />
    <div class="hidden md:inline-block ml-3">
      <BrandFull />
    </div>
    <span
      class="hidden sm:inline-block ml-3 px-2 py-[2px] !no-underline font-semiBold text-center text-xs text-neutral bg-gradient-to-r from-orange-600 to-orange-300"
    >
      ALPHA
    </span>
  </div>

  {#if !$sessionStore.loading && !$sessionStore.authed}
    <div class="flex-none">
      <a class="btn btn-primary btn-sm !h-10" href="/connect">Connect</a>
    </div>
  {/if}

  {#if !$sessionStore.loading && $sessionStore.backupCreated === false}
    <span
      on:click={() => goto('/delegate-account')}
      class="btn btn-sm h-10 btn-warning rounded-full bg-orange-300 border-2 border-neutral font-semiBold text-neutral transition-colors ease-in hover:border-neutral-50 hover:bg-orange-300"
    >
      <span class="mr-2">Backup recommended</span>
      <Shield />
    </span>
  {/if}

  <span class="ml-2 cursor-pointer">
    {#if $themeStore === 'light'}
      <span on:click={() => setTheme('dark')}>
        <LightMode />
      </span>
    {:else}
      <span on:click={() => setTheme('light')}>
        <DarkMode />
      </span>
    {/if}
  </span>
</header>
