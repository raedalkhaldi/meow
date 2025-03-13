import { NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';

export async function POST() {
  try {
    // Load the service account key from environment variables
    const key = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    // Create a JWT client
    const client = new JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Get an access token
    const token = await client.getAccessToken();

    // Return the access token
    return NextResponse.json({ accessToken: token.token });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate access token' },
      { status: 500 }
    );
  }
} 