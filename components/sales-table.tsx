"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generateSalesData } from "@/lib/data"
import { format } from "date-fns"
import { ArrowUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SalesTableProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function SalesTable({ dateRange }: SalesTableProps) {
  const salesData = generateSalesData(dateRange.from, dateRange.to)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  } | null>(null)

  // Filter data based on search term
  const filteredData = salesData.filter(
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort data based on sort config
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig

    if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
      return direction === "ascending" ? -1 : 1
    }
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
      return direction === "ascending" ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>Your most recent transactions</CardDescription>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sales..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("date")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Date
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("product")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Product
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("customer")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Customer
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("amount")}
                  className="flex items-center gap-1 p-0 font-medium ml-auto"
                >
                  Amount
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.slice(0, 5).map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{format(new Date(sale.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sale.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : sale.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

