import {Stack, useLocalSearchParams} from 'expo-router';
import {RecipeForm} from "@/features/recipes/components/recipe-form";
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';
import React from "react";

export default function EditRecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = MOCK_RECIPES.find(r => r.id === id);

  // todo: on save.
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: ''
        }}
      />
      <RecipeForm recipe={recipe} onSave={() => console.log('save')}/>;
    </>
  )
}