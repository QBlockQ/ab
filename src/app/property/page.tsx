'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, FileCheck2, Search } from "lucide-react"
import Link from "next/link"

export default function PropertyPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Property Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage and verify your real estate properties
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Property Verification Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5" />
                Property Verification
              </CardTitle>
              <CardDescription>
                Verify property deeds with the Ministry of Justice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Authenticate and verify property details using official MOJ records.
                Get comprehensive information about ownership, boundaries, and legal status.
              </p>
              <Link href="/property/verify">
                <Button>
                  Verify Property
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Property Search Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Browse Properties
              </CardTitle>
              <CardDescription>
                Search and explore available properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Browse through our curated list of tokenized properties.
                Filter by location, price, and other characteristics.
              </p>
              <Link href="/property/search">
                <Button variant="outline">
                  Search Properties
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
              Property Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Total Properties</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Verified Properties</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Available for Investment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
