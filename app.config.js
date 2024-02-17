const IS_DEV = process.env.EXPO_PUBLIC_APP_VARIANT === "development";

export default {
  name: IS_DEV ? "DooitApp(Dev)" : "DooitApp",
  slug: "dooit-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/dooit_icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/dooit_splash_screen.png",
    resizeMode: "contain",
    backgroundColor: "#0F172A",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: IS_DEV ? "com.dooitapp.dev" : "com.dooitapp",
    supportsTablet: true,
  },
  android: {
    package: IS_DEV ? "com.dooitapp.dev" : "com.dooitapp",
    adaptiveIcon: {
      foregroundImage: "./assets/images/dooit_icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
  extra: {
    eas: {
      projectId: "f1cc54ce-388c-4cde-a075-6521d41b023c",
    },
  },
};
