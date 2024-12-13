'use client'

import * as React from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

const ThemeContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with light theme
  const [theme, setTheme] = React.useState<Theme>('light')

  // Effect to handle theme changes
  React.useEffect(() => {
    const root = window.document.documentElement
    const savedTheme = localStorage.getItem('theme') as Theme

    // Only apply dark theme if explicitly saved
    if (savedTheme === 'dark') {
      root.classList.remove('light')
      root.classList.add('dark')
      setTheme('dark')
    } else {
      // Default to light theme
      root.classList.remove('dark')
      root.classList.add('light')
      setTheme('light')
    }
  }, [])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newTheme)
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
    },
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
