import Image from 'next/image'
import { DeedDetails } from '@/components/ar/property/DeedDetails'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PropertyPage({ params }: { params: { id: string } }) {
  // This would normally come from an API or database
  const property = {
    id: params.id,
    title: 'فيلا فاخرة',
    location: 'الرياض، السعودية',
    price: '2,500,000',
    description: 'فيلا فاخرة مع إطلالات رائعة ومرافق عصرية في موقع متميز.',
    features: ['مسبح', 'حديقة خاصة', 'نظام ذكي', 'نظام أمني'],
    image: '/images/property1.jpg',
    deed: {
      deedNumber: '123456789',
      ownerName: 'عبدالله محمد',
      propertyType: 'فيلا فاخرة',
      location: 'الرياض، السعودية',
      area: '1000',
      value: '2,500,000',
      status: 'verified' as const,
    }
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{property.location}</p>
            <div className="mt-4">
              <Badge variant="secondary" className="text-lg">
                {property.price} ريال
              </Badge>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">الوصف</h2>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">المميزات</h2>
            <ul className="grid grid-cols-2 gap-4">
              {property.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="ml-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Button size="lg">
              تواصل مع المالك
            </Button>
            <Button size="lg" variant="outline">
              جدولة معاينة
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">تفاصيل الصك</h2>
          <DeedDetails {...property.deed} />
        </div>
      </div>
    </div>
  )
}
