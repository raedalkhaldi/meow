import { ArrowDownIcon, ArrowUpIcon, DollarSign, Users, ShoppingCart, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateRevenueData } from "@/lib/data"

interface MetricsCardsProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function MetricsCards({ dateRange }: MetricsCardsProps) {
  // Generate mock data based on date range
  const data = generateRevenueData(dateRange)

  // Calculate total revenue
  const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0)

  // Mock data for other metrics
  const customerCount = Math.floor(Math.random() * 1000) + 500
  const orderCount = Math.floor(Math.random() * 500) + 100
  const averageOrderValue = totalRevenue / orderCount

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">12%</span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <h3 className="tracking-tight text-sm font-medium">Active Customers</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">{customerCount.toLocaleString()}</p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">8%</span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <h3 className="tracking-tight text-sm font-medium">Total Orders</h3>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">{orderCount.toLocaleString()}</p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
              <span className="text-red-500">4%</span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <h3 className="tracking-tight text-sm font-medium">Average Order Value</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">2%</span>
              <span>from last month</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

