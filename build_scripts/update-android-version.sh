#!/bin/bash

# Load the version from nuxt.config.js
VERSION=$(grep "VERSION" ../nuxt-playpreso/nuxt.config.js | cut -d "'" -f 2)

# Define the path to the build.gradle file
GRADLE_FILE="../nuxt-playpreso/android/app/build.gradle"

# Check if build.gradle exists
if [ ! -f "$GRADLE_FILE" ]; then
  echo "Error: build.gradle file does not exist at $GRADLE_FILE"
  exit 1
fi

# Convert the version from nuxt.config.js (e.g., "1.35.0") into a versionCode-compatible format (e.g., "13500")
VERSION_CODE=$(echo "$VERSION" | sed 's/\.//g')

# Use sed to replace the versionCode and versionName in build.gradle
sed -i '' "s/versionCode [0-9]*/versionCode $VERSION_CODE/" "$GRADLE_FILE"
sed -i '' "s/versionName \".*\"/versionName \"$VERSION\"/" "$GRADLE_FILE"

echo "Updated Android version to $VERSION and versionCode to $VERSION_CODE in build.gradle"
