import {Stack} from 'expo-router';
import React from "react";

export default function RecipesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'default',
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Recipes',
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: 'New Recipe',
          presentation: 'modal', // Makes it slide up like a modal
        }}
      />
      <Stack.Screen
        name="view/[recipeId]"
        options={{
          title: 'Recipe Details',
        }}
      />
      <Stack.Screen
        name="edit/[recipeId]"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="tags/[tag]"/>
      <Stack.Screen name="groups/[group]"/>
    </Stack>
  );
}