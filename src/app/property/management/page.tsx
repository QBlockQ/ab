'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, Search, BarChart3 } from "lucide-react"
import Link from 'next/link'

export default function PropertyManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Property Management</h1>
        <p className="text-xl text-muted-foreground">
          Manage and verify your real estate properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-6 w-6" />
              <span>Property Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Authenticate and verify property details using official MOJ records. Get comprehensive information about ownership, boundaries, and legal status.
            </p>
            <Link href="/property/verification" passHref>
              <Button className="w-full">Verify Property</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6" />
              <span>Browse Properties</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Browse through our curated list of tokenized properties. Filter by location, price, and other characteristics.
            </p>
            <Button className="w-full">Search Properties</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <span>Property Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold">0</h3>
              <p className="text-muted-foreground">Total Properties</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold">0</h3>
              <p className="text-muted-foreground">Verified Properties</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold">0</h3>
              <p className="text-muted-foreground">Available for Investment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
