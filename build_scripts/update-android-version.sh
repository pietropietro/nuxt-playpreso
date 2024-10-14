#!/bin/bash

# Load the version from nuxt.config.js
VERSION=$(grep "VERSION" ../nuxt-playpreso/nuxt.config.js | cut -d "'" -f 2)

# Define the path to the AndroidManifest.xml file
MANIFEST_PATH="../nuxt-playpreso/android/app/src/main/AndroidManifest.xml"

# Check if AndroidManifest.xml exists
if [ ! -f "$MANIFEST_PATH" ]; then
  echo "Error: AndroidManifest.xml file does not exist at $MANIFEST_PATH"
  exit 1
fi

# Use sed to replace the versionCode and versionName
sed -i '' "s/versionCode [0-9]*/versionCode ${VERSION//./}/" "$MANIFEST_PATH"
sed -i '' "s/versionName \"[^\"]*\"/versionName \"$VERSION\"/" "$MANIFEST_PATH"

echo "Updated Android version to $VERSION in AndroidManifest.xml"
