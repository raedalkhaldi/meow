"use client"

import React from 'react'
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import type { Project } from '@/lib/types'
import { fetchProjects, addProject as addProjectToSheet, updateProject as updateProjectInSheet, deleteProject as deleteProjectFromSheet } from '@/lib/google-sheets-client'

interface ProjectContextType {
  projects: Project[]
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  addProject: (project: Project) => Promise<void>
  updateProject: (project: Project) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjectsData()
  }, [])

  const fetchProjectsData = async () => {
    try {
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const addProject = async (project: Project) => {
    try {
      const success = await addProjectToSheet(project)
      if (!success) throw new Error('Failed to add project')
      await fetchProjectsData()
    } catch (error) {
      console.error('Error adding project:', error)
      throw error
    }
  }

  const updateProject = async (project: Project) => {
    try {
      console.log('Updating project:', project);
      const success = await updateProjectInSheet(project);
      if (!success) throw new Error('Failed to update project');
      await fetchProjectsData();
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const success = await deleteProjectFromSheet(id)
      if (!success) throw new Error('Failed to delete project')
      await fetchProjectsData()
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }

  const contextValue: ProjectContextType = {
    projects,
    selectedProject,
    setSelectedProject,
    addProject,
    updateProject,
    deleteProject,
  }

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
} 