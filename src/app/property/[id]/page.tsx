'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useConnect } from '@stacks/connect-react'
import { StacksMainnet } from '@stacks/network'
import {
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
  uintCV,
} from '@stacks/transactions'

interface PropertyDetails {
  id: string
  title: string
  location: string
  price: number
  returns: string
  image: string
  description: string
  amenities: string[]
  fractions: {
    total: number
    available: number
    pricePerFraction: number
  }
}

// Mock data - replace with actual API call
const getMockPropertyDetails = (id: string): PropertyDetails => ({
  id,
  title: 'Luxury Villa',
  location: 'Miami Beach, FL',
  price: 2500000,
  returns: '8.5% Annual',
  image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  description: 'Stunning beachfront property with modern amenities and spectacular ocean views.',
  amenities: ['Pool', 'Beach Access', 'Smart Home', 'Security System'],
  fractions: {
    total: 1000,
    available: 850,
    pricePerFraction: 2500,
  },
})

export default function PropertyDetails() {
  const params = useParams()
  const { userSession } = useConnect()
  const [property, setProperty] = useState<PropertyDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Replace with actual API call
    const propertyDetails = getMockPropertyDetails(params.id as string)
    setProperty(propertyDetails)
  }, [params.id])

  const handlePurchaseFraction = async () => {
    if (!userSession?.isUserSignedIn?.()) {
      setError('Please connect your wallet first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const network = new StacksMainnet()
      const address = userSession?.loadUserData()?.profile.stxAddress.mainnet
      
      // Replace with your actual contract details
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      const contractName = process.env.NEXT_PUBLIC_CONTRACT_NAME
      
      const functionArgs = [
        stringUtf8CV(property.id),
        uintCV(1), // number of fractions to purchase
      ]

      const options = {
        contractAddress,
        contractName,
        functionName: 'purchase-fraction',
        functionArgs,
        network,
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Allow,
        onFinish: (result) => {
          console.log('Transaction:', result)
          setLoading(false)
        },
        onCancel: () => {
          setError('Transaction cancelled')
          setLoading(false)
        }
      }

      await window.StacksProvider.transact(options)
    } catch (err) {
      setError(err.message || 'Failed to purchase fraction')
      setLoading(false)
    }
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Property Image */}
            <div className="relative h-96 lg:h-full">
              <img
                src={property.image}
                alt={property.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="mt-2 text-lg text-gray-600">{property.location}</p>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">Investment Details</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Property Value</p>
                    <p className="text-lg font-semibold">${property.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Expected Returns</p>
                    <p className="text-lg font-semibold text-emerald-600">{property.returns}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">Fractional Ownership</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Available Fractions</p>
                    <p className="text-lg font-semibold">
                      {property.fractions.available} / {property.fractions.total}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Price per Fraction</p>
                    <p className="text-lg font-semibold">
                      ${property.fractions.pricePerFraction.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900">About this property</h2>
                <p className="mt-4 text-gray-600">{property.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-emerald-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="ml-2 text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handlePurchaseFraction}
                  disabled={loading}
                  className="w-full bg-stacks-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Purchase Fraction'}
                </button>
                {error && (
                  <p className="mt-2 text-red-600 text-sm">{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
