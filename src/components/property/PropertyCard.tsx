import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Property {
  id: string
  address: string
  status: string
  description: string
  image: string
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  if (!property) {
    return null
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <img src={property.image} alt={property.address} className="rounded-lg" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{property.address}</h3>
          <Badge>{property.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{property.description}</p>
        <div className="mt-4">
          <Button className="w-full">عرض التفاصيل</Button>
        </div>
      </CardContent>
    </Card>
  )
}