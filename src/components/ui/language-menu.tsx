'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageMenu() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)
  const isArabic = pathname?.startsWith('/ar')

  // Prevent hydration mismatch by mounting after initial render
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
        <span className="text-sm font-medium">...</span>
      </button>
    )
  }

  const getOtherLanguagePath = () => {
    if (!pathname) return isArabic ? '/' : '/ar'
    return isArabic ? pathname.replace(/^\/ar/, '') || '/' : `/ar${pathname}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
        <span className="text-sm font-medium">
          {isArabic ? 'العربية' : 'English'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2"
        >
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={getOtherLanguagePath()} className="w-full">
            {isArabic ? 'English' : 'العربية'}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
