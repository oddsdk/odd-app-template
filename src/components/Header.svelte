<script lang="ts">
  import { goto } from '$app/navigation'
  import { sessionStore, theme } from '../stores'
  import { storeTheme, type Theme } from '$lib/theme/index'

  import Shield from '$components/icons/Shield.svelte'
  import LightMode from '$components/icons/LightMode.svelte'
  import DarkMode from '$components/icons/DarkMode.svelte'

  const setTheme = (newTheme: Theme) => {
    theme.set(newTheme)
    storeTheme(newTheme)
  }
</script>

<header class="navbar bg-base-100 pt-0">
  <div class="flex-1">
    <button class="btn btn-sm btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-7 h-7 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
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
