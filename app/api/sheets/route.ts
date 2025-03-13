import { NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';
import type { Project } from '@/lib/types';

// Get the spreadsheet ID from environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Function to get an authenticated JWT client
async function getAuthClient() {
  try {
    const key = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    const client = new JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await client.authorize();
    return client;
  } catch (error) {
    console.error('Error getting auth client:', error);
    throw error;
  }
}

// Function to fetch projects from Google Sheets
async function fetchProjects(): Promise<Project[]> {
  try {
    const client = await getAuthClient();
    
    // First, get the spreadsheet metadata to find the sheet ID
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;
    const metadataResponse = await fetch(metadataUrl, {
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
      },
    });
    
    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch spreadsheet metadata: ${metadataResponse.statusText}`);
    }
    
    const metadata = await metadataResponse.json();
    console.log('Spreadsheet metadata:', metadata);
    
    // Find the "Sheet1" sheet
    const projectsSheet = metadata.sheets.find((sheet: any) => 
      sheet.properties.title === 'Sheet1'
    );
    
    if (!projectsSheet) {
      throw new Error('Sheet named "Sheet1" not found in the spreadsheet');
    }
    
    // Now fetch the actual data
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:P`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Sheet data:', data);
    
    const rows = data.values || [];
    
    // Get headers from first row
    const headers = rows[0] || [];
    console.log('Headers:', headers);
    
    // Transform the data into Project objects (skip header row)
    const projects: Project[] = rows.slice(1).map(async (row: any[], index: number) => {
      // Generate a new ID if one doesn't exist or is empty
      const id = row[0] && row[0].trim() ? row[0] : `project-${Date.now()}-${index}`;
      
      // If we generated a new ID, update it in the sheet
      if (!row[0] || !row[0].trim()) {
        const rowIndex = index + 2; // +2 because we skip header row and index is 0-based
        const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A${rowIndex}?valueInputOption=USER_ENTERED`;
        try {
          const response = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${(await client.getAccessToken()).token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: [[id]],
            }),
          });
          
          if (!response.ok) {
            console.error('Error updating project ID:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating project ID:', error);
        }
      }

      console.log(`Row ${index + 1}:`, row);
      return {
        id,
        name: row[1] || '', // Column B is "name"
        lead: row[2] || '',
        entity: row[3] || '',
        stage: row[4] || '',
        governmentCommitment: row[5] || '',
        avgAvailabilityPayment: row[6] || '',
        capex: row[7] || '',
        opex: row[8] || '',
        vfm: row[9] || '',
        discountRate: row[10] || '',
        equityIrr: row[11] || '',
        contractLength: row[12] || '',
        summary: row[13] || '',
        currentStatus: row[14] || '',
        nextSteps: row[15] || '',
      };
    });

    // Wait for all projects to be processed
    const resolvedProjects = await Promise.all(projects);
    
    console.log('Transformed projects:', resolvedProjects);
    return resolvedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; // Re-throw the error to handle it in the GET handler
  }
}

// Function to add a project to Google Sheets
async function addProject(project: Project): Promise<boolean> {
  try {
    const client = await getAuthClient();
    
    // First, get the spreadsheet metadata to find the sheet ID
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;
    const metadataResponse = await fetch(metadataUrl, {
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
      },
    });
    
    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch spreadsheet metadata: ${metadataResponse.statusText}`);
    }
    
    const metadata = await metadataResponse.json();
    
    // Find the "Sheet1" sheet
    const projectsSheet = metadata.sheets.find((sheet: any) => 
      sheet.properties.title === 'Sheet1'
    );
    
    if (!projectsSheet) {
      throw new Error('Sheet named "Sheet1" not found in the spreadsheet');
    }
    
    // Generate a new ID if one doesn't exist
    if (!project.id) {
      project.id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // First, check if we need to add headers
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:P1`;
    const headersResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
      },
    });
    
    if (!headersResponse.ok) {
      throw new Error(`Failed to check headers: ${headersResponse.statusText}`);
    }
    
    const headersData = await headersResponse.json();
    const headers = headersData.values?.[0] || [];
    
    // If no headers exist, add them first
    if (headers.length === 0) {
      const headerUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:P1?valueInputOption=USER_ENTERED`;
      const headerResponse = await fetch(headerUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${(await client.getAccessToken()).token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[
            'id',
            'name',
            'lead',
            'entity',
            'stage',
            'governmentCommitment',
            'avgAvailabilityPayment',
            'capex',
            'opex',
            'vfm',
            'discountRate',
            'equityIrr',
            'contractLength',
            'summary',
            'currentStatus',
            'nextSteps',
          ]],
        }),
      });
      
      if (!headerResponse.ok) {
        throw new Error(`Failed to add headers: ${headerResponse.statusText}`);
      }
    }
    
    // Now add the project data
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:P:append?valueInputOption=USER_ENTERED`;
    
    const values = [
      [
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
        project.nextSteps,
      ],
    ];
    
    console.log('Adding project with values:', values);
    
    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    });
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error('Add response:', responseText);
      throw new Error(`Failed to add project: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error; // Re-throw to handle in the POST handler
  }
}

// Function to update a project in Google Sheets
async function updateProject(project: Project): Promise<boolean> {
  try {
    console.log('Updating project:', project);
    const client = await getAuthClient();
    
    // First, get the spreadsheet metadata to find the sheet ID
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;
    const metadataResponse = await fetch(metadataUrl, {
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
      },
    });
    
    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch spreadsheet metadata: ${metadataResponse.statusText}`);
    }
    
    const metadata = await metadataResponse.json();
    
    // Find the "Sheet1" sheet
    const projectsSheet = metadata.sheets.find((sheet: any) => 
      sheet.properties.title === 'Sheet1'
    );
    
    if (!projectsSheet) {
      throw new Error('Sheet named "Sheet1" not found in the spreadsheet');
    }

    // Get the actual sheet ID
    const sheetId = projectsSheet.properties.sheetId;
    
    // Now fetch all projects to find the row index
    const projects = await fetchProjects();
    console.log('Found projects:', projects);
    
    // First try to find by ID if it exists
    let projectIndex = -1;
    if (project.id) {
      console.log('Looking for project with ID:', project.id);
      projectIndex = projects.findIndex((p) => p.id === project.id);
    }

    // If not found by ID and name exists, try to find by name
    if (projectIndex === -1 && project.name) {
      console.log('Project not found by ID, trying to find by name:', project.name);
      // Find the first project with matching name and no ID
      projectIndex = projects.findIndex((p) => 
        p.name === project.name && (!p.id || p.id.trim() === '')
      );
    }
    
    console.log('Project index:', projectIndex);
    
    if (projectIndex === -1) {
      // If project is not found at all, add it as a new project
      console.log('Project not found, adding as new project');
      return addProject(project);
    }
    
    // Generate an ID if the existing project doesn't have one
    if (!projects[projectIndex].id || projects[projectIndex].id.trim() === '') {
      project.id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    } else {
      project.id = projects[projectIndex].id;
    }
    
    // Row index is projectIndex + 2 (header row + 0-based index)
    const rowIndex = projectIndex + 2;
    console.log('Row index for update:', rowIndex);
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A${rowIndex}:P${rowIndex}?valueInputOption=USER_ENTERED`;
    
    const values = [
      [
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
        project.nextSteps,
      ],
    ];
    
    console.log('Update values:', values);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    });
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error('Update response:', responseText);
      throw new Error(`Failed to update project: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

// Function to delete a project from Google Sheets
async function deleteProject(id: string): Promise<boolean> {
  try {
    // First, fetch all projects to find the row index
    const projects = await fetchProjects();
    const projectIndex = projects.findIndex((p) => p.id === id);
    
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    
    // Row index is projectIndex + 2 (header row + 0-based index)
    const rowIndex = projectIndex + 2;
    
    const client = await getAuthClient();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${(await client.getAccessToken()).token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // Assuming the first sheet
                dimension: 'ROWS',
                startIndex: rowIndex - 1, // 0-based index
                endIndex: rowIndex, // exclusive
              },
            },
          },
        ],
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete project: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

// GET handler to fetch projects
export async function GET() {
  try {
    const projects = await fetchProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching projects' },
      { status: 500 }
    );
  }
}

// POST handler to add a project
export async function POST(request: Request) {
  try {
    const project = await request.json();
    await addProject(project);
    
    // Return the created project with its ID
    return NextResponse.json({ 
      success: true,
      project: project
    });
  } catch (error: any) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add project' },
      { status: 500 }
    );
  }
}

// PUT handler to update a project
export async function PUT(request: Request) {
  try {
    const project = await request.json();
    const success = await updateProject(project);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      project: project
    });
  } catch (error: any) {
    console.error('Error in PUT handler:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a project
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const success = await deleteProject(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE handler:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 