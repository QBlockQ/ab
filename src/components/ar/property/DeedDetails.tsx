'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

interface DeedDetailsProps {
  deedNumber: string
  ownerName: string
  propertyType: string
  location: string
  area: string
  value: string
  status: 'pending' | 'verified' | 'rejected'
}

const statusMessages = {
  pending: {
    title: 'قيد المراجعة',
    description: 'صك العقار قيد المراجعة والتحقق',
    variant: 'default' as const,
  },
  verified: {
    title: 'تم التحقق',
    description: 'تم التحقق من صك العقار بنجاح',
    variant: 'default' as const,
  },
  rejected: {
    title: 'مرفوض',
    description: 'لم يتم التحقق من صك العقار',
    variant: 'destructive' as const,
  },
}

export function DeedDetails({
  deedNumber,
  ownerName,
  propertyType,
  location,
  area,
  value,
  status,
}: DeedDetailsProps) {
  const statusMessage = statusMessages[status]

  return (
    <div className="space-y-6">
      <Alert variant={statusMessage.variant}>
        <AlertTitle>{statusMessage.title}</AlertTitle>
        <AlertDescription>{statusMessage.description}</AlertDescription>
      </Alert>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium">رقم الصك</h3>
            <p className="mt-1">{deedNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">اسم المالك</h3>
            <p className="mt-1">{ownerName}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium">نوع العقار</h3>
          <div className="mt-1 flex gap-2">
            <Badge variant="secondary">{propertyType}</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium">الموقع</h3>
          <p className="mt-1">{location}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium">المساحة</h3>
            <p className="mt-1">{area} متر مربع</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">القيمة التقديرية</h3>
            <p className="mt-1">{value} ريال</p>
          </div>
        </div>
      </div>
    </div>
  )
}
