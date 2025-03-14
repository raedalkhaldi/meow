"use client"

import type { Project } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const safeFormatCurrency = (value: string): string => {
  const number = parseFloat(value);
  return isNaN(number) ? '$0' : formatCurrency(number);
}

interface ProjectDetailsProps {
  project: Project
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export function ProjectDetails({ project, onBack, onEdit, onDelete }: ProjectDetailsProps) {
  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "on hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "completed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
    }
  }

  const [showNewCard, setShowNewCard] = useState(false)
  const [customElements, setCustomElements] = useState<Array<{ key: string; value: string }>>([])
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")
  const [cardTitle, setCardTitle] = useState("Custom Card")
  const [editingTitle, setEditingTitle] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBack} className="neumorphic-button">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="neumorphic-button"
            onClick={() => setShowNewCard(!showNewCard)}
          >
            <Plus className="mr-2 h-4 w-4" />
            {showNewCard ? "Hide Card Form" : "Add New Card"}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="neumorphic-button">
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="neumorphic-button text-destructive hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Project
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="neumorphic-container">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Project Overview</CardTitle>
              <Badge className={`${getStageColor(project.stage)}`}>{project.stage}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Project Name</h3>
                  <p className="text-base">{project.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Project Lead</h3>
                  <p className="text-base">{project.lead}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Entity</h3>
                  <p className="text-base">{project.entity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contract Length</h3>
                  <p className="text-base">{project.contractLength} years</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Summary</h3>
                <p className="text-base">{project.summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="neumorphic-container">
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Government Commitment</h3>
                  <p className="text-base">{safeFormatCurrency(project.governmentCommitment)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Avg. Availability Payment</h3>
                  <p className="text-base">{safeFormatCurrency(project.avgAvailabilityPayment)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">CAPEX</h3>
                  <p className="text-base">{safeFormatCurrency(project.capex)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">OPEX</h3>
                  <p className="text-base">{safeFormatCurrency(project.opex)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Value for Money (VFM)</h3>
                  <p className="text-base">{project.vfm}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Discount Rate</h3>
                  <p className="text-base">{project.discountRate}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Equity IRR</h3>
                  <p className="text-base">{project.equityIrr}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showNewCard && (
        <Card className="neumorphic-container">
          <CardHeader>
            <div className="flex items-center gap-2">
              {editingTitle ? (
                <input
                  type="text"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  onBlur={() => setEditingTitle(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                  className="text-xl font-semibold neumorphic-input px-2 py-1 w-full"
                  autoFocus
                />
              ) : (
                <CardTitle
                  onClick={() => setEditingTitle(true)}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  {cardTitle}
                </CardTitle>
              )}
              {!editingTitle && (
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setEditingTitle(true)}>
                  <Edit className="h-3.5 w-3.5" />
                  <span className="sr-only">Edit title</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {customElements.map((element, index) => (
                  <div key={index} className="col-span-2 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{element.key}</h3>
                      <p className="text-base">{element.value}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="neumorphic-button-small"
                      onClick={() => {
                        const newElements = [...customElements]
                        newElements.splice(index, 1)
                        setCustomElements(newElements)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="elementKey" className="text-sm font-medium text-muted-foreground">
                    Element Name
                  </label>
                  <input
                    id="elementKey"
                    type="text"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="w-full p-2 mt-1 neumorphic-input rounded-md"
                    placeholder="Enter element name"
                  />
                </div>
                <div>
                  <label htmlFor="elementValue" className="text-sm font-medium text-muted-foreground">
                    Element Value
                  </label>
                  <input
                    id="elementValue"
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full p-2 mt-1 neumorphic-input rounded-md"
                    placeholder="Enter element value"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="neumorphic-button"
                  onClick={() => {
                    if (newKey.trim() && newValue.trim()) {
                      setCustomElements([...customElements, { key: newKey, value: newValue }])
                      setNewKey("")
                      setNewValue("")
                    }
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Element
                </Button>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button
                  variant="default"
                  size="sm"
                  className="neumorphic-button bg-primary text-primary-foreground"
                  onClick={() => {
                    // Here you would typically save the card data to your backend
                    // For now, we'll just close the card form
                    setShowNewCard(false);
                  }}
                >
                  Save Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="neumorphic-container">
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base">{project.currentStatus}</p>
          </CardContent>
        </Card>

        <Card className="neumorphic-container">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base">{project.nextSteps}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

