'use client'

import React from 'react'
import { ThemeProvider } from '@/components/providers/theme-provider'
import Navigation from '@/components/layout/Navigation'

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </ThemeProvider>
  )
}
