import { browser } from '$app/environment'

export type ThemeOptions = 'light' | 'dark'

export type Theme = {
  selectedTheme: ThemeOptions
  useDefault: boolean
}

export const DEFAULT_THEME_KEY = 'useDefaultTheme'
export const THEME_KEY = 'theme'

export const getSystemDefaultTheme = (): ThemeOptions =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const loadTheme = (): Theme => {
  if (browser) {
    const useDefault = localStorage.getItem(DEFAULT_THEME_KEY) !== 'undefined' && JSON.parse(localStorage.getItem(DEFAULT_THEME_KEY))
    const browserTheme = localStorage.getItem(THEME_KEY) as ThemeOptions
    const osTheme = getSystemDefaultTheme()

    if (useDefault) {
      return {
        selectedTheme: getSystemDefaultTheme(),
        useDefault,
      }
    }

    return {
      selectedTheme: browserTheme ?? (osTheme as ThemeOptions) ?? 'light',
      useDefault,
    }
  }
}

export const storeTheme = (theme: ThemeOptions): void => {
  if (browser) {
    localStorage.setItem('theme', theme)
  }
}
