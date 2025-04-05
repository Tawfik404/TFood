// api/oauth.js
module.exports = (req, res) => {   
   let clientID = 'eacf52e775994f528cd4156656cd590d'
   let clientSecret = 'e68f2a0d58794939ac67a1366a826dfd'

   const request = require("request");

   const options = {
      method: 'POST',
      url: 'https://oauth.fatsecret.com/connect/token',
      auth: {
         user: clientID,
         password: clientSecret
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: {
         'grant_type': 'client_credentials',
         'scope': 'basic'
      },
      json: true
   };

   // Add CORS headers
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

   if (req.method === 'OPTIONS') {
      return res.status(200).end(); // Handle pre-flight request
   }

   // Log incoming request
   console.log('Incoming request:', req.method, req.url);

   // Make the external API request
   request(options, (error, response, body) => {
      if (error) {
         console.error('Error during API request:', error);
         return res.status(500).json({ error: error.message });
      }

      console.log('API response status:', response.statusCode);
      console.log('API response body:', body);

      if (response.statusCode !== 200) {
         console.error('API error response:', body);
         return res.status(response.statusCode).json({ error: body });
      }

      return res.status(200).json(body);
   });
};
