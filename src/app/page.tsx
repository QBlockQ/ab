import Hero from '@/components/Hero'
import FeaturedListings from '@/components/FeaturedListings'
import PropertyGrid from '@/components/property/PropertyGrid'
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedListings />
      <PropertyGrid />
      <HowItWorks />
    </main>
  )
}