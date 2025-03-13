"use client"

import type React from "react"

import { useState } from "react"
import type { Section } from "@/lib/types"
import { generateId } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddSectionFormProps {
  onAdd: (section: Section) => void
  onCancel: () => void
}

export function AddSectionForm({ onAdd, onCancel }: AddSectionFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [progress, setProgress] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newSection: Section = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      startDate,
      endDate,
      progress,
    }
    onAdd(newSection)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={(value: "todo" | "in-progress" | "done") => setStatus(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="progress">Progress (%)</Label>
        <Input
          id="progress"
          type="number"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Section</Button>
      </div>
    </form>
  )
}

