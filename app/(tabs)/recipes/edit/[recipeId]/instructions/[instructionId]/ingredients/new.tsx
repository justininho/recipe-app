import React from 'react';
import { ScrollView, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';
import {
  IngredientForm,
  ingredientFormSchema,
  IngredientFormValues,
} from '@/features/recipes/components/Ingredient/ingredient-form';

export default function NewInstructionIngredientScreen() {
  const params = useLocalSearchParams<{ recipeId: string; instructionId: string }>();
  const { recipeId, instructionId } = params;
  const router = useRouter();

  const recipe = MOCK_RECIPES.find((r) => r.id === recipeId);
  const instruction = recipe?.instructions.find((i) => i.id === instructionId);
  const instructionIndex = recipe?.instructions.findIndex((i) => i.id === instructionId) ?? -1;
  const stepNumber = instructionIndex + 1;
  const currentIngredientCount = instruction?.ingredients?.length ?? 0;

  const { control, handleSubmit, formState: { errors } } = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      unit: '',
      prepNote: '',
      note: '',
    },
  });

  function onSubmit(data: IngredientFormValues) {
    // TODO: replace with API call to add ingredient to instruction
    console.log('Adding instruction ingredient:', { recipeId, instructionId, ...data });
    router.back();
  }

  if (!recipe) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Text className="text-muted-foreground text-base">Recipe not found.</Text>
        <Button className="mt-4" onPress={() => router.back()}>
          <Text>Go Back</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          title: `Step ${stepNumber}`,
          headerBackTitle: 'Back',
        }}
      />

      {/* Subheader */}
      <View className="px-5 py-3 border-b border-border">
        <Text className="text-sm font-medium text-foreground">New Ingredient</Text>
        <Text className="text-xs text-muted-foreground mt-0.5">
          Ingredient {currentIngredientCount + 1} · Step {stepNumber}
        </Text>
      </View>

      {/* Scrollable body */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <IngredientForm control={control} errors={errors} />
      </ScrollView>

      {/* Footer */}
      <View className="px-5 py-4 border-t border-border">
        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
          <Text>Add Ingredient</Text>
        </Button>
      </View>
    </View>
  );
}

