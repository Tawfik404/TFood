// api/oauth.js

const request = require("request");

module.exports = (req, res) => {
  const ClientID = "eacf52e775994f528cd4156656cd590d";
  const ClientSecret = "e68f2a0d58794939ac67a1366a826dfd";

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const options = {
    method: "POST",
    url: "https://oauth.fatsecret.com/connect/token",
    auth: {
      user: ClientID,
      password: ClientSecret,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "client_credentials",
      scope: "basic",
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error("Request error:", error);
      return res.status(500).json({ error: error.message });
    }

    if (response.statusCode !== 200) {
      console.error("Bad response:", body);
      return res.status(response.statusCode).json({ error: body });
    }

    return res.status(200).json(body);
  });
};
