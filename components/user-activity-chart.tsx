"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateUserActivityData } from "@/lib/data"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface UserActivityChartProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function UserActivityChart({ dateRange }: UserActivityChartProps) {
  const data = generateUserActivityData(dateRange.from, dateRange.to)

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Active users by time of day</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Time</span>
                        <span className="font-bold text-muted-foreground">{payload[0].payload.hour}:00</span>
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Active Users</span>
                        <span className="font-bold">{payload[0].value}</span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

