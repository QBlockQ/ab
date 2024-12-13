'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, MapPin, Ruler } from "lucide-react"

interface Property {
  id: string
  title: string
  location: string
  price: string
  description: string
  image: string
  status: string
  deed: {
    number: string
    verified: boolean
    area: string
    type: string
  }
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  if (!property) {
    return null
  }

  return (
    <Link href={`/ar/property/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-48 object-cover"
          />
          {property.deed.verified && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
              <CheckCircle className="w-4 h-4 ml-1" />
              صك موثق
            </div>
          )}
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Home className="w-4 h-4 ml-1" />
                {property.title}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <MapPin className="w-4 h-4 ml-1" />
                {property.location}
              </p>
            </div>
            <Badge variant="secondary">{property.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {property.description}
            </p>
            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">السعر</p>
                <p className="text-lg font-semibold">{property.price} ريال</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground flex items-center justify-end">
                  <Ruler className="w-4 h-4 mr-1" />
                  المساحة
                </p>
                <p className="text-lg font-semibold">{property.deed.area} م²</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
