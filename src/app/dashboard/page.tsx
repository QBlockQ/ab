'use client'

import { useState, useEffect } from 'react'
import { useConnect } from '@stacks/connect-react'
import { StacksMainnet } from '@stacks/network'
import { callReadOnlyFunction, cvToValue } from '@stacks/transactions'

interface Investment {
  propertyId: string
  title: string
  location: string
  fractions: number
  value: number
  returns: string
  image: string
}

// Mock data - replace with actual contract calls
const mockInvestments: Investment[] = [
  {
    propertyId: '1',
    title: 'Luxury Villa',
    location: 'Miami Beach, FL',
    fractions: 10,
    value: 25000,
    returns: '8.5% Annual',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  },
  {
    propertyId: '2',
    title: 'Modern Apartment Complex',
    location: 'Austin, TX',
    fractions: 5,
    value: 12500,
    returns: '7.2% Annual',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
  },
]

export default function Dashboard() {
  const { userSession } = useConnect()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!userSession?.isUserSignedIn?.()) {
        setLoading(false)
        return
      }

      try {
        // Replace with actual contract call
        const network = new StacksMainnet()
        const address = userSession.loadUserData().profile.stxAddress.mainnet
        
        // Example contract call (replace with your actual contract)
        // const result = await callReadOnlyFunction({
        //   contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        //   contractName: process.env.NEXT_PUBLIC_CONTRACT_NAME,
        //   functionName: 'get-user-investments',
        //   functionArgs: [],
        //   network,
        //   senderAddress: address,
        // })
        
        // For now, use mock data
        setInvestments(mockInvestments)
        setTotalValue(mockInvestments.reduce((sum, inv) => sum + inv.value, 0))
      } catch (err) {
        console.error('Failed to fetch investments:', err)
      }
      
      setLoading(false)
    }

    fetchInvestments()
  }, [userSession])

  if (!userSession?.isUserSignedIn?.()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Please Connect Your Wallet</h1>
          <p className="mt-2 text-gray-600">Connect your wallet to view your investments</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investment Dashboard</h1>
          <div className="mt-4 bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900">Portfolio Value</h2>
                <p className="mt-2 text-3xl font-bold text-stacks-purple">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900">Properties Owned</h2>
                <p className="mt-2 text-3xl font-bold text-stacks-purple">
                  {investments.length}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900">Total Fractions</h2>
                <p className="mt-2 text-3xl font-bold text-stacks-purple">
                  {investments.reduce((sum, inv) => sum + inv.fractions, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Properties</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {investments.map((investment) => (
              <div key={investment.propertyId} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32">
                    <img
                      src={investment.image}
                      alt={investment.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {investment.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{investment.location}</p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Fractions Owned</p>
                        <p className="text-lg font-semibold">{investment.fractions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Investment Value</p>
                        <p className="text-lg font-semibold">
                          ${investment.value.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expected Returns</p>
                        <p className="text-lg font-semibold text-emerald-600">
                          {investment.returns}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
