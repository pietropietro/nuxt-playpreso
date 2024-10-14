#!/bin/bash

# Check for the environment argument
if [ "$1" == "prod" ]; then
  echo "Setting production environment..."
  ./build_scripts/set-prod-env.sh
  ./build_scripts/update-ios-version.sh
elif [ "$1" == "dev" ]; then
  echo "Setting development environment..."
  ./build_scripts/set-dev-env.sh
  ./build_scripts/update-ios-version.sh
else
  echo "Error: You must provide either 'dev' or 'prod' as an argument."
  exit 1
fi

# Generate Nuxt assets, copy them to iOS, update Capacitor, and open Xcode
yarn generate && npx cap copy ios && npx cap update ios && npx cap open ios
