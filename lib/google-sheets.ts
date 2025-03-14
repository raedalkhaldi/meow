import { google } from 'googleapis';
import type { Project } from './types';

// Initialize auth with environment variables
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A2:Q', // A to Q for 17 columns (added stage)
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows.map((row) => ({
      id: row[0] || '',
      name: row[1] || '',
      lead: row[2] || '',
      entity: row[3] || '',
      stage: row[4] || 'Planning',
      governmentCommitment: String(row[5] || '0'),
      avgAvailabilityPayment: String(row[6] || '0'),
      capex: String(row[7] || '0'),
      opex: String(row[8] || '0'),
      vfm: String(row[9] || '0'),
      discountRate: String(row[10] || '0'),
      equityIrr: String(row[11] || '0'),
      contractLength: String(row[12] || '0'),
      summary: row[13] || '',
      currentStatus: row[14] || '',
      nextSteps: row[15] || '',
      sections: [] // Initialize with empty sections array
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function addProject(project: Project): Promise<boolean> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:Q',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          project.id,
          project.name,
          project.lead,
          project.entity,
          project.stage,
          project.governmentCommitment,
          project.avgAvailabilityPayment,
          project.capex,
          project.opex,
          project.vfm,
          project.discountRate,
          project.equityIrr,
          project.contractLength,
          project.summary,
          project.currentStatus,
          project.nextSteps
        ]],
      },
    });
    return true;
  } catch (error) {
    console.error('Error adding project:', error);
    return false;
  }
}

export async function updateProject(project: Project): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values;
    if (!rows) return false;

    const rowIndex = rows.findIndex(row => row[0] === project.id);
    if (rowIndex === -1) return false;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `Sheet1!A${rowIndex + 1}:Q${rowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          project.id,
          project.name,
          project.lead,
          project.entity,
          project.stage,
          project.governmentCommitment,
          project.avgAvailabilityPayment,
          project.capex,
          project.opex,
          project.vfm,
          project.discountRate,
          project.equityIrr,
          project.contractLength,
          project.summary,
          project.currentStatus,
          project.nextSteps
        ]],
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
}

export async function deleteProject(projectId: string): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values;
    if (!rows) return false;

    const rowIndex = rows.findIndex(row => row[0] === projectId);
    if (rowIndex === -1) return false;

    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `Sheet1!A${rowIndex + 1}:Q${rowIndex + 1}`,
    });
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
} 