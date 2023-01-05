<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { sessionStore, themeStore } from '../stores'
  import { DEFAULT_THEME_KEY, storeTheme, type ThemeOptions } from '$lib/theme'
  import AlphaTag from '$components/nav/AlphaTag.svelte'
  import Avatar from '$components/settings/Avatar.svelte'
  import BrandLogo from '$components/icons/BrandLogo.svelte'
  import BrandWordmark from '$components/icons/BrandWordmark.svelte'
  import DarkMode from '$components/icons/DarkMode.svelte'
  import Hamburger from '$components/icons/Hamburger.svelte'
  import LightMode from '$components/icons/LightMode.svelte'
  import Shield from '$components/icons/Shield.svelte'

  const setTheme = (newTheme: ThemeOptions) => {
    localStorage.setItem(DEFAULT_THEME_KEY, 'false')
    themeStore.set({
      ...$themeStore,
      selectedTheme: newTheme,
      useDefault: false,
    })
    storeTheme(newTheme)
  }
</script>

<header class="navbar flex bg-base-100 pt-4">
  <div class="lg:hidden">
    {#if $sessionStore.session}
      <label
        for="sidebar-nav"
        class="drawer-button cursor-pointer -translate-x-2"
      >
        <Hamburger />
      </label>
    {:else}
      <div
        class="flex items-center cursor-pointer gap-3"
        on:click={() => goto('/')}
      >
        <BrandLogo />
        <AlphaTag />
      </div>
    {/if}
  </div>

  <!-- Even if the user is not authed, render this header in the connection flow -->
  {#if !$sessionStore.session || $page.url.pathname.match(/register|backup|delegate/)}
    <div
      class="hidden lg:flex flex-1 items-center cursor-pointer gap-3"
      on:click={() => goto('/')}
    >
      <BrandLogo />
      <div class="hidden lg:inline-block">
        <BrandWordmark />
      </div>
      <div class="hidden sm:inline-block">
        <AlphaTag />
      </div>
    </div>
  {/if}

  <div class="ml-auto">
    {#if !$sessionStore.loading && $sessionStore.backupCreated === false}
      <span
        on:click={() => goto('/delegate-account')}
        class="btn btn-sm h-10 btn-warning rounded-full bg-orange-200 border-2 border-neutral-900 font-medium text-neutral-900 transition-colors ease-in hover:bg-orange-300"
      >
        <span class="mr-2">Backup recommended</span>
        <Shield />
      </span>
    {/if}

    {#if $sessionStore.session}
      <a href="/settings" class="ml-2 cursor-pointer">
        <Avatar size="small" />
      </a>
    {/if}

    <span class="ml-2 cursor-pointer">
      {#if $themeStore.selectedTheme === 'light'}
        <span on:click={() => setTheme('dark')}>
          <LightMode />
        </span>
      {:else}
        <span on:click={() => setTheme('light')}>
          <DarkMode />
        </span>
      {/if}
    </span>
  </div>
</header>
