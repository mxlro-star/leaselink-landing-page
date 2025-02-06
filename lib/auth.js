import { ConfidentialClientApplication } from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
  }
};

const tokenRequest = {
  scopes: ['https://graph.microsoft.com/.default'],
};

let tokenCache = null;
let tokenExpiration = null;

export async function getToken() {
  // Check if we have a valid cached token
  if (tokenCache && tokenExpiration && tokenExpiration > Date.now()) {
    return tokenCache;
  }

  // Initialize MSAL application
  const msalClient = new ConfidentialClientApplication(msalConfig);

  try {
    // Get new token
    const response = await msalClient.acquireTokenByClientCredential(tokenRequest);
    
    // Cache the token
    tokenCache = response.accessToken;
    tokenExpiration = Date.now() + (response.expiresIn * 1000);
    
    return tokenCache;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
} 