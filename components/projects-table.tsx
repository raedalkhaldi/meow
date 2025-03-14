"use client"

import { useState } from "react"
import type { Project } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit, Eye, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProjectsTableProps {
  projects: Project[]
  onViewDetails: (project: Project) => void
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
  viewMode: "table" | "grid"
}

export function ProjectsTable({ projects, onViewDetails, onEdit, onDelete, viewMode }: ProjectsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project
    direction: "ascending" | "descending"
  } | null>(null)

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  const requestSort = (key: keyof Project) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedProjects = [...projects].sort((a, b) => {
    if (!sortConfig) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const handleDelete = (project: Project, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setProjectToDelete(project)
  }

  const confirmDelete = () => {
    if (projectToDelete) {
      onDelete(projectToDelete.id)
      setProjectToDelete(null)
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "on hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "completed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
    }
  }

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProjects.length === 0 ? (
            <div className="col-span-full text-center py-8 neumorphic-container">No projects found.</div>
          ) : (
            sortedProjects.map((project) => (
              <Card key={project.id} className="neumorphic-container overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg truncate">{project.name}</h3>
                      <Badge className={`${getStageColor(project.stage)}`}>{project.stage}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lead:</span>
                        <span className="font-medium">{project.lead}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Entity:</span>
                        <span className="font-medium">{project.entity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CAPEX:</span>
                        <span className="font-medium">{formatCurrency(Number(project.capex))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contract:</span>
                        <span className="font-medium">{project.contractLength} years</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t">
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-2 h-10"
                      onClick={() => onViewDetails(project)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-2 h-10 border-l"
                      onClick={() => onEdit(project)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-2 h-10 border-l text-destructive hover:text-destructive"
                      onClick={(e) => handleDelete(project, e)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project{" "}
                <span className="font-semibold">{projectToDelete?.name}</span> and all its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700"
              >
                Delete Project
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return (
    <>
      {viewMode === "table" ? (
        <div className="rounded-md border neumorphic-container overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <Button variant="ghost" onClick={() => requestSort("name")} className="flex items-center">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button variant="ghost" onClick={() => requestSort("lead")} className="flex items-center">
                    Lead
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button variant="ghost" onClick={() => requestSort("entity")} className="flex items-center">
                    Entity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button variant="ghost" onClick={() => requestSort("stage")} className="flex items-center">
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <Button variant="ghost" onClick={() => requestSort("capex")} className="flex items-center">
                    CAPEX
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("contractLength")}
                    className="flex items-center"
                  >
                    Contract Length
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{project.lead}</TableCell>
                  <TableCell className="hidden md:table-cell">{project.entity}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={`${getStageColor(project.stage)}`}>{project.stage}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{formatCurrency(Number(project.capex))}</TableCell>
                  <TableCell className="hidden lg:table-cell">{project.contractLength} years</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(project)}
                        className="neumorphic-button-small"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(project)}
                        className="neumorphic-button-small"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleDelete(project, e)}
                        className="neumorphic-button-small text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProjects.map((project) => (
            <Card key={project.id} className="neumorphic-container overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg truncate">{project.name}</h3>
                    <Badge className={`${getStageColor(project.stage)}`}>{project.stage}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead:</span>
                      <span className="font-medium">{project.lead}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entity:</span>
                      <span className="font-medium">{project.entity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CAPEX:</span>
                      <span className="font-medium">{formatCurrency(Number(project.capex))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contract:</span>
                      <span className="font-medium">{project.contractLength} years</span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t">
                  <Button
                    variant="ghost"
                    className="flex-1 rounded-none py-2 h-10"
                    onClick={() => onViewDetails(project)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 rounded-none py-2 h-10 border-l"
                    onClick={() => onEdit(project)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 rounded-none py-2 h-10 border-l text-destructive hover:text-destructive"
                    onClick={(e) => handleDelete(project, e)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project{" "}
              <span className="font-semibold">{projectToDelete?.name}</span> and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700"
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

