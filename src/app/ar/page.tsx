import '@/styles/arabic.css'
import Hero from '@/components/ar/Hero'
import FeaturedListings from '@/components/ar/FeaturedListings'
import PropertyGrid from '@/components/ar/property/PropertyGrid'
import HowItWorks from '@/components/ar/HowItWorks'

export default function ArabicHome() {
  return (
    <main>
      <Hero />
      <FeaturedListings />
      <PropertyGrid />
      <HowItWorks />
    </main>
  )
}
