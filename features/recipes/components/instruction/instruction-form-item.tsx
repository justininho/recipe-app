import React, {FC, useRef} from 'react';
import { View } from 'react-native';
import { Trash2, MessageSquare } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { NumberInput } from '@/components/ui/number-input';
import { Card, CardContent } from '@/components/ui/card';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { RecipeFormData } from '@/features/recipes/validation/recipe-schema';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {TriggerRef} from "@rn-primitives/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

type InstructionFormItemProps = {
  id: string; // Add id property
  index: number;
  control: Control<RecipeFormData>;
  errors?: FieldErrors<RecipeFormData>;
  onDelete: () => void;
  canDelete: boolean;
};

export const InstructionFormItem: FC<InstructionFormItemProps> = ({
  id, // Destructure id
  index,
  control,
  errors,
  onDelete,
  canDelete,
}) => {
  const instructionTypes = ['prep', 'cook', 'bake', 'serve', 'other'];
  
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  
  // used by select
  const selectRef = useRef<TriggerRef>(null);
  
  // Workaround for rn-primitives/select not opening on mobile
  function onTouchStart() {
    selectRef.current?.open();
  }

  return (
    <Card key={id} className="mb-2"> {/* Use id as key */}
      <CardContent style={{ marginTop: 0 }}>
        <View className="gap-3 mb-2">
          {/* First Row: Order and Delete Button */}
          <View className="flex-row items-center">
            {/* Step Number Badge */}
            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
              <Text className="text-xs font-bold text-primary">{index + 1}</Text>
            </View>
            {/* Spacer to push delete button to the far right */}
            <View className="flex-1" />
            {/* Delete Button */}
            {canDelete && (
              <Button
                variant="outline"
                size="icon"
                className="ml-auto"
                onPress={onDelete}
              >
                {/* todo: fix color */}
                <Icon as={Trash2} color="#ef4444"/>
              </Button>
            )}
          </View>

          {/* Second Row: Type Select, Minutes, Seconds, Note Button */}
          <View className="flex-row items-end gap-3">
            {/* Type Selector */}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-1">Type</Text>
              <Controller
                control={control}
                name={`instructions.${index}.type`}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={{ label: value || instructionTypes[0], value: value || instructionTypes[0] }}
                    onValueChange={(selected) => onChange(selected?.value || instructionTypes[0])}
                  >
                    <SelectTrigger className="w-full" ref={selectRef} onTouchStart={onTouchStart}>
                      <SelectValue placeholder="Select instruction type" />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-full">
                      <SelectGroup>
                        <SelectLabel>Instruction Type</SelectLabel>
                        {instructionTypes.map((type) => (
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

            {/* Minutes */}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-1">Minutes</Text>
              <Controller
                control={control}
                name={`instructions.${index}.minutes`}
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

            {/* Seconds */}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-1">Seconds</Text>
              <Controller
                control={control}
                name={`instructions.${index}.seconds`}
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

            {/* Note Popover Button */}
            <View className="ml-2 flex-shrink-0 flex items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Icon as={MessageSquare} size={18} className="text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end" side="top">
                  <View className="gap-2">
                    <Text className="font-semibold">Step Note</Text>
                    <Controller
                      control={control}
                      name={`instructions.${index}.note`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Textarea
                          placeholder="Add a note about this step..."
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

          {/* Third Row: Description */}
          <View>
            <Text className="text-xs text-muted-foreground mb-1">Description</Text>
            <Controller
              control={control}
              name={`instructions.${index}.description`}
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  placeholder="Describe this step..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ''}
                  numberOfLines={5}
                />
              )}
            />
            {errors?.instructions?.[index]?.description && (
              <Text className="text-destructive text-sm mt-1">
                {errors.instructions[index]?.description?.message}
              </Text>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
