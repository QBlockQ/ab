import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AB - منصة تداول العقارات الرقمية',
  description: 'منصة استثمار عقاري تجزيئي مدعومة بتقنية بلوكتشين ستاكس',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
} as const
