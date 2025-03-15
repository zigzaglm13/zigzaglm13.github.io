require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Spotify credentials (you get these from Spotify Developer Dashboard)
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; // This should be your redirect URL

// Authenticate with Spotify and get an access token
app.get('/authenticate', (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=streaming`;

  res.redirect(authUrl);
});

// Exchange code for access token
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  
  const response = await axios.post(tokenUrl, null, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }
  });

  const { access_token } = response.data;

  // Now you can make authorized API requests using the access token
  res.send('Authenticated! Now you can use the access token for making API requests.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
