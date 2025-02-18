// Since dotenv is already installed, just require it
require('dotenv').config();  // This loads the .env file

const isDev = process.env.DEBUG === 'true';  // Read the DEBUG variable

console.log(`process.env.API_ENDPOINT: ${process.env.API_ENDPOINT}`);  // Check if this prints the correct value

const apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:8080'; // Use the API_ENDPOINT or fallback

console.log(`DEBUG mode: ${isDev}`);
console.log(`API Endpoint: ${apiEndpoint}`);

// Extract hostname from API_ENDPOINT
const getHostname = () => {
  if(!isDev) return 'localhost';

  //in dev hostname needs to be the public ip
  const endpoint = process.env.API_ENDPOINT;
  
  // Use regex to extract hostname (supports IPv4, IPv6, and domain names)
  const matches = endpoint.match(/^(?:https?:\/\/)?([^:\/]+)/);
  return matches ? matches[1] : 'localhost';
};

const apiHostname = getHostname();

console.log(`Using hostname: ${apiHostname}`);

module.exports = {

  appId: 'com.playpreso.app',
  appName: 'PlayPreso',
  webDir: 'dist',
  server: {
    androidScheme: isDev ? 'http' : 'https',
    hostname: apiHostname, 
  },
  plugins: {
    Badge: {
      persist: true,  
      autoClear: false
    }
  }
};
