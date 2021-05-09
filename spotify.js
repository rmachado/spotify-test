const axios = require("axios");
const qs = require("querystring");
require("dotenv").config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

function getAuthorizationUrl(redirect_uri) {
  const scopes = "user-read-private user-read-email";
  const encodedScopes = encodeURIComponent(scopes);
  const encodedRedirectUri = encodeURIComponent(redirect_uri);

  return (
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    `&client_id=${client_id}` +
    `&scope=${encodedScopes}` +
    `&redirect_uri=${encodedRedirectUri}`
  );
}

function getAccessToken(code, redirect_uri) {
  const params = {
    grant_type: "authorization_code",
    code,
    redirect_uri,
    client_id,
    client_secret,
  };

  return axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify(params)
  );
}

module.exports = {
  getAuthorizationUrl,
  getAccessToken,
};
