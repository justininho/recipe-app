import {Stack, useLocalSearchParams} from 'expo-router';
import {RecipeForm} from "@/features/recipes/components/recipe-form";
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';
import React from "react";

export default function EditRecipeScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const recipe = MOCK_RECIPES.find(r => r.id === recipeId);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: recipe?.name ?? 'Edit Recipe' }} />
      <RecipeForm recipe={recipe} recipeId={recipeId} onSave={() => console.log('save')} />
    </>
  );
}