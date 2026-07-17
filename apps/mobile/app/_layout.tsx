import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { bootstrapFirebase } from "../src/firebase-init";
import { colors } from "../src/theme";

export default function RootLayout() {
  const [, setReady] = useState(false);

  useEffect(() => {
    bootstrapFirebase();
    setReady(true);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.white },
          headerTitleStyle: { color: colors.ink900, fontWeight: "700" },
          headerTintColor: colors.brand,
          contentStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Recess" }} />
        <Stack.Screen name="events/index" options={{ title: "Events" }} />
        <Stack.Screen name="events/[id]" options={{ title: "Event" }} />
        <Stack.Screen name="login" options={{ title: "Log in" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
