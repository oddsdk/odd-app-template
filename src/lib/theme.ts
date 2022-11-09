import { browser } from '$app/environment'

export type Theme = 'light' | 'dark' | 'default'

export const getSystemDefaultTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const loadTheme = (): Theme => {
  if (browser) {
    const browserTheme = localStorage.getItem('theme') as Theme
    const osTheme = getSystemDefaultTheme()

    return browserTheme ?? (osTheme as Theme) ?? 'light'
  }
}

export const storeTheme = (theme: Theme): void => {
  if (browser) {
    localStorage.setItem('theme', theme)
  }
}
