'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function PropertyVerification() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl" dir="rtl">
      <h1 className="text-4xl font-bold mb-2">توثيق وتحويل العقار إلى رمز رقمي</h1>
      <p className="text-muted-foreground mb-8">توثيق وتحويل عقارك إلى رمز رقمي على شبكة البيتكوين</p>

      <div className="space-y-6">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
          <h3 className="font-semibold">تم التحقق بنجاح</h3>
          <p>تم التحقق من الصك بنجاح. يمكنك الآن المتابعة مع عملية التحويل إلى رمز رقمي.</p>
        </div>

        {/* Verification Form */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">رقم الصك</label>
                <Input placeholder="أدخل رقم الصك" dir="ltr" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">رقم الهوية</label>
                <Input placeholder="أدخل رقم الهوية" dir="ltr" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">نوع الهوية</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الهوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">الهوية الوطنية</SelectItem>
                    <SelectItem value="iqama">الإقامة</SelectItem>
                    <SelectItem value="passport">جواز السفر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">التحقق من الصك</Button>
            </div>
          </CardContent>
        </Card>

        {/* Deed Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">معلومات الصك</h2>
            <p className="text-sm text-muted-foreground mb-6">المعلومات الرسمية للصك من وزارة العدل</p>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">رقم الصك</span>
                <span className="font-medium">330209003750</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">الحالة</span>
                <Badge variant="outline">نشط</Badge>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">تاريخ الإصدار</span>
                <span className="font-medium" dir="ltr">2024-12-06T12:47:15.074Z</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">الرقم التسلسلي</span>
                <span className="font-medium">123456</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">تفاصيل العقار</h2>
            <p className="text-sm text-muted-foreground">الخصائص المادية والقياسات</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
