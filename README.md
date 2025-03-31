# PlayPreso Frontend

The cross-platform frontend application for the PlayPreso football prediction platform, built with Nuxt.js and Capacitor. This repository contains the codebase that powers both the web application and the iOS/Android mobile apps.

![PlayPreso App](https://via.placeholder.com/800x400?text=PlayPreso+App+Screenshot)

## Overview

PlayPreso is a gamified football prediction platform where users can create predictions, compete with friends, and get real-time match updates. This repository handles the user interface and experience across all platforms.

## Features

- **Cross-platform Development**: Single codebase for web, iOS, and Android
- **Responsive Design**: Optimized UI for all device sizes
- **Push Notifications**: Real-time alerts for match events and prediction results
- **Social Features**: Sharing capabilities and social interaction
- **Offline Support**: Progressive capabilities for improved mobile experience
- **Dark Theme**: Modern dark UI optimized for sporting content

## Tech Stack

- **Frontend Framework**: Nuxt.js 2.x (Vue.js)
- **UI Framework**: Vuetify
- **State Management**: Vuex with persistence
- **Mobile Framework**: Capacitor 6.x
- **Authentication**: JWT-based auth flow
- **Custom Plugins**:
  - pp-capacitor-haptics
  - pp-capacitor-nuxt-swipe

## Project Structure

```
├── assets/            # SCSS, fonts, and static assets
├── components/        # Vue components
├── layouts/           # Page layouts
├── middleware/        # Navigation guards and middleware
├── pages/             # Application views and routes
├── plugins/           # Vue plugins and mixins
├── static/            # Public static files
├── store/             # Vuex store modules
└── capacitor-plugins/ # Custom Capacitor plugins
```

## Development

### Prerequisites

- Node.js (latest LTS version)
- Yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- Capacitor CLI

### Setup

1. Clone the repository
```bash
git clone https://github.com/pietropietro/nuxt-playpreso.git
cd nuxt-playpreso
```

2. Install dependencies
```bash
yarn install
```

3. Run the development server
```bash
# For local development
yarn dev

# To expose to network devices
yarn dev:host
```

### Building for Production

#### Web

```bash
# Generate static site
yarn generate
```

#### iOS

```bash
# Development build
yarn build-ios-dev

# Production build
yarn build-ios-prod
```

#### Android

```bash
# Development build
yarn build-android-dev

# Production build
yarn build-android-prod

# App Bundle for Play Store
yarn build-android-aab
```

## Deployment

The application is deployed as:

- Progressive Web App (PWA) accessible at [playpreso.com](https://playpreso.com)
- Native iOS app available on the [App Store](https://apps.apple.com/app/playpreso)
- Native Android app available on [Google Play](https://play.google.com/store/apps/details?id=com.playpreso.app)

## Related Projects

- [slim-playpreso](https://github.com/pietropietro/slim-playpreso) - Backend API and services
- [nuxt-admin-playpreso](https://github.com/pietropietro/nuxt-admin-playpreso) - Admin dashboard

## License

MIT
