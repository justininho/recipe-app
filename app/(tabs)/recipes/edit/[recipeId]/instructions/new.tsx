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

export default function NewInstructionScreen() {
  const params = useLocalSearchParams<{ recipeId: string }>();
  const { recipeId } = params;
  const router = useRouter();

  const recipe = MOCK_RECIPES.find((r) => r.id === recipeId);
  const stepNumber = (recipe?.instructions.length ?? 0) + 1;

  const { control, handleSubmit, formState: { errors } } = useForm<InstructionFormValues>({
    resolver: zodResolver(instructionFormSchema),
    defaultValues: {
      type: 'Prep',
      description: '',
      minutes: 0,
      seconds: 0,
      equipment: [],
      note: '',
      ingredients: [],
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

  function onSubmit(data: InstructionFormValues) {
    // TODO: replace with API call to add instruction
    console.log('Adding instruction:', { recipeId, order: stepNumber, ...data });
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
          title: recipe.name,
          headerBackTitle: 'Back',
        }}
      />

      {/* Subheader */}
      <View className="px-5 py-3 border-b border-border flex-row items-center gap-3">
        <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
          <Text className="text-xs font-bold text-primary">{stepNumber}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-foreground">New Step</Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Text className="text-xs text-muted-foreground">Step {stepNumber}</Text>
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
        <InstructionForm control={control} errors={errors} />
      </ScrollView>

      {/* Footer */}
      <View className="px-5 py-4 border-t border-border">
        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
          <Text>Add Step</Text>
        </Button>
      </View>
    </View>
  );
}


