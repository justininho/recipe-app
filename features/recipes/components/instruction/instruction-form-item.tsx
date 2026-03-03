import React, {FC, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Trash2, Expand, GripVertical} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { NumberInput } from '@/components/ui/number-input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { RecipeFormData } from '@/features/recipes/validation/recipe-schema';
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
import {InstructionFormModal} from "@/features/recipes/components/instruction/instruction-form-modal";

type InstructionFormItemProps = {
  id: string;
  index: number;
  control: Control<RecipeFormData>;
  errors?: FieldErrors<RecipeFormData>;
  onDelete: () => void;
  canDelete: boolean;
  drag: () => void;
  isActive: boolean;
};

export const InstructionFormItem: FC<InstructionFormItemProps> = ({
  id,
  index,
  control,
  errors,
  onDelete,
  canDelete,
  drag,
  isActive,
}) => {
  const instructionTypes = ['prep', 'cook', 'bake', 'serve', 'other'];

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

  const dragHandleColor = isActive ? 'hsl(var(--primary))' : 'gray';
  const dragHandleOpacity = isActive ? 1 : 0.4;

  const activeStyle = isActive ? {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  } : {};

  return (
    <Card key={id} className={`mb-2 ${isActive ? 'bg-primary/5' : ''}`} style={activeStyle}>
      <CardContent style={{ marginTop: 0 }}>
        <View className="gap-3 mb-2">
          {/* Row 1: Order, Type Select, Expand Button, Drag Handle */}
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
              <Text className="text-xs font-bold text-primary">{index + 1}</Text>
            </View>
            <View className="flex-1">
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
            <InstructionFormModal
              id={id}
              index={index}
              control={control}
              errors={errors}
              trigger={
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Icon as={Expand} size={18} className="text-muted-foreground" />
                </Button>
              }
            />
            <TouchableOpacity
              onPressIn={drag}
              delayLongPress={100}
              hitSlop={8}
              style={{
                opacity: dragHandleOpacity,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                flexShrink: 0,
              }}
            >
              <GripVertical size={18} color={dragHandleColor} />
            </TouchableOpacity>
          </View>

          {/* Row 2: Description */}
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
                  numberOfLines={4}
                />
              )}
            />
            {errors?.instructions?.[index]?.description && (
              <Text className="text-destructive text-sm mt-1">
                {errors.instructions[index]?.description?.message}
              </Text>
            )}
          </View>

          {/* Row 3: Minutes, Seconds, Delete Button */}
          <View className="flex-row items-end gap-3">
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
            {canDelete && (
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onPress={onDelete}
              >
                <Icon as={Trash2} color="#ef4444" />
              </Button>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
