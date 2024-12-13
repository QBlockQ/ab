'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { WalletConnect } from '@/components/auth/WalletConnect'
import { LanguageMenu } from '@/components/ui/language-menu'

export default function Navigation() {
  const pathname = usePathname()
  const isArabic = pathname?.startsWith('/ar')

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href={isArabic ? "/ar" : "/"} className="text-xl font-bold">
          AB Real Estate
        </Link>
        <div className="flex items-center">
          {isArabic ? (
            <nav className="flex items-center gap-6">
              <Link href="/ar" className="text-foreground/60 hover:text-foreground">
                الرئيسية
              </Link>
              <Link href="/ar/property" className="text-foreground/60 hover:text-foreground">
                العقارات
              </Link>
              <Link href="/ar/profile" className="text-foreground/60 hover:text-foreground">
                الملف الشخصي
              </Link>
              <WalletConnect buttonText={isArabic ? "ربط المحفظة" : "Connect Wallet"} className="ml-4" />
            </nav>
          ) : (
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-foreground/60 hover:text-foreground">
                Home
              </Link>
              <Link href="/property" className="text-foreground/60 hover:text-foreground">
                Properties
              </Link>
              <Link href="/profile" className="text-foreground/60 hover:text-foreground">
                Profile
              </Link>
              <WalletConnect buttonText={isArabic ? "ربط المحفظة" : "Connect Wallet"} className="ml-4" />
            </nav>
          )}
          <div className="flex items-center space-x-6">
            <LanguageMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
