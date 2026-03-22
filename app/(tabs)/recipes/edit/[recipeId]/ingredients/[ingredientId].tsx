import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { BookOpen, ChefHat, FileText, Hash } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { NumberInput } from '@/components/ui/number-input';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriggerRef } from '@rn-primitives/select';
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';

const UNIT_OPTIONS: { label: string; value: string }[] = [
  { label: 'grams (g)', value: 'g' },
  { label: 'kilograms (kg)', value: 'kg' },
  { label: 'milliliters (ml)', value: 'ml' },
  { label: 'liters (l)', value: 'l' },
  { label: 'teaspoon (tsp)', value: 'tsp' },
  { label: 'tablespoon (tbsp)', value: 'tbsp' },
  { label: 'cup', value: 'cup' },
  { label: 'ounces (oz)', value: 'oz' },
  { label: 'pounds (lb)', value: 'lb' },
  { label: 'piece', value: 'piece' },
];

const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.number().min(0),
  unit: z.string().optional(),
  prepNote: z.string().optional(),
  note: z.string().optional(),
});

type IngredientFormData = z.infer<typeof ingredientSchema>;

export default function EditIngredientScreen() {
  const params = useLocalSearchParams<{ recipeId: string; ingredientId: string }>();
  const recipeId = params.recipeId;
  const ingredientId = params.ingredientId;
  const router = useRouter();

  const recipe = MOCK_RECIPES.find((r) => r.id === recipeId);
  const ingredientIndex = recipe?.ingredients.findIndex((i) => i.id === ingredientId) ?? -1;
  const ingredient = ingredientIndex >= 0 ? recipe?.ingredients[ingredientIndex] : undefined;

  const { control, handleSubmit, formState: { errors } } = useForm<IngredientFormData>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: ingredient?.name ?? '',
      amount: ingredient?.amount ?? 0,
      unit: ingredient?.unit ?? '',
      prepNote: ingredient?.prepNote ?? '',
      note: ingredient?.note ?? '',
    },
  });

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const selectRef = useRef<TriggerRef>(null);
  function onTouchStart() {
    selectRef.current?.open();
  }

  function onSubmit(data: IngredientFormData) {
    // TODO: replace with API call
    console.log('Saving ingredient:', { recipeId, ingredientId, ...data });
    router.back();
  }

  if (!recipe || !ingredient) {
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
          title: ingredient.name || 'Edit Ingredient',
          headerBackTitle: 'Back',
        }}
      />

      {/* Subheader */}
      <View className="px-5 py-3 border-b border-border flex-row items-center gap-3">
        <View className="flex-1">
          <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
            {recipe.name}
          </Text>
          <Text className="text-xs text-muted-foreground mt-0.5">
            Ingredient {ingredientIndex >= 0 ? ingredientIndex + 1 : '?'} of {recipe.ingredients.length}
          </Text>
        </View>
      </View>

      {/* Scrollable body */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ gap: 28, paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Name */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={FileText} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Ingredient</Text>
            <Text className="text-xs text-destructive">*</Text>
          </View>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="e.g., All-purpose flour"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text className="text-destructive text-xs">{errors.name.message}</Text>
          )}
        </View>

        {/* Amount + Unit */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={Hash} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Amount & Unit</Text>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-1">Amount</Text>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <NumberInput
                    keyboardType="number-pad"
                    placeholder="0"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value ?? 0}
                  />
                )}
              />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-1">Unit</Text>
              <Controller
                control={control}
                name="unit"
                render={({ field: { onChange, value } }) => {
                  const selected = UNIT_OPTIONS.find((u) => u.value === value);
                  return (
                    <Select
                      value={selected ? { label: selected.label, value: selected.value } : undefined}
                      onValueChange={(option) => onChange(option?.value ?? '')}
                    >
                      <SelectTrigger className="w-full" ref={selectRef} onTouchStart={onTouchStart}>
                        <SelectValue placeholder="Unit (optional)" />
                      </SelectTrigger>
                      <SelectContent insets={contentInsets} className="w-full">
                        <SelectGroup>
                          <SelectLabel>Unit</SelectLabel>
                          {UNIT_OPTIONS.map((u) => (
                            <SelectItem key={u.value} label={u.label} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </View>
          </View>
        </View>

        {/* Prep Note */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={ChefHat} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Preparation</Text>
            <Text className="text-xs text-muted-foreground">(optional)</Text>
          </View>
          <Controller
            control={control}
            name="prepNote"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="e.g., chopped, diced, minced"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ''}
              />
            )}
          />
        </View>

        {/* Note */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={BookOpen} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Note</Text>
            <Text className="text-xs text-muted-foreground">(optional)</Text>
          </View>
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                placeholder="Add a note about this ingredient..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ''}
                numberOfLines={3}
              />
            )}
          />
        </View>
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




