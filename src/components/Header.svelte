<script lang="ts">
  import { goto } from '$app/navigation'
  import { sessionStore, theme } from '../stores'
  import { storeTheme, type Theme } from '$lib/theme/index'

  import { appName } from '$lib/app-name'
  import Brand from '$components/icons/Brand.svelte'
  import Shield from '$components/icons/Shield.svelte'
  import LightMode from '$components/icons/LightMode.svelte'
  import DarkMode from '$components/icons/DarkMode.svelte'

  const setTheme = (newTheme: Theme) => {
    theme.set(newTheme)
    storeTheme(newTheme)
  }
</script>

<header class="navbar bg-base-100 pt-0">
  <div class="flex-1" on:click={() => goto('/')}>
    <Brand />
    <span class="text-xl ml-2">{appName}</span>
  </div>

  <span class="mr-2">
    {#if $theme === 'light'}
      <span on:click={() => setTheme('dark')}>
        <LightMode />
      </span>
    {:else}
      <span on:click={() => setTheme('light')}>
        <DarkMode />
      </span>
    {/if}
  </span>

  {#if !$sessionStore.loading}
    {#if !$sessionStore.authed}
      <div class="flex-none">
        <a class="btn btn-sm h-10 btn-primary normal-case" href="/connect">
          Connect
        </a>
      </div>
    {:else if $sessionStore.backupCreated === false}
      <span
        on:click={() => goto('delegate-account')}
        class="btn btn-sm btn-warning rounded-full font-extralight"
      >
        <Shield />
        <span class="ml-2">Backup required</span>
      </span>
    {/if}
  {/if}
</header>
