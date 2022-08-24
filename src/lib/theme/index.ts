import { browser } from '$app/env'

export type Theme = 'light' | 'dark'

export const loadTheme = (): Theme => {
  if (browser) {
    const browserTheme = localStorage.getItem('theme') as Theme
    const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    return browserTheme ?? (osTheme as Theme) ?? 'light'
  }
}

export const storeTheme = (theme: Theme): void => {
  if (browser) {
    localStorage.setItem('theme', theme)
  }
}
