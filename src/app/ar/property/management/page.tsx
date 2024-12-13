'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, Search, BarChart3 } from "lucide-react"
import Link from 'next/link'

export default function PropertyManagement() {
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">إدارة العقارات</h1>
        <p className="text-xl text-muted-foreground">
          إدارة وتوثيق عقاراتك
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-6 w-6" />
              <span>توثيق العقارات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              توثيق وتحقق من تفاصيل العقار باستخدام سجلات وزارة العدل الرسمية. احصل على معلومات شاملة عن الملكية والحدود والوضع القانوني.
            </p>
            <Link href="/ar/property/verification">
              <Button className="w-full">توثيق العقار</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6" />
              <span>تصفح العقارات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              تصفح قائمتنا المنتقاة من العقارات المحولة إلى رموز رقمية. تصفية حسب الموقع والسعر والخصائص الأخرى.
            </p>
            <Button className="w-full">البحث عن العقارات</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <span>إحصائيات العقارات</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <h3 className="text-3xl font-bold">0</h3>
              <p className="text-muted-foreground">إجمالي العقارات</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <h3 className="text-3xl font-bold">0</h3>
              <p className="text-muted-foreground">العقارات الموثقة</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <h3 className="text-3xl font-bold">0</h3>
              <p className="text-muted-foreground">المتاح للاستثمار</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
