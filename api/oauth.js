// api/oauth.js

import request from 'request';
import { Buffer } from 'buffer';

export default async function handler(req, res) {
  const ClientID = 'eacf52e775994f528cd4156656cd590d';
  const ClientSecret = 'e68f2a0d58794939ac67a1366a826dfd';

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const basicAuth = Buffer.from(`${ClientID}:${ClientSecret}`).toString('base64');

  const options = {
    method: 'POST',
    url: 'https://oauth.fatsecret.com/connect/token',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials',
      scope: 'basic'
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Request error:', error);
      return res.status(500).json({ error: error.message });
    }

    try {
      const data = JSON.parse(body);

      if (response.statusCode !== 200) {
        console.error('API error:', data);
        return res.status(response.statusCode).json({ error: data });
      }

      return res.status(200).json(data);
    } catch (parseError) {
      console.error('Response parsing failed:', body);
      return res.status(500).json({ error: 'Failed to parse response from API.' });
    }
  });
}
