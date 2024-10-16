#!/bin/bash

# Define variables for keystore, alias, and passwords
PROJECT_DIR="/Users/pietromini/dev/playpreso/nuxt-playpreso/android"  # Update with your actual Android project path
KEYSTORE_PATH="/Users/pietromini/Documents/keystore/playpreso-release-key.jks"
KEY_ALIAS="playpresoreleasekey"
KEYSTORE_PASSWORD="prodpass"
AAB_PATH="/Users/pietromini/dev/playpreso/nuxt-playpreso/android/app/build/outputs/bundle/release/app-release.aab"


# Move to the Android project directory
cd "$PROJECT_DIR" || { echo "Error: Failed to change directory to $PROJECT_DIR"; exit 1; }

# Clean previous builds
./gradlew clean

# Build the Android App Bundle (AAB) for release
./gradlew bundleRelease

# Check if AAB was built successfully
if [ ! -f "$AAB_PATH" ]; then
  echo "Error: AAB not found at $AAB_PATH"
  exit 1
fi

# Sign the AAB with the keystore
echo "Signing the AAB..."
jarsigner -verbose \
  -keystore "$KEYSTORE_PATH" \
  -storepass "$KEYSTORE_PASSWORD" \
  "$AAB_PATH" "$KEY_ALIAS"

# Verify the signed AAB
echo "Verifying the signed AAB..."
jarsigner -verify "$AAB_PATH"

# Final message
echo "Build and signing complete. AAB file located at $AAB_PATH"
