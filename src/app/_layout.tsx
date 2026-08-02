import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { CartProvider } from "@/store/cart-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="product/[id]"
            options={{
              headerShown: true,
              title: "",
              headerTintColor: "#4CAF91",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#F0F5F3" },
            }}
          />
          <Stack.Screen
            name="category/[slug]"
            options={{
              headerShown: true,
              title: "",
              headerTintColor: "#4CAF91",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#F0F5F3" },
            }}
          />
          <Stack.Screen
            name="search"
            options={{
              headerShown: true,
              title: "Search Products",
              headerTintColor: "#4CAF91",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#F0F5F3" },
            }}
          />
          <Stack.Screen
            name="checkout"
            options={{
              headerShown: true,
              title: "Checkout",
              headerTintColor: "#4CAF91",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#F0F5F3" },
            }}
          />
          <Stack.Screen
            name="order-confirmation"
            options={{ headerShown: false }}
          />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
