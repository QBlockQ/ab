'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, FileCheck2, Search } from "lucide-react"
import Link from "next/link"
import { PropertyCard } from '@/components/property/PropertyCard'

const properties = [
  {
    id: '1',
    address: 'برج سكني فاخر، الرياض',
    status: 'متاح',
    description: 'برج سكني حديث في قلب مدينة الرياض',
    image: '/images/property1.jpg',
  },
  {
    id: '2',
    address: 'مجمع تجاري، جدة',
    status: 'متاح',
    description: 'مجمع تجاري استراتيجي في منطقة حيوية',
    image: '/images/property2.jpg',
  },
  {
    id: '3',
    address: 'فيلا مودرن، الدمام',
    status: 'متاح',
    description: 'فيلا عصرية بتصميم فريد وإطلالة بحرية',
    image: '/images/property3.jpg',
  },
]

export default function PropertyPageArabic() {
  return (
    <div className="container mx-auto py-8" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">إدارة العقارات</h1>
          <p className="text-muted-foreground mt-2">
            إدارة وتوثيق عقاراتك
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Property Verification Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5" />
                توثيق العقارات
              </CardTitle>
              <CardDescription>
                توثيق صكوك العقارات مع وزارة العدل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                توثيق وتحقق من تفاصيل العقار باستخدام سجلات وزارة العدل الرسمية.
                احصل على معلومات شاملة عن الملكية والحدود والوضع القانوني.
              </p>
              <Link href="/ar/property/verify">
                <Button>
                  توثيق العقار
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Property Search Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                تصفح العقارات
              </CardTitle>
              <CardDescription>
                البحث واستكشاف العقارات المتاحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                تصفح قائمتنا المنتقاة من العقارات المحولة إلى رموز رقمية.
                تصفية حسب الموقع والسعر والخصائص الأخرى.
              </p>
              <Link href="/ar/property/search">
                <Button variant="outline">
                  البحث عن العقارات
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Property Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              إحصائيات العقارات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">إجمالي العقارات</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">العقارات الموثقة</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">المتاح للاستثمار</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}
