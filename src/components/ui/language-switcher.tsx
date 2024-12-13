'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  
  const isArabic = pathname.startsWith('/ar')
  
  const switchLanguage = () => {
    if (isArabic) {
      // Remove /ar from the path to go to English version
      const englishPath = pathname.replace(/^\/ar/, '') || '/'
      router.push(englishPath)
    } else {
      // Add /ar to the path to go to Arabic version
      router.push(`/ar${pathname}`)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchLanguage}
      className="relative"
      title={isArabic ? 'Switch to English' : 'التحويل للعربية'}
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">
        {isArabic ? 'Switch to English' : 'التحويل للعربية'}
      </span>
      <span className="absolute -bottom-1 -right-1 text-xs font-bold">
        {isArabic ? 'EN' : 'ع'}
      </span>
    </Button>
  )
}
