import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import Header from "@/components/header/Header";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getTitleFromPath } from "@/shared/utilities/getTitleFromPath";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CurrentUserProvider>
        <Stack
          screenOptions={{
            header: () => (
              <Header isBackable title={getTitleFromPath(pathname)} />
            ),
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="challenge/[id]" />
        </Stack>
        <StatusBar style="auto" />
      </CurrentUserProvider>
    </ThemeProvider>
  );
}
