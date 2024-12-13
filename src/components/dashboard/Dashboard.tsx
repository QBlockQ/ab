import { PropertyPortfolio } from "./PropertyPortfolio"
import { TransactionHistory } from "./TransactionHistory"
import { Analytics } from "./Analytics"

export function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <PropertyPortfolio className="col-span-8" />
      <TransactionHistory className="col-span-4" />
      <Analytics className="col-span-12" />
    </div>
  )
} 