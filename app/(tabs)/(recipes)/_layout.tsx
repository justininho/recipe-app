import {Stack} from 'expo-router';
import React from "react";

export default function RecipesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Recipes',
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          title: 'Add Recipe',
          presentation: 'modal', // Makes it slide up like a modal
        }}
      />
      <Stack.Screen name="tags/[tag]"/>
      {/*<Stack.Screen name="groups/[group]" />*/}
    </Stack>
  );
}