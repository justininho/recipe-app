import { Stack } from 'expo-router';
import React from 'react';

export default function EditRecipeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="instructions/[instructionId]"
        options={{
          headerShown: true,
          title: 'Edit Instruction',
        }}
      />
      <Stack.Screen
        name="ingredients/[ingredientId]"
        options={{
          headerShown: true,
          title: 'Edit Ingredient',
        }}
      />
    </Stack>
  );
}

