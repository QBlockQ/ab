'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { userSession } from './WalletConnect'

type KYCStatus = 'not_started' | 'pending' | 'verified' | 'rejected'

interface UserData {
  fullName: string
  nationalId: string
  dateOfBirth: string
  address: string
  phone: string
  email: string
  kycStatus: KYCStatus
}

const defaultUserData: UserData = {
  fullName: '',
  nationalId: '',
  dateOfBirth: '',
  address: '',
  phone: '',
  email: '',
  kycStatus: 'not_started'
}

export function UserProfile() {
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit KYC data to backend
    setUserData(prev => ({ ...prev, kycStatus: 'pending' }))
    setIsEditing(false)
  }

  if (!userSession.isUserSignedIn()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Please connect your wallet to access your profile</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Complete your profile for KYC verification</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={userData.fullName}
                onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID</Label>
              <Input
                id="nationalId"
                value={userData.nationalId}
                onChange={(e) => setUserData(prev => ({ ...prev, nationalId: e.target.value }))}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) => setUserData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={userData.address}
                onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-sm ${
            userData.kycStatus === 'verified' ? 'bg-green-100 text-green-800' :
            userData.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            userData.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {userData.kycStatus.charAt(0).toUpperCase() + userData.kycStatus.slice(1)}
          </span>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
