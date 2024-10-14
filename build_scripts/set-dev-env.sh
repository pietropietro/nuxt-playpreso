#!/bin/bash

# Function to update the .env file
update_env_file() {
  local api_endpoint=$1
  sed -i '' "s|API_ENDPOINT=.*|API_ENDPOINT=\"$api_endpoint\"|g" ../nuxt-playpreso/.env
  sed -i '' "s|DEBUG=.*|DEBUG=true|g" ../nuxt-playpreso/.env
}

if [[ "$1" == "localhost" ]]; then
  # Revert to localhost
  update_env_file "http://localhost:8080"
  echo "API_ENDPOINT reverted to: http://localhost:8080"
else
  # Find the local IP address
  IP_ADDRESS=$(ipconfig getifaddr en0)

  # Check if IP_ADDRESS has a value
  if [ -z "$IP_ADDRESS" ]; then
      echo "No IP address found."
      exit 1
  fi

  # Export API_ENDPOINT with your local IP
  API_ENDPOINT="http://$IP_ADDRESS:8080"
  echo "API_ENDPOINT set to: $API_ENDPOINT"

  # Update the .env file to reflect the correct API_ENDPOINT
  update_env_file "$API_ENDPOINT"
fi

# Now run the subsequent commands
shift
exec "$@"
