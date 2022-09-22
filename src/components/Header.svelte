<script lang="ts">
  import { goto } from '$app/navigation'
  
  import { appName } from '$lib/app-info'
  import { sessionStore, themeStore } from '../stores'
  import { storeTheme, type Theme } from '$lib/theme'
  import Brand from '$components/icons/Brand.svelte'
  import DarkMode from '$components/icons/DarkMode.svelte'
  import LightMode from '$components/icons/LightMode.svelte'
  import Shield from '$components/icons/Shield.svelte'

  const setTheme = (newTheme: Theme) => {
    themeStore.set(newTheme)
    storeTheme(newTheme)
  }
</script>

<header class="navbar bg-base-100 pt-0">
  <div class="flex-1 cursor-pointer hover:underline" on:click={() => goto('/')}>
    <Brand />
    <span class="text-xl ml-2 hidden md:inline">{appName}</span>
  </div>

  {#if !$sessionStore.loading && !$sessionStore.authed}
    <div class="flex-none">
      <a class="btn btn-sm h-10 btn-primary normal-case" href="/connect">
        Connect
      </a>
    </div>
  {/if}

  {#if !$sessionStore.loading && $sessionStore.backupCreated === false}
    <span
      on:click={() => goto('/delegate-account')}
      class="btn btn-sm h-10 btn-warning rounded-full font-normal transition-colors ease-in hover:bg-orange-500 hover:border-orange-500"
    >
      <Shield />
      <span class="ml-2 hidden md:block">Backup recommended</span>
    </span>
  {/if}

  <span class="ml-2">
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
