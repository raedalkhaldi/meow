"use client"

import { useState } from "react"
import type { Section, Subsection } from "@/lib/types"
import SubsectionComponent from "./subsection-component"
import AddSubsectionForm from "./add-subsection-form"
import { ChevronDown, ChevronUp, PlusCircle, Trash2 } from "lucide-react"

interface SectionComponentProps {
  section: Section
  onUpdateSection: (updatedSection: Section) => void
  onDeleteSection: (sectionId: string) => void
}

export default function SectionComponent({ section, onUpdateSection, onDeleteSection }: SectionComponentProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showAddSubsection, setShowAddSubsection] = useState(false)

  const handleAddSubsection = (newSubsection: Subsection) => {
    const updatedSection = {
      ...section,
      subsections: [...section.subsections, newSubsection],
    }
    onUpdateSection(updatedSection)
    setShowAddSubsection(false)
  }

  const handleUpdateSubsection = (updatedSubsection: Subsection) => {
    const updatedSection = {
      ...section,
      subsections: section.subsections.map((subsection) =>
        subsection.id === updatedSubsection.id ? updatedSubsection : subsection,
      ),
    }
    onUpdateSection(updatedSection)
  }

  const handleDeleteSubsection = (subsectionId: string) => {
    const updatedSection = {
      ...section,
      subsections: section.subsections.filter((subsection) => subsection.id !== subsectionId),
    }
    onUpdateSection(updatedSection)
  }

  return (
    <div className="neumorphic-container p-5 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-600" />
          ) : (
            <ChevronDown size={20} className="text-gray-600" />
          )}
          <h4 className="text-lg font-semibold text-gray-800">{section.name}</h4>
        </div>
        <div className="flex items-center gap-2">
          {!showAddSubsection && (
            <button
              onClick={() => setShowAddSubsection(true)}
              className="neumorphic-button-small p-2 rounded-lg text-gray-600"
              aria-label="Add subsection"
            >
              <PlusCircle size={18} />
            </button>
          )}
          <button
            onClick={() => onDeleteSection(section.id)}
            className="neumorphic-button-small p-2 rounded-lg text-gray-600 hover:text-red-500"
            aria-label="Delete section"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {showAddSubsection && (
            <div className="mb-4">
              <AddSubsectionForm onAdd={handleAddSubsection} onCancel={() => setShowAddSubsection(false)} />
            </div>
          )}

          {section.subsections.length === 0 && !showAddSubsection ? (
            <div className="text-center py-4 text-gray-500 neumorphic-inset p-4 rounded-lg">
              No subsections yet. Add your first subsection!
            </div>
          ) : (
            <div className="space-y-3 pl-2">
              {section.subsections.map((subsection) => (
                <SubsectionComponent
                  key={subsection.id}
                  subsection={subsection}
                  onUpdateSubsection={handleUpdateSubsection}
                  onDeleteSubsection={handleDeleteSubsection}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

