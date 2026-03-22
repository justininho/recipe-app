import React, { useRef } from 'react';
import { View } from 'react-native';
import { BookOpen, ChefHat, Clock, FileText, Tag } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Controller, Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriggerRef } from '@rn-primitives/select';
import { IngredientItem } from '@/features/recipes/components/Ingredient/ingredient-item';
import { Ingredient } from '@/features/recipes/types/recipe.types';

export const INSTRUCTION_TYPES = ['Prep', 'Cook', 'Bake', 'Serve', 'Other'] as const;

export const instructionFormSchema = z.object({
  type: z.enum(INSTRUCTION_TYPES).optional(),
  description: z.string().min(1, 'Description is required'),
  minutes: z.number().min(0).optional(),
  seconds: z.number().min(0).optional(),
  equipment: z.array(z.string()).optional(),
  note: z.string().optional(),
  ingredients: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, 'Ingredient name is required'),
      amount: z.number().min(0),
      unit: z.string().optional(),
      prepNote: z.string().optional(),
      note: z.string().optional(),
    })
  ).optional(),
});

export type InstructionFormValues = z.infer<typeof instructionFormSchema>;

type InstructionFormProps = {
  control: Control<InstructionFormValues>;
  errors: FieldErrors<InstructionFormValues>;
  onIngredientPress?: (ingredient: Ingredient, index: number) => void;
  onAddIngredient?: () => void;
};

export function InstructionForm({ control, errors, onIngredientPress, onAddIngredient }: InstructionFormProps) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const selectRef = useRef<TriggerRef>(null);

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <View style={{ gap: 20 }}>

      {/* Row 1: Type + Note popover */}
      <View style={{ gap: 6 }}>
        <Text className="text-xs text-muted-foreground">Type</Text>
        <View className="flex-row items-center gap-2">
          <View className="flex-1">
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <Select
                  value={{ label: value || INSTRUCTION_TYPES[0], value: value || INSTRUCTION_TYPES[0] }}
                  onValueChange={(selected) => onChange(selected?.value || INSTRUCTION_TYPES[0])}
                >
                  <SelectTrigger
                    className="w-full"
                    ref={selectRef}
                    onTouchStart={() => selectRef.current?.open()}
                  >
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <BookOpen size={18} className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end" side="bottom">
              <View className="gap-2">
                <Text className="font-semibold">Note</Text>
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
            </PopoverContent>
          </Popover>
        </View>
      </View>

      {/* Row 2: Duration */}
      <View style={{ gap: 6 }}>
        <View className="flex-row items-center gap-1">
          <Icon as={Clock} size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Duration</Text>
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

      {/* Row 3: Description */}
      <View style={{ gap: 6 }}>
        <View className="flex-row items-center gap-1">
          <Icon as={FileText} size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Description <Text className="text-destructive">*</Text></Text>
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

      {/* Row 4: Ingredient list */}
      <View style={{ gap: 6 }}>
        <View className="flex-row items-center gap-1">
          <Icon as={ChefHat} size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Ingredients</Text>
        </View>
        {ingredientFields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`ingredients.${index}`}
            render={({ field: { value } }) => {
              if (!value) return <></>;
              const ingredient: Ingredient = {
                id: value.id ?? field.id,
                name: value.name ?? '',
                amount: value.amount ?? 0,
                unit: value.unit ?? '',
                prepNote: value.prepNote,
                note: value.note,
              };
              return (
                <IngredientItem
                  ingredient={ingredient}
                  onPress={onIngredientPress ? () => onIngredientPress(ingredient, index) : undefined}
                  onDelete={() => removeIngredient(index)}
                />
              );
            }}
          />
        ))}
        <View className="flex items-end">
          <Button
            variant="outline"
            onPress={onAddIngredient ?? (() => appendIngredient({ id: Date.now().toString(), name: '', amount: 0, unit: '' }))}
          >
            <Text className="text-sm text-muted-foreground">+ Add ingredient</Text>
          </Button>
        </View>
      </View>

      {/* Row 5: Equipment */}
      <View style={{ gap: 6 }}>
        <View className="flex-row items-center gap-1">
          <Icon as={Tag} size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Equipment</Text>
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
                <View className="flex items-end">
                  <Button variant="outline" onPress={() => onChange([...items, ''])}>
                    <Text className="text-sm text-muted-foreground">+ Add equipment</Text>
                  </Button>
                </View>
              </View>
            );
          }}
        />
      </View>

    </View>
  );
}

