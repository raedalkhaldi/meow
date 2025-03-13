"use client"

import type React from "react"

import { useState } from "react"
import type { Subsection } from "@/lib/types"
import { generateId } from "@/lib/utils"

interface AddSubsectionFormProps {
  onAdd: (subsection: Subsection) => void
  onCancel: () => void
}

export default function AddSubsectionForm({ onAdd, onCancel }: AddSubsectionFormProps) {
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newSubsection: Subsection = {
      id: generateId(),
      title: title.trim(),
      value: value.trim(),
    }

    onAdd(newSubsection)
    setTitle("")
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="neumorphic-inset p-4 rounded-lg">
      <h3 className="text-sm font-medium text-gray-800 mb-3">New Subsection</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="subsection-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="subsection-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="neumorphic-input w-full p-2 rounded-lg bg-gray-100 text-gray-800"
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label htmlFor="subsection-value" className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          <input
            id="subsection-value"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="neumorphic-input w-full p-2 rounded-lg bg-gray-100 text-gray-800"
            placeholder="Enter value"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="neumorphic-button px-3 py-1 text-sm rounded-lg text-gray-700"
          >
            Cancel
          </button>
          <button type="submit" className="neumorphic-button px-3 py-1 text-sm rounded-lg text-gray-700 font-medium">
            Add
          </button>
        </div>
      </div>
    </form>
  )
}

