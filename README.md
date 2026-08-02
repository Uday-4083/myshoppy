# MyShoppy 🛍️

MyShoppy is a modern, high-performance e-commerce mobile application built using **React Native**, **Expo**, and **TypeScript**. It offers a premium shopping user experience with full shopping cart logic, search, category browsing, and details views, adapting dynamically to the user's system theme (Light/Dark mode).

---

## ✨ Features

- 🏠 **Home Page**: Interactive home screen displaying featured products, categories, search shortcuts, and special offers.
- 🔍 **Smart Search & Filters**: Search products by name, tags, or browse specific categories with responsive filters.
- 📂 **Category Exploration**: Dedicated category pages featuring custom descriptions and count stats.
- 🏷️ **Product Details**: Full product description, image gallery, rating stars, price comparisons (original vs. current), stock information, and tags.
- 🛒 **Cart Management**: Complete React Context-powered cart system allowing users to add/remove products, adjust quantities, and view real-time totals.
- 💳 **Simulated Checkout**: A streamlined checkout process requiring simulated shipping/payment details, culminating in an elegant **Order Confirmation** screen.
- 🌓 **Dynamic Theme (Light/Dark)**: Adaptive colors, text styles, and icons matching system preferences seamlessly.
- ⚙️ **Modern Tech Stack**: File-based routing via `expo-router`, React Native Reanimated for smooth animations, and static TypeScript typing.

---

## 📁 Project Structure

```text
myshoppy/
├── assets/             # App icons, tab icons, and local images
├── src/
│   ├── app/            # Expo Router file-based screens
│   │   ├── (tabs)/     # Primary tab screens (Home, Categories, Cart)
│   │   ├── category/   # Dynamic category slug page
│   │   ├── product/    # Dynamic product details page
│   │   ├── checkout    # Checkout billing and payment flow
│   │   └── ...         # Search, order confirmation, layouts
│   ├── components/     # Reusable UI elements (Product Cards, Star Ratings, Tabs)
│   ├── constants/      # App theme colors and typography sizes
│   ├── data/           # Mock databases (Products and Categories)
│   ├── hooks/          # Custom Hooks (UseTheme, UseColorScheme)
│   ├── store/          # Context stores (Cart Context)
│   └── types/          # TypeScript interface definitions
├── package.json        # Dependencies and execution scripts
└── tsconfig.json       # TypeScript compiler settings
```

---

## 🚀 Getting Started

Follow these steps to download, install, and run the project locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 1. Clone or Download the Project
```bash
git clone https://github.com/Uday-4083/myshoppy.git
cd myshoppy
```

### 2. Install Dependencies
Install all the required NPM packages:
```bash
npm install
```

### 3. Start the Development Server
Run the Metro Bundler:
```bash
npm run start
# or
npx expo start
```

---

## 📱 Running the App

Once the development server is running, you can launch the app on different platforms:

* **Android Emulator / Device**:
  Press **`a`** in the terminal, or run:
  ```bash
  npm run android
  ```
* **iOS Simulator / Device**:
  Press **`i`** in the terminal, or run:
  ```bash
  npm run ios
  ```
* **Web Browser**:
  Press **`w`** in the terminal, or run:
  ```bash
  npm run web
  ```

---

## 🛠️ Built With

- **[Expo (v54)](https://expo.dev/)** - Next-generation development tooling for React Native.
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - Native, file-based router.
- **[React Native Web](https://necolas.github.io/react-native-web/)** - Running the application directly inside modern web browsers.
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - Native-thread execution for micro-interactions and transitions.
