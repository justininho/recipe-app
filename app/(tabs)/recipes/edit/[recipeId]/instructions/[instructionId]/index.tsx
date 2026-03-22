import React from 'react';
import { ScrollView, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Clock } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';
import {
  InstructionForm,
  instructionFormSchema,
  InstructionFormValues,
} from '@/features/recipes/components/instruction/instruction-form';

export default function EditInstructionScreen() {
  const params = useLocalSearchParams<{ recipeId: string; instructionId: string }>();
  const recipeId = params.recipeId;
  const instructionId = params.instructionId;
  const router = useRouter();

  const recipe = MOCK_RECIPES.find((r) => r.id === recipeId);
  const instruction = recipe?.instructions.find((i) => i.id === instructionId);
  const instructionIndex = recipe?.instructions.findIndex((i) => i.id === instructionId) ?? 0;

  const { control, handleSubmit, formState: { errors } } = useForm<InstructionFormValues>({
    resolver: zodResolver(instructionFormSchema),
    defaultValues: {
      type: instruction?.type,
      description: instruction?.description ?? '',
      minutes: instruction?.minutes ?? 0,
      seconds: instruction?.seconds ?? 0,
      equipment: instruction?.equipment ?? [],
      note: instruction?.note ?? '',
      ingredients: (instruction?.ingredients ?? []).map((ing) => ({
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit ?? '',
        prepNote: ing.prepNote,
        note: ing.note,
      })),
    },
  });

  const currentType = useWatch({ control, name: 'type' });
  const currentMinutes = useWatch({ control, name: 'minutes' });
  const currentSeconds = useWatch({ control, name: 'seconds' });

  const hasDuration =
    (currentMinutes != null && currentMinutes > 0) ||
    (currentSeconds != null && currentSeconds > 0);
  const durationLabel = hasDuration
    ? `${currentMinutes ?? 0}m ${currentSeconds ?? 0}s`
    : null;

  const stepNumber = instructionIndex + 1;

  function onSubmit(data: InstructionFormValues) {
    // TODO: replace with API call
    console.log('Saving instruction:', { recipeId, instructionId, ...data });
    router.back();
  }

  if (!recipe || !instruction) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Text className="text-muted-foreground text-base">Instruction not found.</Text>
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
          title: recipe.name,
        }}
      />

      {/* Subheader */}
      <View className="px-5 py-3 border-b border-border flex-row items-center gap-3">
        <View className="flex-1">
          <View className="flex-row items-center gap-1 mt-0.5">
            <Text className="text-xs text-muted-foreground">
              Step {stepNumber} of {recipe.instructions.length}
            </Text>
            {currentType && (
              <>
                <Text className="text-xs text-muted-foreground">·</Text>
                <Text className="text-xs text-muted-foreground capitalize">{currentType}</Text>
              </>
            )}
            {durationLabel && (
              <>
                <Text className="text-xs text-muted-foreground">·</Text>
                <Icon as={Clock} size={11} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground">{durationLabel}</Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Scrollable body */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <InstructionForm
          control={control}
          errors={errors}
          onIngredientPress={(ingredient) =>
            router.push(`/(tabs)/recipes/edit/${recipeId}/instructions/${instructionId}/ingredients/${ingredient.id}` as any)
          }
          onAddIngredient={() =>
            router.push(`/(tabs)/recipes/edit/${recipeId}/instructions/${instructionId}/ingredients/new` as any)
          }
        />
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



