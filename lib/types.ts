export interface Project {
  id: string;
  name: string;
  lead: string;
  entity: string;
  stage: string;
  governmentCommitment: string;
  avgAvailabilityPayment: string;
  capex: string;
  opex: string;
  vfm: string;
  discountRate: string;
  equityIrr: string;
  contractLength: string;
  summary: string;
  currentStatus: string;
  nextSteps: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  endDate: string;
  progress: number;
}

