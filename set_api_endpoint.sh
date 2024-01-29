#!/bin/bash

# Find the local IP address
# This command gets the IP address assigned to your primary network interface.
# You might need to adjust this command depending on your system configuration.
IP_ADDRESS=$(ipconfig getifaddr en0)

# Check if IP_ADDRESS has a value
if [ -z "$IP_ADDRESS" ]; then
    echo "No IP address found."
    exit 1
fi

# Export API_ENDPOINT with your local IP
export API_ENDPOINT="http://$IP_ADDRESS:8080"

# Now run the subsequent commands
"$@"