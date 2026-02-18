export interface Client {
  id: string;
  name: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  status: 'active' | 'prospect' | 'inactive';
  revenue: number;
  projectCount: number;
  avatarColor: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  teamSize: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  projectName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  issueDate: string;
  dueDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  utilization: number;
  activeProjects: number;
  avatarColor: string;
  status: 'available' | 'busy' | 'away';
}

export const clients: Client[] = [
  { id: '1', name: 'Apex Financial Group', industry: 'Finance', contactName: 'Sarah Chen', contactEmail: 'schen@apexfg.com', status: 'active', revenue: 485000, projectCount: 3, avatarColor: '#6C5CE7' },
  { id: '2', name: 'Meridian Healthcare', industry: 'Healthcare', contactName: 'James Wilson', contactEmail: 'jwilson@meridian.com', status: 'active', revenue: 320000, projectCount: 2, avatarColor: '#00CEC9' },
  { id: '3', name: 'TechNova Solutions', industry: 'Technology', contactName: 'Lisa Park', contactEmail: 'lpark@technova.io', status: 'active', revenue: 275000, projectCount: 2, avatarColor: '#E17055' },
  { id: '4', name: 'Green Valley Energy', industry: 'Energy', contactName: 'Michael Torres', contactEmail: 'mtorres@greenvalley.com', status: 'prospect', revenue: 0, projectCount: 0, avatarColor: '#00B894' },
  { id: '5', name: 'Atlas Manufacturing', industry: 'Manufacturing', contactName: 'Karen Hughes', contactEmail: 'khughes@atlas.com', status: 'active', revenue: 198000, projectCount: 1, avatarColor: '#FDCB6E' },
  { id: '6', name: 'Pinnacle Retail', industry: 'Retail', contactName: 'David Kim', contactEmail: 'dkim@pinnacle.com', status: 'inactive', revenue: 145000, projectCount: 0, avatarColor: '#74B9FF' },
  { id: '7', name: 'Horizon Education', industry: 'Education', contactName: 'Amanda Foster', contactEmail: 'afoster@horizon.edu', status: 'prospect', revenue: 0, projectCount: 0, avatarColor: '#A29BFE' },
];

export const projects: Project[] = [
  { id: '1', name: 'Digital Transformation Strategy', clientId: '1', clientName: 'Apex Financial Group', status: 'active', progress: 68, budget: 250000, spent: 170000, startDate: '2025-09-01', endDate: '2026-04-30', teamSize: 5 },
  { id: '2', name: 'Risk Assessment Framework', clientId: '1', clientName: 'Apex Financial Group', status: 'active', progress: 42, budget: 120000, spent: 50400, startDate: '2025-11-15', endDate: '2026-06-30', teamSize: 3 },
  { id: '3', name: 'Patient Portal Redesign', clientId: '2', clientName: 'Meridian Healthcare', status: 'active', progress: 85, budget: 180000, spent: 153000, startDate: '2025-06-01', endDate: '2026-03-15', teamSize: 4 },
  { id: '4', name: 'HIPAA Compliance Audit', clientId: '2', clientName: 'Meridian Healthcare', status: 'completed', progress: 100, budget: 95000, spent: 88000, startDate: '2025-04-01', endDate: '2025-12-31', teamSize: 2 },
  { id: '5', name: 'Cloud Migration Plan', clientId: '3', clientName: 'TechNova Solutions', status: 'active', progress: 55, budget: 200000, spent: 110000, startDate: '2025-08-15', endDate: '2026-05-31', teamSize: 6 },
  { id: '6', name: 'DevOps Pipeline Setup', clientId: '3', clientName: 'TechNova Solutions', status: 'planning', progress: 10, budget: 75000, spent: 7500, startDate: '2026-01-15', endDate: '2026-07-31', teamSize: 3 },
  { id: '7', name: 'Supply Chain Optimization', clientId: '5', clientName: 'Atlas Manufacturing', status: 'on-hold', progress: 30, budget: 150000, spent: 45000, startDate: '2025-10-01', endDate: '2026-08-31', teamSize: 4 },
  { id: '8', name: 'Regulatory Compliance Review', clientId: '1', clientName: 'Apex Financial Group', status: 'planning', progress: 5, budget: 115000, spent: 5750, startDate: '2026-02-01', endDate: '2026-09-30', teamSize: 2 },
];

export const invoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2026-001', clientName: 'Apex Financial Group', projectName: 'Digital Transformation Strategy', amount: 62500, status: 'paid', issueDate: '2026-01-01', dueDate: '2026-01-31' },
  { id: '2', invoiceNumber: 'INV-2026-002', clientName: 'Meridian Healthcare', projectName: 'Patient Portal Redesign', amount: 45000, status: 'paid', issueDate: '2026-01-01', dueDate: '2026-01-31' },
  { id: '3', invoiceNumber: 'INV-2026-003', clientName: 'TechNova Solutions', projectName: 'Cloud Migration Plan', amount: 50000, status: 'pending', issueDate: '2026-02-01', dueDate: '2026-02-28' },
  { id: '4', invoiceNumber: 'INV-2026-004', clientName: 'Atlas Manufacturing', projectName: 'Supply Chain Optimization', amount: 37500, status: 'overdue', issueDate: '2026-01-15', dueDate: '2026-02-14' },
  { id: '5', invoiceNumber: 'INV-2026-005', clientName: 'Apex Financial Group', projectName: 'Risk Assessment Framework', amount: 30000, status: 'pending', issueDate: '2026-02-01', dueDate: '2026-02-28' },
  { id: '6', invoiceNumber: 'INV-2026-006', clientName: 'Apex Financial Group', projectName: 'Regulatory Compliance Review', amount: 28750, status: 'draft', issueDate: '2026-02-15', dueDate: '2026-03-15' },
  { id: '7', invoiceNumber: 'INV-2026-007', clientName: 'Meridian Healthcare', projectName: 'HIPAA Compliance Audit', amount: 22000, status: 'paid', issueDate: '2025-12-15', dueDate: '2026-01-15' },
  { id: '8', invoiceNumber: 'INV-2026-008', clientName: 'TechNova Solutions', projectName: 'DevOps Pipeline Setup', amount: 18750, status: 'draft', issueDate: '2026-02-15', dueDate: '2026-03-15' },
];

export const team: TeamMember[] = [
  { id: '1', name: 'Alexandra Vito', role: 'Managing Partner', department: 'Leadership', email: 'avito@vitoconsulting.com', utilization: 75, activeProjects: 4, avatarColor: '#6C5CE7', status: 'busy' },
  { id: '2', name: 'Marcus Chen', role: 'Senior Consultant', department: 'Strategy', email: 'mchen@vitoconsulting.com', utilization: 90, activeProjects: 3, avatarColor: '#00CEC9', status: 'busy' },
  { id: '3', name: 'Priya Sharma', role: 'Technology Lead', department: 'Technology', email: 'psharma@vitoconsulting.com', utilization: 85, activeProjects: 2, avatarColor: '#E17055', status: 'busy' },
  { id: '4', name: 'Daniel Okafor', role: 'Business Analyst', department: 'Strategy', email: 'dokafor@vitoconsulting.com', utilization: 60, activeProjects: 2, avatarColor: '#00B894', status: 'available' },
  { id: '5', name: 'Sophie Laurent', role: 'UX Consultant', department: 'Design', email: 'slaurent@vitoconsulting.com', utilization: 70, activeProjects: 2, avatarColor: '#FDCB6E', status: 'available' },
  { id: '6', name: 'Ryan Mitchell', role: 'Data Analyst', department: 'Technology', email: 'rmitchell@vitoconsulting.com', utilization: 45, activeProjects: 1, avatarColor: '#74B9FF', status: 'available' },
  { id: '7', name: 'Elena Kozlov', role: 'Project Manager', department: 'Operations', email: 'ekozlov@vitoconsulting.com', utilization: 95, activeProjects: 4, avatarColor: '#A29BFE', status: 'busy' },
  { id: '8', name: 'Thomas Wright', role: 'Junior Consultant', department: 'Strategy', email: 'twright@vitoconsulting.com', utilization: 30, activeProjects: 1, avatarColor: '#FD79A8', status: 'away' },
];

// Dashboard KPIs
export const kpis = {
  totalRevenue: 1423000,
  revenueGrowth: 12.5,
  activeProjects: 5,
  completedProjects: 1,
  totalClients: 7,
  activeClients: 4,
  teamUtilization: 68.75,
  outstandingInvoices: 136250,
  pipelineValue: 575000,
  avgProjectMargin: 22.3,
};

// Revenue by month (last 6 months)
export const revenueByMonth = [
  { month: 'Sep', revenue: 195000 },
  { month: 'Oct', revenue: 210000 },
  { month: 'Nov', revenue: 235000 },
  { month: 'Dec', revenue: 255000 },
  { month: 'Jan', revenue: 262500 },
  { month: 'Feb', revenue: 265500 },
];

// Revenue by industry
export const revenueByIndustry = [
  { industry: 'Finance', revenue: 485000, color: '#6C5CE7' },
  { industry: 'Healthcare', revenue: 320000, color: '#00CEC9' },
  { industry: 'Technology', revenue: 275000, color: '#E17055' },
  { industry: 'Manufacturing', revenue: 198000, color: '#FDCB6E' },
  { industry: 'Retail', revenue: 145000, color: '#74B9FF' },
];
