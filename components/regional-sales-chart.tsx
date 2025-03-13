"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "North America", value: 35 },
  { name: "Europe", value: 30 },
  { name: "Asia Pacific", value: 25 },
  { name: "Latin America", value: 7 },
  { name: "Middle East", value: 3 },
]

const COLORS = ["#2563eb", "#16a34a", "#eab308", "#f97316", "#8b5cf6"]

export function RegionalSalesChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Regional Sales</CardTitle>
        <CardDescription>Sales distribution by region</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="font-bold">{payload[0].name}</span>
                        <span className="text-muted-foreground">{payload[0].value}% of total sales</span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

