<script lang="ts">
  import { page } from '$app/stores'

  export let handleCloseDrawer
  export let item
</script>

<li>
  {#if item.callback}
    <button
      class="flex items-center justify-start gap-2 font-bold text-sm text-base-content hover:text-base-100 bg-base-100 hover:bg-base-content ease-in-out duration-[250ms] {$page
        .url.pathname === item.href
        ? '!text-base-100 !bg-base-content'
        : ''}"
      on:click={() => {
        handleCloseDrawer()
        item.callback()
      }}
    >
      <svelte:component this={item.icon} />{item.label}
    </button>
  {:else}
    <a
      class="flex items-center justify-start gap-2 font-bold text-sm text-base-content hover:text-base-100 bg-base-100 hover:bg-base-content ease-in-out duration-[250ms] {$page
        .url.pathname === item.href
        ? '!text-base-100 !bg-base-content'
        : ''}"
      href={item.href}
      on:click={handleCloseDrawer}
    >
      <svelte:component this={item.icon} />{item.label}
    </a>
  {/if}
</li>
