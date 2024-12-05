import Airtable from 'airtable';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Debug logs
  console.log('Environment variables present:', {
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    apiKey: process.env.AIRTABLE_API_KEY?.slice(0, 5) + '...',
    baseId: process.env.AIRTABLE_BASE_ID
  });

  const { email, partnerEmail } = req.body;
  console.log('Received data:', { email, partnerEmail });

  try {
    // Validate environment variables
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      throw new Error('Missing Airtable credentials');
    }

    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);

    console.log('Attempting to create record...');

    // Create record
    const record = await base('LoveTalks').create([
      {
        fields: {
          'Email': email,
          'partnerEmail': partnerEmail,
        }
      }
    ]);

    console.log('Record created successfully:', record);

    res.status(200).json({ message: 'Successfully added to waitlist' });
  } catch (error) {
    console.error('Airtable Error:', error);
    res.status(500).json({ message: 'Error adding to waitlist' });
  }
} 