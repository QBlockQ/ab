import { Noto_Naskh_Arabic } from 'next/font/google'
import '../globals.css'
import '@/styles/arabic.css'
import { RootLayoutClient } from '@/components/layout/root-layout-client'

const notoNaskhArabic = Noto_Naskh_Arabic({ 
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-naskh-arabic',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${notoNaskhArabic.variable} font-naskh min-h-screen bg-background antialiased`}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
