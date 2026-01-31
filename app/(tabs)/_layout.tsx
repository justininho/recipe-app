import {Tabs} from 'expo-router';
import React from 'react';
import {TopNavigation} from "@/components/navigation/top-navigation";
import {Home} from "lucide-react-native";

export default function TabsLayout() {
  return (
    // <View className="flex-1">
    <Tabs
      initialRouteName="recipes"
      tabBar={(props) => <TopNavigation {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarPosition: 'top',
        // tabBarIconStyle: { display: 'none' },
        // tabBarLabelStyle: { fontSize: 16, fontWeight: '600' },
        // tabBarStyle: { backgroundColor: 'white', borderBottomWidth: 0, borderBottomColor: 'white' },
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
          title: 'Recipes',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="meal-plan"
        options={{
          title: 'Meal Plan',
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          title: 'Groceries',
        }}
      />

    </Tabs>
  );
}