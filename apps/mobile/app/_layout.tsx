import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ROUTES } from "@/constants/routes";

import "@repo/ui/styles/globals.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const STACK_OPTIONS = {
  DEFAULT: { headerShown: false },
  DASHBOARD: { headerTitle: "내 회의" },
  SETTINGS: { headerTitle: "세팅" },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={ROUTES.HOME} screenOptions={{ animation: "flip" }}>
        <Stack.Screen name={ROUTES.HOME} options={STACK_OPTIONS.DEFAULT} />
        <Stack.Screen name={ROUTES.DASHBOARD} options={STACK_OPTIONS.DEFAULT} />
        <Stack.Screen name={ROUTES.MEETINGS} options={STACK_OPTIONS.DEFAULT} />
        <Stack.Screen name={ROUTES.SEATS} options={STACK_OPTIONS.DEFAULT} />
        <Stack.Screen name={ROUTES.SETTINGS} options={STACK_OPTIONS.SETTINGS} />
        <Stack.Screen name={ROUTES.NOT_FOUND} />
      </Stack>
    </ThemeProvider>
  );
}
