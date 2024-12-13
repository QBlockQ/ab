'use client'

import { DeedResponse } from '@/types/moj'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DeedDetailsProps {
  data: DeedResponse
}

export function DeedDetails({ data }: DeedDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Basic Deed Information */}
      <Card>
        <CardHeader>
          <CardTitle>Deed Information</CardTitle>
          <CardDescription>Official deed details from Ministry of Justice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Deed Number</h4>
              <p className="text-lg font-semibold">{data.deedDetails.deedNumber}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <Badge 
                variant={data.deedStatus === 'active' ? 'default' : 'destructive'}
                className="mt-1"
              >
                {data.deedStatus}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Issue Date</h4>
              <p className="text-lg">{data.deedDetails.deedDate}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Serial Number</h4>
              <p className="text-lg">{data.deedDetails.deedSerial}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Physical characteristics and measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Area</h4>
                <p className="text-lg font-semibold">{data.deedInfo.deedAreaText}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                <p className="text-lg">{data.courtDetails.deedCity}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Property Status</h4>
              <div className="grid grid-cols-2 gap-4">
                <Badge variant={!data.deedInfo.isRealEstateConstrained ? 'outline' : 'destructive'}>
                  {data.deedInfo.isRealEstateConstrained ? 'Constrained' : 'Not Constrained'}
                </Badge>
                <Badge variant={!data.deedInfo.isRealEstateMortgaged ? 'outline' : 'destructive'}>
                  {data.deedInfo.isRealEstateMortgaged ? 'Mortgaged' : 'Not Mortgaged'}
                </Badge>
                <Badge variant={!data.deedInfo.isRealEstateHalted ? 'outline' : 'destructive'}>
                  {data.deedInfo.isRealEstateHalted ? 'Halted' : 'Not Halted'}
                </Badge>
                <Badge variant={!data.deedInfo.isRealEstateTestamented ? 'outline' : 'destructive'}>
                  {data.deedInfo.isRealEstateTestamented ? 'Testamented' : 'Not Testamented'}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Property Boundaries</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">North</p>
                  <p className="font-medium">{data.deedLimitsDetails.northLimitName}</p>
                  <p className="text-sm">{data.deedLimitsDetails.northLimitDescription}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Length: {data.deedLimitsDetails.northLimitLengthChar}
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">South</p>
                  <p className="font-medium">{data.deedLimitsDetails.southLimitName}</p>
                  <p className="text-sm">{data.deedLimitsDetails.southLimitDescription}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Length: {data.deedLimitsDetails.southLimitLengthChar}
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">East</p>
                  <p className="font-medium">{data.deedLimitsDetails.eastLimitName}</p>
                  <p className="text-sm">{data.deedLimitsDetails.eastLimitDescription}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Length: {data.deedLimitsDetails.eastLimitLengthChar}
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">West</p>
                  <p className="font-medium">{data.deedLimitsDetails.westLimitName}</p>
                  <p className="text-sm">{data.deedLimitsDetails.westLimitDescription}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Length: {data.deedLimitsDetails.westLimitLengthChar}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owner Information */}
      <Card>
        <CardHeader>
          <CardTitle>Ownership Details</CardTitle>
          <CardDescription>Current property owners and their shares</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.ownerDetails.map((owner, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Owner Name</h4>
                    <p className="text-lg font-semibold">{owner.ownerName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Nationality</h4>
                    <p className="text-lg">{owner.nationality}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Ownership Share</h4>
                    <p className="text-lg">{owner.owningAmount}%</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Area Owned</h4>
                    <p className="text-lg">{owner.owningArea} m²</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
