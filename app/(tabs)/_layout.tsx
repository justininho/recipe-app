import {Tabs} from 'expo-router';
import React from 'react';
import {TopNavigation} from "@/components/navigation/top-navigation";
import {Home} from "lucide-react-native";
import RecipesHeader from "@/features/recipes/components/recipes-header";

export default function TabsLayout() {
  return (
    // <View className="flex-1">
    <Tabs
      initialRouteName="recipes"
      tabBar={(props) => <TopNavigation {...props} />}
      screenOptions={{
        headerShown: true,
        tabBarPosition: 'top',
        // tabBarIconStyle: { display: 'none' },
        // tabBarLabelStyle: { fontSize: 16, fontWeight: '600' },
        // tabBarStyle: { borderBottomWidth: 0 },
        tabBarStyle: { backgroundColor: 'white', borderBottomWidth: 0, borderBottomColor: 'white' },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          headerShown: false,
          title: 'Recipes',
          // header: () => <RecipesHeader title="My Recipes" />,
        }}
      />
      <Tabs.Screen
        name="meal-plan"
        options={{
          headerShown: false,
          title: 'Meal Plan',
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          headerShown: false,
          title: 'Groceries',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
        }}
      />

    </Tabs>
  );
}