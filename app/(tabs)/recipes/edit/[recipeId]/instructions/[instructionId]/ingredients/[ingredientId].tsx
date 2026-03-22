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

export default function EditInstructionIngredientScreen() {
  const params = useLocalSearchParams<{
    recipeId: string;
    instructionId: string;
    ingredientId: string;
  }>();
  const { recipeId, instructionId, ingredientId } = params;
  const router = useRouter();

  const recipe = MOCK_RECIPES.find((r) => r.id === recipeId);
  const instruction = recipe?.instructions.find((i) => i.id === instructionId);
  const ingredientIndex = instruction?.ingredients?.findIndex((i) => i.id === ingredientId) ?? -1;
  const ingredient = ingredientIndex >= 0 ? instruction?.ingredients?.[ingredientIndex] : undefined;

  const instructionIndex = recipe?.instructions.findIndex((i) => i.id === instructionId) ?? -1;
  const stepNumber = instructionIndex + 1;

  const { control, handleSubmit, formState: { errors } } = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: ingredient?.name ?? '',
      amount: ingredient?.amount ?? 0,
      unit: ingredient?.unit ?? '',
      prepNote: ingredient?.prepNote ?? '',
      note: ingredient?.note ?? '',
    },
  });

  function onSubmit(data: IngredientFormValues) {
    // TODO: replace with API call
    console.log('Saving instruction ingredient:', { recipeId, instructionId, ingredientId, ...data });
    router.back();
  }

  if (!recipe || !instruction || !ingredient) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Text className="text-muted-foreground text-base">Ingredient not found.</Text>
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
          title: `Step ${stepNumber}`
        }}
      />

      {/* Subheader */}
      <View className="px-5 py-3 border-b border-border">
        <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
          {ingredient.name || 'Ingredient'}
        </Text>
        <Text className="text-xs text-muted-foreground mt-0.5">
          Ingredient {ingredientIndex + 1} of {instruction.ingredients?.length ?? 0} · Step {stepNumber}
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
          <Text>Save</Text>
        </Button>
      </View>
    </View>
  );
}

