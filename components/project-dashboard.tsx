"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectsTable } from "@/components/projects-table"
import { ProjectDetails } from "@/components/project-details"
import { AddProjectForm } from "@/components/add-project-form"
import { SearchAndFilter } from "@/components/search-and-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useProjects } from "@/lib/store"
import type { Project } from "@/lib/types"

export default function ProjectDashboard() {
  const { projects, selectedProject, setSelectedProject, addProject, updateProject, deleteProject } = useProjects()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterEntity, setFilterEntity] = useState<string | null>(null)
  const [filterLead, setFilterLead] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stage.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = !filterStatus || project.stage === filterStatus
    const matchesEntity = !filterEntity || project.entity === filterEntity
    const matchesLead = !filterLead || project.lead === filterLead

    return matchesSearch && matchesStatus && matchesEntity && matchesLead
  })

  // Get unique values for filters
  const statusOptions = Array.from(new Set(projects.map((p) => p.stage)))
  const entityOptions = Array.from(new Set(projects.map((p) => p.entity)))
  const leadOptions = Array.from(new Set(projects.map((p) => p.lead)))

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setShowAddForm(true)
                setSelectedProject(null)
                setEditingProject(null)
              }}
              className="neumorphic-button text-foreground font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterEntity={filterEntity}
          setFilterEntity={setFilterEntity}
          filterLead={filterLead}
          setFilterLead={setFilterLead}
          statusOptions={statusOptions}
          entityOptions={entityOptions}
          leadOptions={leadOptions}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {showAddForm ? (
          <AddProjectForm 
            onAdd={(project) => {
              addProject(project)
              setShowAddForm(false)
            }} 
            onCancel={() => setShowAddForm(false)} 
          />
        ) : editingProject ? (
          <AddProjectForm 
            project={editingProject} 
            onAdd={(project) => {
              updateProject(project)
              setEditingProject(null)
            }} 
            onCancel={() => setEditingProject(null)} 
            isEditing 
          />
        ) : selectedProject ? (
          <ProjectDetails
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            onEdit={() => setEditingProject(selectedProject)}
            onDelete={() => deleteProject(selectedProject.id)}
          />
        ) : (
          <ProjectsTable
            projects={filteredProjects}
            onViewDetails={setSelectedProject}
            onEdit={setEditingProject}
            onDelete={deleteProject}
            viewMode={viewMode}
          />
        )}
      </div>
    </DashboardShell>
  )
}

