import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ProjectProvider } from '@/lib/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Management Dashboard',
  description: 'A modern project management dashboard for tracking and managing projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
