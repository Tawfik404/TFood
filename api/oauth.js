// api/oauth.js
module.exports = (req, res) => {
   let ClientID = "eacf52e775994f528cd4156656cd590d";
   let ClientSecret = "e68f2a0d58794939ac67a1366a826dfd";

   const request = require("request");

   const options = {
      method: 'POST',
      url: 'https://oauth.fatsecret.com/connect/token',
      auth: {
         user: ClientID,
         password: ClientSecret
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: {
         'grant_type': 'client_credentials',
         'scope': 'basic'
      },
      json: true
   };


   res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (you can specify a specific origin instead of '*' if needed)
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allow specific HTTP methods
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Allow specific headers

   // If the request is an OPTIONS request (pre-flight request for CORS), send a quick response
   if (req.method === 'OPTIONS') {
      return res.status(200).end();
   }

   
   request(options, (error, response, body) => {
      if (error) {
         // Send a 500 error if something went wrong with the request
         return res.status(500).json({ error: error.message });
      }

      if (response.statusCode !== 200) {
         // Handle non-200 status codes
         return res.status(response.statusCode).json({ error: body });
      }

      // Return the response from the API as a JSON response
      return res.status(200).json(body);
   });
};
