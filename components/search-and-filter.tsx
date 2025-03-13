"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, LayoutGrid, Search, TableIcon, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchAndFilterProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  filterStatus: string | null
  setFilterStatus: (value: string | null) => void
  filterEntity: string | null
  setFilterEntity: (value: string | null) => void
  filterLead: string | null
  setFilterLead: (value: string | null) => void
  statusOptions: string[]
  entityOptions: string[]
  leadOptions: string[]
  viewMode: "table" | "grid"
  setViewMode: (value: "table" | "grid") => void
}

export function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterEntity,
  setFilterEntity,
  filterLead,
  setFilterLead,
  statusOptions,
  entityOptions,
  leadOptions,
  viewMode,
  setViewMode,
}: SearchAndFilterProps) {
  const clearFilters = () => {
    setFilterStatus(null)
    setFilterEntity(null)
    setFilterLead(null)
  }

  const hasActiveFilters = filterStatus || filterEntity || filterLead

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search projects..."
          className="pl-8 neumorphic-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="neumorphic-button">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {hasActiveFilters && <span className="ml-1 rounded-full bg-primary w-2 h-2" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setFilterStatus(null)}
              className="flex items-center justify-between"
            >
              All statuses
            </DropdownMenuItem>
            {statusOptions.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setFilterStatus(status === filterStatus ? null : status)}
                className="flex items-center justify-between"
              >
                {status}
                {status === filterStatus && <span className="rounded-full bg-primary w-2 h-2" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Entity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {entityOptions.map((entity) => (
              <DropdownMenuItem
                key={entity}
                onClick={() => setFilterEntity(entity === filterEntity ? null : entity)}
                className="flex items-center justify-between"
              >
                {entity}
                {entity === filterEntity && <span className="rounded-full bg-primary w-2 h-2" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Lead</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {leadOptions.map((lead) => (
              <DropdownMenuItem
                key={lead}
                onClick={() => setFilterLead(lead === filterLead ? null : lead)}
                className="flex items-center justify-between"
              >
                {lead}
                {lead === filterLead && <span className="rounded-full bg-primary w-2 h-2" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearFilters} disabled={!hasActiveFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex border rounded-md overflow-hidden neumorphic-toggle">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="rounded-none border-0"
          >
            <TableIcon className="h-4 w-4" />
            <span className="sr-only">Table view</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-none border-0"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

