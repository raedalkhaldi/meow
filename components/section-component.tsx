"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Section } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"

interface SectionComponentProps {
  section: Section
  onUpdateSection: (updatedSection: Section) => void
  onDeleteSection: (sectionId: string) => void
}

export default function SectionComponent({
  section,
  onUpdateSection,
  onDeleteSection,
}: SectionComponentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(section.title)
  const [editedDescription, setEditedDescription] = useState(section.description)

  const handleSave = () => {
    onUpdateSection({
      ...section,
      title: editedTitle,
      description: editedDescription,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(section.title)
    setEditedDescription(section.description)
    setIsEditing(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {isEditing ? (
          <div className="space-y-4 w-full">
            <div>
              <label htmlFor={`title-${section.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id={`title-${section.id}`}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor={`description-${section.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id={`description-${section.id}`}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="font-semibold">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
                aria-label="Edit section"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteSection(section.id)}
                className="h-8 w-8 p-0"
                aria-label="Delete section"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center">
            <span className="text-sm font-medium">Status:</span>
            <span className="ml-2 text-sm">{section.status}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium">Priority:</span>
            <span className="ml-2 text-sm">{section.priority}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium">Progress:</span>
            <span className="ml-2 text-sm">{section.progress}%</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium">Start Date:</span>
            <span className="ml-2 text-sm">{section.startDate}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium">End Date:</span>
            <span className="ml-2 text-sm">{section.endDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

