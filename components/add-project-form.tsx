"use client"

import type React from "react"

import { useState } from "react"
import type { Project } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateId } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface AddProjectFormProps {
  project?: Project
  onAdd: (project: Project) => void
  onCancel: () => void
  isEditing?: boolean
}

export function AddProjectForm({ project, onAdd, onCancel, isEditing = false }: AddProjectFormProps) {
  const initialProject: Project = {
    id: generateId(),
    name: "",
    lead: "",
    entity: "",
    stage: "",
    governmentCommitment: "",
    avgAvailabilityPayment: "",
    capex: "",
    opex: "",
    vfm: "",
    discountRate: "",
    equityIrr: "",
    contractLength: "",
    summary: "",
    currentStatus: "",
    nextSteps: "",
    sections: []
  }

  const [formData, setFormData] = useState<Project>(project || initialProject)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const projectToSubmit = isEditing ? { ...formData, id: project?.id || formData.id } : formData
    onAdd(projectToSubmit)
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Need assessment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Business Case":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "Tendering":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Commercial Close":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Financial Close":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
      case "Other":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
      default:
        return ""
    }
  }

  const stageOptions = [
    "Need assessment",
    "Business Case",
    "Tendering",
    "Commercial Close",
    "Financial Close",
    "Other",
  ]

  return (
    <Card className="neumorphic-container">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead">Project Lead</Label>
              <Input
                id="lead"
                name="lead"
                value={formData.lead}
                onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entity">Entity</Label>
              <Input
                id="entity"
                name="entity"
                value={formData.entity}
                onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                <SelectTrigger className="neumorphic-input">
                  <SelectValue placeholder="Select stage">
                    {formData.stage && <Badge className={getStageColor(formData.stage)}>{formData.stage}</Badge>}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {stageOptions.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      <Badge className={getStageColor(stage)}>{stage}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="governmentCommitment">Government Commitment</Label>
              <Input
                id="governmentCommitment"
                name="governmentCommitment"
                value={formData.governmentCommitment}
                onChange={(e) => setFormData({ ...formData, governmentCommitment: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avgAvailabilityPayment">Average Availability Payment</Label>
              <Input
                id="avgAvailabilityPayment"
                name="avgAvailabilityPayment"
                value={formData.avgAvailabilityPayment}
                onChange={(e) => setFormData({ ...formData, avgAvailabilityPayment: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capex">CAPEX</Label>
              <Input
                id="capex"
                name="capex"
                value={formData.capex}
                onChange={(e) => setFormData({ ...formData, capex: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opex">OPEX</Label>
              <Input
                id="opex"
                name="opex"
                value={formData.opex}
                onChange={(e) => setFormData({ ...formData, opex: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfm">VFM</Label>
              <Input
                id="vfm"
                name="vfm"
                value={formData.vfm}
                onChange={(e) => setFormData({ ...formData, vfm: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountRate">Discount Rate</Label>
              <Input
                id="discountRate"
                name="discountRate"
                value={formData.discountRate}
                onChange={(e) => setFormData({ ...formData, discountRate: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equityIrr">Equity IRR</Label>
              <Input
                id="equityIrr"
                name="equityIrr"
                value={formData.equityIrr}
                onChange={(e) => setFormData({ ...formData, equityIrr: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractLength">Contract Length</Label>
              <Input
                id="contractLength"
                name="contractLength"
                value={formData.contractLength}
                onChange={(e) => setFormData({ ...formData, contractLength: e.target.value })}
                className="neumorphic-input"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="min-h-[100px] neumorphic-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentStatus">Current Status</Label>
            <Textarea
              id="currentStatus"
              name="currentStatus"
              value={formData.currentStatus}
              onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
              className="min-h-[100px] neumorphic-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextSteps">Next Steps</Label>
            <Textarea
              id="nextSteps"
              name="nextSteps"
              value={formData.nextSteps}
              onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
              className="min-h-[100px] neumorphic-input"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel} className="neumorphic-button">
              Cancel
            </Button>
            <Button type="submit" className="neumorphic-button">
              {isEditing ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

