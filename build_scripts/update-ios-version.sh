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
if [ -z "$CURRENT_BUILD" ]; then
  NEW_BUILD=1
else
  NEW_BUILD=$((CURRENT_BUILD + 1))
fi

# Update the CFBundleShortVersionString and CFBundleVersion in Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $VERSION" "$PLIST_PATH"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $NEW_BUILD" "$PLIST_PATH"

# Update the MARKETING_VERSION and CURRENT_PROJECT_VERSION in project.pbxproj
sed -i '' "s/MARKETING_VERSION = \".*\";/MARKETING_VERSION = \"$VERSION\";/g" "$PBXPROJ_PATH"
sed -i '' "s/CURRENT_PROJECT_VERSION = [0-9]*/CURRENT_PROJECT_VERSION = $NEW_BUILD/g" "$PBXPROJ_PATH"

echo "Updated iOS version to $VERSION and build number to $NEW_BUILD in project.pbxproj and Info.plist"
