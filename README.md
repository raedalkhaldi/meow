# Project Management System

A Next.js application for managing infrastructure projects, using Google Sheets as a backend.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.local.example` to `.env.local` and fill in your Google Sheets credentials:
   ```bash
   cp .env.local.example .env.local
   ```

## Google Sheets Setup

1. Create a new Google Cloud Project
2. Enable the Google Sheets API
3. Create a Service Account and download the credentials
4. Create a new Google Sheet and share it with the service account email
5. Copy the Sheet ID from the URL and add it to your environment variables

## Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the following environment variables in Vercel:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

Note: When adding the `GOOGLE_PRIVATE_KEY` to Vercel:
1. Copy the entire private key from your credentials file
2. Replace all instances of `\n` with actual newlines
3. Wrap the key in double quotes

## Development

Run the development server:
```bash
npm run dev
```

## Building

```bash
npm run build
```

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components
- `/lib` - Utility functions and type definitions 