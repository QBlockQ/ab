'use client'

import Link from 'next/link'

export default function HeroArabic() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent block">
              تداول العقارات الرقمي
            </span>
            <span className="text-3xl sm:text-5xl lg:text-6xl text-muted-foreground mt-4 block">
              باستخدام البلوكتشين في{' '}
              <span className="text-green-600">المملكة العربية السعودية</span>
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            فرص استثمارية آمنة وشفافة
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#featured"
              className="rounded-md bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              عرض العقارات
            </Link>
            <Link href="#learn" className="text-base font-semibold leading-6 text-muted-foreground hover:text-blue-600">
              اعرف المزيد <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
