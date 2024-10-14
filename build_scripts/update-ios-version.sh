#!/bin/bash

# Load the version from nuxt.config.js
VERSION=$(grep "VERSION" ../nuxt-playpreso/nuxt.config.js | cut -d "'" -f 2)

# Define the path to the Info.plist file
PLIST_PATH="../nuxt-playpreso/ios/App/App/Info.plist"

# Check if Info.plist exists
if [ ! -f "$PLIST_PATH" ]; then
  echo "Error: Info.plist file does not exist at $PLIST_PATH"
  exit 1
fi

# Update the CFBundleShortVersionString and CFBundleVersion in Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $VERSION" "$PLIST_PATH"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $VERSION" "$PLIST_PATH"

echo "Updated iOS version to $VERSION in Info.plist"
