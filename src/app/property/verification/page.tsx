'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function PropertyVerification() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2">Property Verification & Tokenization</h1>
      <p className="text-muted-foreground mb-8">Verify and tokenize your property on the Bitcoin blockchain</p>

      <div className="space-y-6">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
          <h3 className="font-semibold">Verification Successful</h3>
          <p>The deed has been successfully verified. You can now proceed with tokenization.</p>
        </div>

        {/* Verification Form */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Deed Number</label>
                <Input placeholder="Enter deed number" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ID Number</label>
                <Input placeholder="Enter ID number" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ID Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National ID</SelectItem>
                    <SelectItem value="iqama">Iqama</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Verify Deed</Button>
            </div>
          </CardContent>
        </Card>

        {/* Deed Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Deed Information</h2>
            <p className="text-sm text-muted-foreground mb-6">Official deed details from Ministry of Justice</p>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Deed Number</span>
                <span className="font-medium">330209003750</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline">active</Badge>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Issue Date</span>
                <span className="font-medium">2024-12-06T12:47:15.074Z</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Serial Number</span>
                <span className="font-medium">123456</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
            <p className="text-sm text-muted-foreground">Physical characteristics and measurements</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
