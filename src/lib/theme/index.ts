import { browser } from '$app/env'

export type Theme = 'light' | 'dark'

export const loadTheme = (): Theme => {
  if (browser) {
    return localStorage.getItem('theme') as Theme ?? 'dark'
  }
}

export const storeTheme = (theme: Theme): void => {
  if (browser) {
    localStorage.setItem('theme', theme)
  }
}

