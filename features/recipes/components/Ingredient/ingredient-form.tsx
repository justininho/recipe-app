import React, { useRef } from 'react';
import { View } from 'react-native';
import { BookOpen, ChefHat, Hash } from 'lucide-react-native';
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
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriggerRef } from '@rn-primitives/select';

export const UNIT_OPTIONS: { label: string; value: string }[] = [
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

export const ingredientFormSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.number().min(0),
  unit: z.string().optional(),
  prepNote: z.string().optional(),
  note: z.string().optional(),
});

export type IngredientFormValues = z.infer<typeof ingredientFormSchema>;

type IngredientFormProps = {
  control: Control<IngredientFormValues>;
  errors: FieldErrors<IngredientFormValues>;
};

export function IngredientForm({ control, errors }: IngredientFormProps) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const selectRef = useRef<TriggerRef>(null);

  return (
    <View style={{ gap: 20 }}>

      {/* Row 1: Name + Note popover */}
      <View style={{ gap: 6 }}>
        <Text className="text-xs text-muted-foreground">Ingredient <Text className="text-destructive">*</Text></Text>
        <View className="flex-row items-center gap-2">
          <View className="flex-1">
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
              <Text className="text-destructive text-xs mt-1">{errors.name.message}</Text>
            )}
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
                      placeholder="Add a note about this ingredient..."
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

      {/* Row 2: Prep */}
      <View style={{ gap: 6 }}>
        <View className="flex-row items-center gap-1">
          <Icon as={ChefHat} size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Preparation</Text>
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

      {/* Row 3: Amount + Unit */}
      <View style={{ gap: 6 }}>
        <View className="flex-row items-center gap-1">
          <Icon as={Hash} size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Amount & Unit</Text>
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
                    <SelectTrigger
                      className="w-full"
                      ref={selectRef}
                      onTouchStart={() => selectRef.current?.open()}
                    >
                      <SelectValue placeholder="Select unit" />
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

    </View>
  );
}

