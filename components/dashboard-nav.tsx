"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Briefcase, Building2, Calendar, FileText, Home, Settings, Users } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Briefcase,
  },
  {
    title: "Entities",
    href: "/entities",
    icon: Building2,
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 px-2 pt-6">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground neumorphic-nav-item",
              isActive ? "neumorphic-nav-active" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

