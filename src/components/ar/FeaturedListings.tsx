'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

const featuredProperties = [
  {
    id: 1,
    title: 'برج فاخر',
    location: 'الرياض، السعودية',
    price: '8,500,000',
    image: '/images/featured1.jpg',
    description: 'برج سكني فاخر مع إطلالات بانورامية على مدينة الرياض',
    investmentReturn: '12.5',
  },
  {
    id: 2,
    title: 'مجمع سكني راقي',
    location: 'جدة، السعودية',
    price: '12,800,000',
    image: '/images/featured2.jpg',
    description: 'مجمع سكني حصري مع إطلالة مباشرة على البحر',
    investmentReturn: '15.2',
  },
]

export default function FeaturedListingsArabic() {
  return (
    <section className="bg-background" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-right">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            العقارات المميزة
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            اكتشف مجموعتنا المختارة من الاستثمارات العقارية الفاخرة
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featuredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/ar/property/${property.id}`}
              className="group relative"
            >
              <Card className="h-full overflow-hidden transition-all hover:border-primary">
                <div
                  className="relative h-64 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.image})` }}
                />
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">{property.title}</CardTitle>
                    <Badge variant="outline">{property.location}</Badge>
                  </div>
                  <CardDescription>{property.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">السعر</p>
                      <p className="text-2xl font-bold">{property.price} ريال</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">العائد المتوقع</p>
                      <p className="text-2xl font-bold">{property.investmentReturn}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="px-4 py-2">عرض التفاصيل</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
