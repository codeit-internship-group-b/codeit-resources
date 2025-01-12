import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { DIR_NAME, ROUTES } from "@/constants/routes";
import { useColorScheme } from "@/hooks/useColorScheme";

import "@repo/ui/styles/globals.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  console.log(pathname);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false, animation: "default" }}>
        <Stack.Screen name={`${DIR_NAME}${ROUTES.HOME}`} />
        <Stack.Screen name={`${DIR_NAME}${ROUTES.DASHBOARD}`} />
        <Stack.Screen name={`${DIR_NAME}${ROUTES.MEETINGS}`} />
        <Stack.Screen name={`${DIR_NAME}${ROUTES.SEATS}`} />
        <Stack.Screen name={`${DIR_NAME}${ROUTES.SETTINGS}`} />
        <Stack.Screen name={ROUTES.NOT_FOUND} />
      </Stack>
    </ThemeProvider>
  );
}
