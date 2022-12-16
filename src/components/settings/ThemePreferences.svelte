<script lang="ts">
  import { themeStore } from '$src/stores'
  import { getSystemDefaultTheme, storeTheme, DEFAULT_THEME_KEY, type Theme, type ThemeOptions } from '$lib/theme'

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

  const defaultTheme = getSystemDefaultTheme()
  let selected = $themeStore.selectedTheme
  let useDefault = $themeStore.useDefault

  themeStore.subscribe((updatedTheme) => {
    selected = updatedTheme.selectedTheme
    useDefault = updatedTheme.useDefault
  })

  const setTheme = ({ selectedTheme, useDefault }: Theme) => {
    themeStore.set({
      ...$themeStore,
      selectedTheme,
      useDefault,
    })
    storeTheme(selectedTheme)
  }

  $: if (selected) {
    setTheme({ selectedTheme: selected, useDefault })
  }

  const setDefaultThemePreference = (): void => {
    localStorage.setItem(DEFAULT_THEME_KEY, `${useDefault}`)

    if (useDefault) {
      setTheme({ selectedTheme: defaultTheme, useDefault })
    }
  }

  $: useDefault !== null && setDefaultThemePreference()
</script>

<div class="flex flex-col gap-4">
  <h3 class="text-lg">Theme preference</h3>

  <p>
    Your theme preference is saved per device. Any newly connected device will
    adopt the preference from the device it was connected by.
  </p>

  <div>
    <div class="form-control items-start">
      <label class="label cursor-pointer">
        <input
          type="checkbox"
          name="use-default-theme"
          class="checkbox checked:bg-base-content"
          bind:checked={useDefault}
        />
        <span class="label-text text-sm ml-2">Use system default</span>
      </label>
    </div>
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
            disabled={useDefault}
          />
          <span class="label-text text-sm ml-2">{option.label}</span>
        </label>
      </div>
    {/each}
  </div>
</div>
