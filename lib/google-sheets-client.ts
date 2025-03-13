import type { Project } from './types';

// Service account credentials
const credentials = {
  type: "service_account",
  project_id: "ncp2-453218",
  private_key_id: "8365beb078cef921f097f58fd908ae6d1089577c",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQDI9nz/WJGwSuX7\n3+QLPDM0F4SyHf9ZW3A+cetDylc3SFYim4t4qnFD4N6cBKqeeEmnwoc0cVM3/14J\nlybVLLpUgG7zG5j/8GK+2PokdKF441d1v277MoUtiuiWiaURBIU77pOm0k6DkMmY\nroLlq6tq70cZIVsM/EBaC+VM7XBIJh9lXeAIxfG6ENpcvFAlIMu8liEM/qIoGLVs\nfdLkJkHtu0SQMF7yKYg4qf+0L59esEmHJi5KAdJf5Pp3EApdJ7Qq7edOZbGoROg8\nlYTwvrS0whWKKy+N124ucx6eQc2DEsKGFqKv4fxkpbmG0YUAGkoppb5AfddMDUSM\nVasx4O2lAgMBAAECgf9Mu9F+rpLyfabTReoNYC8s9M32NP4LYJ67OURb3ibvNO+u\nxzW6HVqiUHqvmBiN6eA17lEx9RORjjCZ+N0bCLkdCu1SZndFQsRxmufog6AkSKpc\ni3wU7nVrrl6hHG2q0c8N00sNp7/S/LX9VqUkjSgm7LZ5IgNiMe9gcqpbdU4qPbXo\n4G7P6k3GoZe9l85kkHDreeQJTz0Ct5bC9vW75kjsYtlGymT8wzr0oNqcwOzbUreW\nTcBG2xTtszzRvEajf6EyEo1ruqGt2O9vb8HfTFdIXmkt4A8y4Hzk183lQ/1maIvq\nfrfB0wKlHeJmHTOBAdcT1Dq7zxenRL3iq0ubGtECgYEA/ieerCwr7b198Po4F1Qo\nNecBEDNIjxog/fWo6zGpERTFakBdjz6W1FJlxi7WOr8kKftFCvvx2n3iCCT72FJr\nHmNqbis/O+46oty1MpbkpDBYoWKZcKwDHmuH43bxRVYKZQitiRoMWHhubeUA0RtM\nJKZ/oZ+Dg83adhHeKnbRPnECgYEAymwBFo8WHF2k7vVYO3jr7PSSSceCSTateKpq\nQi9Bj5exs+lSCT6ekpdqCw83P6tWPeYtgq9WZSIXdoaHLcnap5p2Yj1B0kjToPOG\nxhWdRVavqGhLEIekrqSW6Ahb9mRL8UOvdeWaA5gT3PEKtjQjA+Y5mtPyRS/+s+LN\ndDmvpHUCgYB8YVVk+0UQV0EwUrRqrlPzdTbu/7oN1oK45qWhXK9Z3alzg0aGWOIl\nzKFkKP3MyEhhh0fVxVEqVZrt03Ow/TzRJWQrwFx07vShSZQfyvrgY4yshn2DR5tL\nIuLg7g/Ll/0ETwfmZeoOzfl1LLKGo25TLWye41rQgUjdqYbpjzZ98QKBgH74CCay\nUdgxFQeedV24l6PmNOx6bEqoNV9+5W/mXGVJbXnAXGjYEnc46pdNUAZr3oitHNbg\nTHzbSYRbFeeuuaxvwtoUOnlAnR5UIrGVVTTtDvm/kXYo3y98pfudYrHGb6xCHIkD\nH/wpJCxuNZ3cTipf+roXP9wOIuGK3fyNQpMRAoGANLSK/PUmnHoBKwVEE0h4WYr9\nTz8Bik+q97zddnSdcg5aLfSkjZLdLLL3EBN3u/onVdmaFSFpr0zlgvdXEZnujVh8\nIgbuaptmUThlb1456Z2kTzPtj8ElwMoIJm9W5e+4zxFun4pbldpJUFtPz7SSXA8i\nBBVJoyyhss1B03Izctw=\n-----END PRIVATE KEY-----\n",
  client_email: "nacp3-222@ncp2-453218.iam.gserviceaccount.com",
  client_id: "116099959142952278680",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/nacp3-222%40ncp2-453218.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

// Spreadsheet ID
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || "1WP8ir86OpZzjvJPADevN-4LqykhcWt7lQk5zgtlIFDc";

// Use mock API for development
const USE_MOCK_API = false;

// Function to get an access token
async function getAccessToken() {
  try {
    const response = await fetch('/api/auth/google-token', {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to get access token');
    }
    
    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Function to fetch projects from Google Sheets
export async function fetchProjects(): Promise<Project[]> {
  try {
    // Use mock API for development
    const endpoint = USE_MOCK_API ? '/api/mock-projects' : '/api/sheets';
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Function to add a project to Google Sheets
export async function addProject(project: Project): Promise<boolean> {
  try {
    // Use mock API for development
    const endpoint = USE_MOCK_API ? '/api/mock-projects' : '/api/sheets';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add project');
    }
    
    return true;
  } catch (error) {
    console.error('Error adding project:', error);
    return false;
  }
}

// Function to update a project in Google Sheets
export async function updateProject(project: Project): Promise<boolean> {
  try {
    console.log('Updating project:', project);
    // Use mock API for development
    const endpoint = USE_MOCK_API ? '/api/mock-projects' : '/api/sheets';
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Failed to update project');
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

// Function to delete a project from Google Sheets
export async function deleteProject(id: string): Promise<boolean> {
  try {
    // Use mock API for development
    const endpoint = USE_MOCK_API ? '/api/mock-projects' : '/api/sheets';
    
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
} 