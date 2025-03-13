"use client"

import { useState } from "react"
import type { Subsection } from "@/lib/types"
import { Edit2, Save, Trash2, X } from "lucide-react"

interface SubsectionComponentProps {
  subsection: Subsection
  onUpdateSubsection: (updatedSubsection: Subsection) => void
  onDeleteSubsection: (subsectionId: string) => void
}

export default function SubsectionComponent({
  subsection,
  onUpdateSubsection,
  onDeleteSubsection,
}: SubsectionComponentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(subsection.title)
  const [editedValue, setEditedValue] = useState(subsection.value)

  const handleSave = () => {
    onUpdateSubsection({
      ...subsection,
      title: editedTitle,
      value: editedValue,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(subsection.title)
    setEditedValue(subsection.value)
    setIsEditing(false)
  }

  return (
    <div className="neumorphic-item p-4 rounded-lg">
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label htmlFor={`title-${subsection.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id={`title-${subsection.id}`}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="neumorphic-input w-full p-2 rounded-lg bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor={`value-${subsection.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Value
            </label>
            <input
              id={`value-${subsection.id}`}
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="neumorphic-input w-full p-2 rounded-lg bg-gray-100 text-gray-800"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCancel}
              className="neumorphic-button-small p-2 rounded-lg text-gray-600"
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleSave}
              className="neumorphic-button-small p-2 rounded-lg text-gray-600"
              aria-label="Save"
            >
              <Save size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-medium text-gray-800">{subsection.title}</h5>
            <p className="text-gray-600">{subsection.value}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="neumorphic-button-small p-2 rounded-lg text-gray-600"
              aria-label="Edit subsection"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDeleteSubsection(subsection.id)}
              className="neumorphic-button-small p-2 rounded-lg text-gray-600 hover:text-red-500"
              aria-label="Delete subsection"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

