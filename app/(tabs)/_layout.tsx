import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import Header from "@/components/header/Header";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCurrentUser } from "@/context/CurrentUserContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const { currentUser } = useCurrentUser();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          header: () => (
            <Header
              title={`Hi ${currentUser?.firstName}`}
              rightIcon={
                <MaterialIcons name="wallet" size={24} color="#F15223" />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: "Challenge",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="trophy.fill" color={color} />
          ),
          header: () => <Header title="Challenge" />,
        }}
      />
      {/* <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trophy.fill" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
