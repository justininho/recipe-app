import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { BookOpen, ChefHat, Clock, FileText, Tag } from 'lucide-react-native';
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
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriggerRef } from '@rn-primitives/select';
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';

const INSTRUCTION_TYPES = ['prep', 'cook', 'bake', 'serve', 'other'] as const;

const instructionSchema = z.object({
  type: z.enum(INSTRUCTION_TYPES).optional(),
  description: z.string().min(1, 'Description is required'),
  minutes: z.number().min(0).optional(),
  seconds: z.number().min(0).optional(),
  equipment: z.array(z.string()).optional(),
  note: z.string().optional(),
});

type InstructionFormData = z.infer<typeof instructionSchema>;

export default function EditInstructionScreen() {
  const params = useLocalSearchParams<{ recipeId: string; instructionId: string }>();
  const recipeId = params.recipeId;
  const instructionId = params.instructionId;
  const router = useRouter();

  const recipe = MOCK_RECIPES.find((r) => r.id === recipeId);
  const instruction = recipe?.instructions.find((i) => i.id === instructionId);
  const instructionIndex = recipe?.instructions.findIndex((i) => i.id === instructionId) ?? 0;

  const { control, handleSubmit, formState: { errors } } = useForm<InstructionFormData>({
    resolver: zodResolver(instructionSchema),
    defaultValues: {
      type: instruction?.type,
      description: instruction?.description ?? '',
      minutes: instruction?.minutes ?? 0,
      seconds: instruction?.seconds ?? 0,
      equipment: instruction?.equipment ?? [],
      note: instruction?.note ?? '',
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

  const currentType = useWatch({ control, name: 'type' });
  const currentMinutes = useWatch({ control, name: 'minutes' });
  const currentSeconds = useWatch({ control, name: 'seconds' });

  const hasDuration =
    (currentMinutes != null && currentMinutes > 0) ||
    (currentSeconds != null && currentSeconds > 0);

  const durationLabel = hasDuration
    ? `${currentMinutes ?? 0}m ${currentSeconds ?? 0}s`
    : null;

  const stepNumber = (instructionIndex ?? 0) + 1;

  function onSubmit(data: InstructionFormData) {
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
          title: `Step ${stepNumber}`,
          headerBackTitle: 'Back',
        }}
      />

      {/* Subheader */}
      <View className="px-5 py-3 border-b border-border flex-row items-center gap-3">
        <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
          <Text className="text-xs font-bold text-primary">{stepNumber}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
            {recipe.name}
          </Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            {currentType && (
              <Text className="text-xs text-muted-foreground capitalize">{currentType}</Text>
            )}
            {currentType && durationLabel && (
              <Text className="text-xs text-muted-foreground">·</Text>
            )}
            {durationLabel && (
              <View className="flex-row items-center gap-1">
                <Icon as={Clock} size={11} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground">{durationLabel}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Scrollable body */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ gap: 28, paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Type */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={Tag} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Type</Text>
          </View>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                value={{ label: value || INSTRUCTION_TYPES[0], value: value || INSTRUCTION_TYPES[0] }}
                onValueChange={(selected) => onChange(selected?.value || INSTRUCTION_TYPES[0])}
              >
                <SelectTrigger className="w-full" ref={selectRef} onTouchStart={onTouchStart}>
                  <SelectValue placeholder="Select instruction type" />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-full">
                  <SelectGroup>
                    <SelectLabel>Instruction Type</SelectLabel>
                    {INSTRUCTION_TYPES.map((type) => (
                      <SelectItem key={type} label={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </View>

        {/* Description */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={FileText} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Description</Text>
            <Text className="text-xs text-destructive">*</Text>
          </View>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                placeholder="Describe this step in detail..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ''}
                numberOfLines={5}
              />
            )}
          />
          {errors.description && (
            <Text className="text-destructive text-xs">{errors.description.message}</Text>
          )}
        </View>

        {/* Duration */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={Clock} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Duration</Text>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-1">Minutes</Text>
              <Controller
                control={control}
                name="minutes"
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
              <Text className="text-xs text-muted-foreground mb-1">Seconds</Text>
              <Controller
                control={control}
                name="seconds"
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
          </View>
        </View>

        {/* Equipment */}
        <View style={{ gap: 6 }}>
          <View className="flex-row items-center gap-2">
            <Icon as={ChefHat} size={14} className="text-muted-foreground" />
            <Text className="text-sm font-medium text-foreground">Equipment</Text>
            <Text className="text-xs text-muted-foreground">(optional)</Text>
          </View>
          <Controller
            control={control}
            name="equipment"
            render={({ field: { onChange, value } }) => {
              const items: string[] = value ?? [];
              return (
                <View style={{ gap: 8 }}>
                  {items.map((item, i) => (
                    <View key={i} className="flex-row items-center gap-2">
                      <Input
                        className="flex-1"
                        placeholder="e.g., mixing bowl, whisk"
                        value={item}
                        onChangeText={(text) => {
                          const updated = [...items];
                          updated[i] = text;
                          onChange(updated);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onPress={() => onChange(items.filter((_, idx) => idx !== i))}
                      >
                        <Text className="text-destructive font-bold text-base leading-none">×</Text>
                      </Button>
                    </View>
                  ))}
                  <Button variant="outline" onPress={() => onChange([...items, ''])}>
                    <Text className="text-sm text-muted-foreground">+ Add equipment</Text>
                  </Button>
                </View>
              );
            }}
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
                placeholder="Add a note or tip about this step..."
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




