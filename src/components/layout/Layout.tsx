import { ThemeProvider } from "@/components/theme-provider"
import { NavigationMenu } from "./navigation-menu"

export function Layout({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <NavigationMenu />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
} 