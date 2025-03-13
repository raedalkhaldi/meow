"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const items = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden neumorphic-button" aria-label="Open Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-bold">ProjectHub</span>
          </Link>
        </div>
        <nav className="grid gap-2 px-2 py-6">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent" : "transparent",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

