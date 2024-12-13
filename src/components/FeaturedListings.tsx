'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
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
    title: 'Luxury Penthouse',
    location: 'New York, NY',
    price: '8,500,000',
    image: '/images/featured1.jpg',
    description: 'Stunning penthouse with panoramic views of Manhattan skyline',
    investmentReturn: '12.5',
  },
  {
    id: 2,
    title: 'Waterfront Estate',
    location: 'Los Angeles, CA',
    price: '12,800,000',
    image: '/images/featured2.jpg',
    description: 'Exclusive beachfront property with private access',
    investmentReturn: '15.2',
  },
]

export default function FeaturedListings() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Featured Properties
          </h2>
          <p className="mt-4 text-lg text-foreground-70">
            Discover our handpicked selection of premium real estate investments
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featuredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="group relative overflow-hidden rounded-2xl bg-background border border-foreground/10 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <Card>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription>{property.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">${property.price}</p>
                  <p className="mt-2 text-foreground-70">{property.location}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-foreground-70">Expected Return:</span>
                      <span className="font-semibold text-stacks-purple">{property.investmentReturn}%</span>
                    </div>
                    <span className="rounded-full bg-stacks-purple bg-opacity-10 px-4 py-1 text-sm font-medium text-stacks-purple">
                      Featured
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
