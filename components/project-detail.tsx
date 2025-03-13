"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Project, Section } from "@/lib/types"
import SectionComponent from "./section-component"
import { AddSectionForm } from "./add-section-form"
import { PlusCircle } from "lucide-react"

interface ProjectDetailProps {
  project: Project
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function ProjectDetail({ project, onBack, onEdit, onDelete }: ProjectDetailProps) {
  const [showAddSection, setShowAddSection] = useState(false)
  const [sections, setSections] = useState<Section[]>(project.sections || [])

  const handleAddSection = (newSection: Section) => {
    setSections([...sections, newSection])
    setShowAddSection(false)
  }

  const handleUpdateSection = (updatedSection: Section) => {
    setSections(sections.map((section) => (section.id === updatedSection.id ? updatedSection : section)))
  }

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  return (
    <div className="neumorphic-container p-6 rounded-xl">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
          <div className="space-x-2">
            <Button onClick={onBack} variant="outline">Back</Button>
            <Button onClick={onEdit} variant="outline">Edit</Button>
            <Button onClick={onDelete} variant="destructive">Delete</Button>
          </div>
        </div>
        <p className="text-gray-600 mt-1">{project.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Lead:</span> {project.lead}
            </div>
            <div>
              <span className="font-medium">Entity:</span> {project.entity}
            </div>
            <div>
              <span className="font-medium">Stage:</span> {project.stage}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Government Commitment:</span> ${project.governmentCommitment}
            </div>
            <div>
              <span className="font-medium">Avg. Availability Payment:</span> ${project.avgAvailabilityPayment}
            </div>
            <div>
              <span className="font-medium">CAPEX:</span> ${project.capex}
            </div>
            <div>
              <span className="font-medium">OPEX:</span> ${project.opex}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Sections</h3>
          {!showAddSection && (
            <Button
              onClick={() => setShowAddSection(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Section
            </Button>
          )}
        </div>

        {showAddSection && (
          <div className="mb-6">
            <AddSectionForm onAdd={handleAddSection} onCancel={() => setShowAddSection(false)} />
          </div>
        )}

        {sections.length === 0 && !showAddSection ? (
          <div className="text-center py-8 text-gray-500 border rounded-lg">
            No sections yet. Add your first section!
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <SectionComponent
                key={section.id}
                section={section}
                onUpdateSection={handleUpdateSection}
                onDeleteSection={handleDeleteSection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

