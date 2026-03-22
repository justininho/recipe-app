import { Stack } from 'expo-router';
import React from 'react';

export default function EditRecipeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="ingredients/new"
        options={{ headerShown: true, title: 'Add Ingredient' }}
      />
      <Stack.Screen
        name="ingredients/[ingredientId]"
        options={{ headerShown: true, title: 'Edit Ingredient' }}
      />
      <Stack.Screen
        name="instructions/new"
        options={{ headerShown: true, title: 'Add Step' }}
      />
      <Stack.Screen
        name="instructions/[instructionId]/index"
        options={{ headerShown: true, title: 'Edit Instruction' }}
      />
      <Stack.Screen
        name="instructions/[instructionId]/ingredients/new"
        options={{ headerShown: true, title: 'Add Ingredient' }}
      />
      <Stack.Screen
        name="instructions/[instructionId]/ingredients/[ingredientId]"
        options={{ headerShown: true, title: 'Edit Ingredient' }}
      />
    </Stack>
  );
}

