// Since dotenv is already installed, just require it
require('dotenv').config();  // This loads the .env file

const isDev = process.env.DEBUG === 'true';  // Read the DEBUG variable

console.log(`process.env.API_ENDPOINT: ${process.env.API_ENDPOINT}`);  // Check if this prints the correct value

const apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:8080'; // Use the API_ENDPOINT or fallback

console.log(`DEBUG mode: ${isDev}`);
console.log(`API Endpoint: ${apiEndpoint}`);

module.exports = {

  appId: 'com.playpreso.app',
  appName: 'PlayPreso',
  webDir: 'dist',
  server: {
    androidScheme: isDev ? 'http' : 'https',
    hostname: isDev ? '0.0.0.0'  : 'localhost', // Serve the app from your local IP during development
  },
};



