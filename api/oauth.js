// api/oauth.js

// Use node-fetch (CommonJS compatible version 2)
const fetch = require('node-fetch');
// Used for basic auth encoding
const { Buffer } = require('buffer');
// Used to correctly format the request body
const { URLSearchParams } = require('url');

module.exports = async (req, res) => {
  // --- Credentials (Keep these secure, preferably using Environment Variables) ---
  const ClientID = process.env.FATSECRET_CLIENT_ID || 'eacf52e775994f528cd4156656cd590d';
  const ClientSecret = process.env.FATSECRET_CLIENT_SECRET || 'e68f2a0d58794939ac67a1366a826dfd';
  // ---------------------------------------------------------------------------

  // --- CORS Headers ---
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle CORS preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // --------------------

  // --- API Call Logic ---
  const fatSecretUrl = 'https://oauth.fatsecret.com/connect/token';
  const basicAuth = Buffer.from(`${ClientID}:${ClientSecret}`).toString('base64');

  // Prepare the body in 'application/x-www-form-urlencoded' format
  const bodyParams = new URLSearchParams();
  bodyParams.append('grant_type', 'client_credentials');
  bodyParams.append('scope', 'basic');

  try {
    const response = await fetch(fatSecretUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams // URLSearchParams automatically sets the correct body format
    });

    const responseBodyText = await response.text(); // Get body text first for better error logging

    // Attempt to parse the response body as JSON
    let data;
    try {
       data = JSON.parse(responseBodyText);
    } catch (parseError) {
        // If parsing fails, it might be an HTML error page or non-JSON response from FatSecret
        console.error(`FatSecret response status: ${response.status}`);
        console.error('Failed to parse FatSecret response JSON:', responseBodyText);
        console.error('Parsing error:', parseError);
        return res.status(500).json({
             error: 'Received an invalid response from the authentication server.',
             details: responseBodyText // Optionally include details in dev mode
        });
    }


    // Check if the API call was successful (HTTP status 200 OK)
    if (!response.ok) { // response.ok checks for status codes 200-299
      console.error(`FatSecret API error: Status ${response.status}`, data);
      // Return the status code and error message provided by FatSecret if available
      return res.status(response.status).json({
        error: 'Failed to authenticate with FatSecret.',
        details: data // Include the error details from FatSecret's response
      });
    }

    // Success! Return the token data
    console.log('Successfully obtained FatSecret token.');
    return res.status(200).json(data);

  } catch (error) {
    // Handle network errors or other issues with the fetch call itself
    console.error('Error fetching FatSecret token:', error);
    return res.status(500).json({ error: 'An internal server error occurred while contacting the authentication server.' });
  }
  // ---------------------
};