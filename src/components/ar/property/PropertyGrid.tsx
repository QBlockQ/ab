'use client'

import { PropertyCard } from './PropertyCard'

const properties = [
  {
    id: '1',
    title: 'برج سكني فاخر',
    location: 'الرياض، السعودية',
    price: '5,000,000',
    description: 'برج سكني حديث في قلب مدينة الرياض',
    image: '/images/property1.jpg',
    status: 'متاح',
    deed: {
      number: '123456789',
      verified: true,
      area: '500',
      type: 'سكني',
    },
  },
  {
    id: '2',
    title: 'مجمع تجاري',
    location: 'جدة، السعودية',
    price: '8,000,000',
    description: 'مجمع تجاري استراتيجي في منطقة حيوية',
    image: '/images/property2.jpg',
    status: 'متاح',
    deed: {
      number: '987654321',
      verified: true,
      area: '1200',
      type: 'تجاري',
    },
  },
  {
    id: '3',
    title: 'فيلا مودرن',
    location: 'الدمام، السعودية',
    price: '3,500,000',
    description: 'فيلا عصرية بتصميم فريد وإطلالة بحرية',
    image: '/images/property3.jpg',
    status: 'متاح',
    deed: {
      number: '456789123',
      verified: true,
      area: '400',
      type: 'سكني',
    },
  },
]

export default function PropertyGrid() {
  return (
    <section className="bg-background py-24" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            جميع العقارات
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            اكتشف مجموعة متنوعة من العقارات المميزة في مختلف المناطق
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
