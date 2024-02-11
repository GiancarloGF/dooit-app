import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, {
  ErrorToast,
  SuccessToast,
  ToastProps,
} from "react-native-toast-message";

import { SessionProvider } from "@/providers/session_provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "login",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    Comfortaa: require("../../assets/fonts/Comfortaa-Regular.ttf"),
    ComfortaaBold: require("../../assets/fonts/Comfortaa-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const toastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};

const queryClient = new QueryClient();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <BottomSheetModalProvider>
          <GestureHandlerRootView
            style={{
              flex: 1,
            }}
          >
            <QueryClientProvider client={queryClient}>
              <Slot />
              <Toast config={toastConfig} />
            </QueryClientProvider>
          </GestureHandlerRootView>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
