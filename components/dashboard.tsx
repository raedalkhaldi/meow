"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MetricsCards } from "@/components/metrics-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { SalesTable } from "@/components/sales-table"
import { UserActivityChart } from "@/components/user-activity-chart"
import { RegionalSalesChart } from "@/components/regional-sales-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

export default function Dashboard() {
  const [date, setDate] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics Dashboard" text="View and analyze your business performance metrics.">
        <DateRangePicker date={date} setDate={setDate} />
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCards dateRange={{ from: date?.from || new Date(), to: date?.to || new Date() }} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RevenueChart dateRange={{ from: date?.from || new Date(), to: date?.to || new Date() }} />
        </div>
        <div className="col-span-3">
          <RegionalSalesChart />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <SalesTable dateRange={{ from: date?.from || new Date(), to: date?.to || new Date() }} />
        </div>
        <div className="col-span-3">
          <UserActivityChart dateRange={{ from: date?.from || new Date(), to: date?.to || new Date() }} />
        </div>
      </div>
    </DashboardShell>
  )
}

