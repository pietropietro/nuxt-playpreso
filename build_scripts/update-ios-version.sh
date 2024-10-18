#!/bin/bash

# Load the version from nuxt.config.js
VERSION=$(grep "VERSION" ../nuxt-playpreso/nuxt.config.js | cut -d "'" -f 2)

# Define the path to the Info.plist and project.pbxproj files
PLIST_PATH="../nuxt-playpreso/ios/App/App/Info.plist"
PBXPROJ_PATH="../nuxt-playpreso/ios/App/App.xcodeproj/project.pbxproj"

# Check if Info.plist exists
if [ ! -f "$PLIST_PATH" ]; then
  echo "Error: Info.plist file does not exist at $PLIST_PATH"
  exit 1
fi

# Check if project.pbxproj exists
if [ ! -f "$PBXPROJ_PATH" ]; then
  echo "Error: project.pbxproj file does not exist at $PBXPROJ_PATH"
  exit 1
fi

# Extract build number from the project.pbxproj (increment if it's already set)
CURRENT_BUILD=$(grep "CURRENT_PROJECT_VERSION" "$PBXPROJ_PATH" | grep -o '[0-9]*')

# If CURRENT_BUILD is empty, set initial build number to 1
if [ -z "$CURRENT_BUILD" ]; then
  NEW_BUILD=1
  echo "No current build number found. Setting initial build number to 1."
  echo "CURRENT_PROJECT_VERSION = $NEW_BUILD;" >> "$PBXPROJ_PATH"
else
  # Increment the build number
  NEW_BUILD=$((CURRENT_BUILD + 1))
fi

# Ensure that VERSION is not empty
if [ -z "$VERSION" ]; then
  echo "Error: Version number is empty. Check your nuxt.config.js."
  exit 1
fi

# Ensure that NEW_BUILD is not empty or zero
if [ -z "$NEW_BUILD" ] || [ "$NEW_BUILD" -le 0 ]; then
  echo "Error: Invalid build number. Check the project.pbxproj file."
  exit 1
fi

# Update the CFBundleShortVersionString and CFBundleVersion in Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $VERSION" "$PLIST_PATH"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $NEW_BUILD" "$PLIST_PATH"

# Ensure MARKETING_VERSION and CURRENT_PROJECT_VERSION are correctly updated in project.pbxproj
if grep -q "MARKETING_VERSION" "$PBXPROJ_PATH"; then
  sed -i '' "s/MARKETING_VERSION = \".*\";/MARKETING_VERSION = \"$VERSION\";/g" "$PBXPROJ_PATH"
else
  echo "MARKETING_VERSION not found, adding it..."
  echo "MARKETING_VERSION = \"$VERSION\";" >> "$PBXPROJ_PATH"
fi

# Ensure CURRENT_PROJECT_VERSION is correctly updated in project.pbxproj
if grep -q "CURRENT_PROJECT_VERSION" "$PBXPROJ_PATH"; then
  sed -i '' "s/CURRENT_PROJECT_VERSION = [0-9]*/CURRENT_PROJECT_VERSION = $NEW_BUILD/g" "$PBXPROJ_PATH"
else
  echo "CURRENT_PROJECT_VERSION not found, adding it..."
  echo "CURRENT_PROJECT_VERSION = $NEW_BUILD;" >> "$PBXPROJ_PATH"
fi

echo "Updated iOS version to $VERSION and build number to $NEW_BUILD in project.pbxproj and Info.plist"
