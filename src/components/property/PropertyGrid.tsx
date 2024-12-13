'use client'

import Link from 'next/link'

// Mock property data
const properties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    location: 'San Francisco, CA',
    price: '2,500,000',
    image: '/images/property1.jpg',
    tokenPrice: '100',
    totalTokens: '25,000',
    availableTokens: '15,000',
  },
  {
    id: 2,
    title: 'Luxury Beachfront Villa',
    location: 'Miami Beach, FL',
    price: '5,800,000',
    image: '/images/property2.jpg',
    tokenPrice: '200',
    totalTokens: '29,000',
    availableTokens: '20,000',
  },
  {
    id: 3,
    title: 'Mountain View Residence',
    location: 'Denver, CO',
    price: '1,800,000',
    image: '/images/property3.jpg',
    tokenPrice: '75',
    totalTokens: '24,000',
    availableTokens: '18,000',
  },
]

export default function PropertyGrid() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Link 
              key={property.id} 
              href={`/properties/${property.id}`}
              className="group relative overflow-hidden rounded-lg bg-background border border-foreground/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="aspect-w-16 aspect-h-9 relative h-48 w-full overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {property.title}
                </h3>
                <p className="mt-1 text-foreground-70">
                  {property.location}
                </p>
                <div className="mt-4 border-t border-foreground-10 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-foreground-70">Property Value</p>
                      <p className="text-lg font-bold text-stacks-purple">
                        ${property.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground-70">Token Price</p>
                      <p className="text-lg font-bold text-stacks-purple">
                        ${property.tokenPrice}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-foreground-70">
                      <span>Available Tokens</span>
                      <span>{property.availableTokens}/{property.totalTokens}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-foreground-10">
                      <div 
                        className="h-full rounded-full bg-stacks-purple"
                        style={{
                          width: `${(parseInt(property.availableTokens.replace(/,/g, '')) / 
                            parseInt(property.totalTokens.replace(/,/g, ''))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
