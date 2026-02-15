import {Tabs} from 'expo-router';
import React from 'react';
import {TopNavigation} from "@/components/navigation/top-navigation";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="recipes"
      tabBar={(props) => <TopNavigation {...props} />}
      screenOptions={{
        headerShown: true,
        tabBarPosition: 'top',
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