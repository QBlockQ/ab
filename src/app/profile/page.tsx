'use client'

import { UserProfile } from '@/components/auth/UserProfile'
import { WalletConnect } from '@/components/auth/WalletConnect'

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-end">
        <WalletConnect />
      </div>
      <UserProfile />
    </div>
  )
}
