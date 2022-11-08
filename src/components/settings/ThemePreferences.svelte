<script lang="ts">
  import { themeStore } from '$src/stores'
  import { storeTheme, type Theme } from '$lib/theme'

  const options = [
    {
      label: 'Dark',
      value: 'dark'
    },
    {
      label: 'Light',
      value: 'light'
    }
  ]

  let selected = $themeStore

  themeStore.subscribe((updatedTheme) => {
    selected = updatedTheme
  })

  const setTheme = (newTheme: Theme) => {
    themeStore.set(newTheme)
    storeTheme(newTheme)
  }

  $: if (selected) {
    setTheme(selected)
  }
</script>

<h3 class="text-lg mb-4">Theme preference</h3>

{#each options as option}
  <div class="form-control items-start">
    <label class="label cursor-pointer">
      <input
        type="radio"
        name="theme-preference"
        class="radio checked:bg-base-content"
        value={option.value}
        checked={selected === option.value}
        bind:group={selected}
      />
      <span class="label-text text-sm ml-2">{option.label}</span>
    </label>
  </div>
{/each}
