#!/bin/bash

# Check for the environment argument
if [ "$1" == "prod" ]; then
  echo "Setting production environment..."
  ./build_scripts/set-prod-env.sh
  ./build_scripts/update-android-version.sh
elif [ "$1" == "dev" ]; then
  echo "Setting development environment..."
  ./build_scripts/set-dev-env.sh
  ./build_scripts/update-android-version.sh
else
  echo "Error: You must provide either 'dev' or 'prod' as an argument."
  exit 1
fi

# Generate Nuxt assets, copy them to Android, update Capacitor, and open Android Studio
yarn generate && npx cap copy android && npx cap update android && npx cap open android
