import type { Metadata } from "next"
import ProjectDashboard from "@/components/project-dashboard"

export const metadata: Metadata = {
  title: "Project Management Dashboard",
  description: "A modern project management dashboard for tracking and managing projects",
}

export default function Home() {
  return <ProjectDashboard />
}

