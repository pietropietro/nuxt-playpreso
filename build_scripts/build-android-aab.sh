#!/bin/bash

# Clean previous builds
./gradlew clean

# Build the Android App Bundle (AAB) for release
./gradlew bundleRelease

echo "Build complete. Check app/build/outputs/bundle/release/ for your .aab file."

