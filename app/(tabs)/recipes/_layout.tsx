import {Stack} from 'expo-router';
import React from "react";

export default function RecipesLayout() {
  return (
  <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: 'New Recipe',
          headerShown: true,
          presentation: 'modal', // Makes it slide up like a modal
        }}
      />
      <Stack.Screen
        name="view/[id]"
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          title: 'Edit Recipe',
          headerShown: true,
          presentation: 'modal', // Makes it slide up like a modal
        }}
      />
      <Stack.Screen name="tags/[tag]"/>
      <Stack.Screen name="groups/[group]" />
    </Stack>
  );
}