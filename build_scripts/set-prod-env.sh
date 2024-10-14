#!/bin/bash

# Function to update the .env file for production
update_env_file() {
  sed -i '' "s|API_ENDPOINT=.*|API_ENDPOINT=\"https://api.playpreso.com\"|g" ../nuxt-playpreso/.env
  sed -i '' "s|DEBUG=.*|DEBUG=false|g" ../nuxt-playpreso/.env
}

echo "Setting production environment in .env"
update_env_file
echo ".env updated for production"
