import type { Project } from "@/lib/types"

export const mockProjects: Project[] = [
  {
    id: "proj-001",
    name: "Highway Expansion Project",
    lead: "Jane Smith",
    entity: "Department of Transportation",
    stage: "Active",
    governmentCommitment: "250000000",
    avgAvailabilityPayment: "15000000",
    capex: "180000000",
    opex: "5000000",
    vfm: "12.5",
    discountRate: "4.2",
    equityIrr: "8.7",
    contractLength: "25",
    summary: "Expansion of the northern highway corridor including 3 new lanes, 2 bridges, and 5 interchanges.",
    currentStatus: "Construction phase 2 of 4. Bridge foundations complete, starting deck work next month.",
    nextSteps:
      "Complete environmental impact assessment for phase 3. Finalize land acquisition for remaining sections.",
  },
  {
    id: "proj-002",
    name: "City Hospital Modernization",
    lead: "Michael Johnson",
    entity: "Health Department",
    stage: "Planning",
    governmentCommitment: "420000000",
    avgAvailabilityPayment: "22000000",
    capex: "350000000",
    opex: "12000000",
    vfm: "9.8",
    discountRate: "3.8",
    equityIrr: "7.5",
    contractLength: "30",
    summary:
      "Complete modernization of the city's main hospital including new emergency department, surgical wing, and patient tower.",
    currentStatus: "Design phase complete. Preparing tender documents for construction contract.",
    nextSteps: "Issue RFP for construction by end of quarter. Finalize financing structure with Treasury.",
  },
  {
    id: "proj-003",
    name: "Renewable Energy Grid Integration",
    lead: "Sarah Williams",
    entity: "Energy Commission",
    stage: "On Hold",
    governmentCommitment: "180000000",
    avgAvailabilityPayment: "8500000",
    capex: "150000000",
    opex: "3500000",
    vfm: "15.2",
    discountRate: "4.5",
    equityIrr: "9.2",
    contractLength: "20",
    summary:
      "Integration of solar and wind energy sources into the main power grid with new transmission lines and storage facilities.",
    currentStatus: "Project temporarily on hold pending resolution of land use disputes with local communities.",
    nextSteps: "Resume community consultations. Revise project timeline once disputes are resolved.",
  },
  {
    id: "proj-004",
    name: "Metro Line Extension",
    lead: "Robert Chen",
    entity: "Transit Authority",
    stage: "Active",
    governmentCommitment: "650000000",
    avgAvailabilityPayment: "32000000",
    capex: "520000000",
    opex: "18000000",
    vfm: "11.3",
    discountRate: "4.0",
    equityIrr: "8.1",
    contractLength: "35",
    summary: "Extension of the city's metro line with 8 new stations and connection to the airport.",
    currentStatus: "Tunneling work 60% complete. Station construction started at 3 locations.",
    nextSteps: "Begin procurement of rolling stock. Finalize signaling system integration plan.",
  },
  {
    id: "proj-005",
    name: "Water Treatment Facility",
    lead: "Emily Davis",
    entity: "Water Resources Board",
    stage: "Completed",
    governmentCommitment: "120000000",
    avgAvailabilityPayment: "6000000",
    capex: "95000000",
    opex: "4200000",
    vfm: "13.7",
    discountRate: "3.5",
    equityIrr: "7.8",
    contractLength: "15",
    summary: "Construction of a new water treatment facility with capacity to serve 500,000 residents.",
    currentStatus: "Project completed and facility operational. Performance exceeding targets by 5%.",
    nextSteps: "Conduct 1-year performance review. Consider expansion options for phase 2.",
  },
  {
    id: "proj-006",
    name: "Smart City Initiative",
    lead: "David Wilson",
    entity: "Digital Transformation Agency",
    stage: "Planning",
    governmentCommitment: "85000000",
    avgAvailabilityPayment: "4500000",
    capex: "65000000",
    opex: "7500000",
    vfm: "18.5",
    discountRate: "5.0",
    equityIrr: "10.2",
    contractLength: "10",
    summary:
      "Implementation of smart city technologies including traffic management, public WiFi, and IoT sensors for environmental monitoring.",
    currentStatus: "Finalizing technical specifications. Pilot project in downtown area showing promising results.",
    nextSteps: "Complete vendor selection process. Develop phased implementation plan for citywide rollout.",
  },
]

export function generateRevenueData(dateRange: { from: Date; to: Date }) {
  const days = Math.floor((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
  const data = []
  
  for (let i = 0; i < days; i++) {
    const date = new Date(dateRange.from)
    date.setDate(date.getDate() + i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 1000) + 500,
    })
  }
  
  return data
}

export function generateSalesData(dateRange: { from: Date; to: Date }) {
  const data = []
  const days = Math.floor((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
  
  for (let i = 0; i < days; i++) {
    const date = new Date(dateRange.from)
    date.setDate(date.getDate() + i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 100) + 20,
    })
  }
  
  return data
}

export function generateUserActivityData(dateRange: { from: Date; to: Date }) {
  const data = []
  const days = Math.floor((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
  
  for (let i = 0; i < days; i++) {
    const date = new Date(dateRange.from)
    date.setDate(date.getDate() + i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      activeUsers: Math.floor(Math.random() * 1000) + 100,
    })
  }
  
  return data
}

export function generateRegionalSalesData() {
  return [
    { region: 'North', sales: Math.floor(Math.random() * 1000) + 500 },
    { region: 'South', sales: Math.floor(Math.random() * 1000) + 500 },
    { region: 'East', sales: Math.floor(Math.random() * 1000) + 500 },
    { region: 'West', sales: Math.floor(Math.random() * 1000) + 500 },
    { region: 'Central', sales: Math.floor(Math.random() * 1000) + 500 },
  ]
}

