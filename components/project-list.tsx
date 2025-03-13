"use client"

import type { Project } from "@/lib/types"
import { Trash2 } from "lucide-react"

interface ProjectListProps {
  projects: Project[]
  selectedProjectId: string | undefined
  onSelectProject: (project: Project) => void
  onDeleteProject: (projectId: string) => void
}

export default function ProjectList({
  projects,
  selectedProjectId,
  onSelectProject,
  onDeleteProject,
}: ProjectListProps) {
  if (projects.length === 0) {
    return <div className="text-center py-8 text-gray-500">No projects yet. Create your first project!</div>
  }

  return (
    <ul className="space-y-3">
      {projects.map((project) => (
        <li key={project.id}>
          <div
            className={`neumorphic-item p-4 rounded-lg flex justify-between items-center cursor-pointer transition-all ${
              selectedProjectId === project.id ? "neumorphic-item-active" : ""
            }`}
            onClick={() => onSelectProject(project)}
          >
            <div>
              <h3 className="font-medium text-gray-800">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.sections.length} sections</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteProject(project.id)
              }}
              className="neumorphic-button-small p-2 rounded-lg text-gray-600 hover:text-red-500"
              aria-label="Delete project"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

