import React, { FC, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { BookOpen, ChefHat, Clock, FileText, Tag } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { NumberInput } from '@/components/ui/number-input';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/ui/icon';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form';
import { RecipeFormData } from '@/features/recipes/validation/recipe-schema';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriggerRef } from '@rn-primitives/select';

type InstructionFormModalProps = {
  id: string;
  index: number;
  control: Control<RecipeFormData>;
  errors?: FieldErrors<RecipeFormData>;
  trigger: React.ReactNode;
};

const INSTRUCTION_TYPES = ['prep', 'cook', 'bake', 'serve', 'other'] as const;

const TYPE_ICONS: Record<string, typeof ChefHat> = {
  prep: ChefHat,
  cook: ChefHat,
  bake: ChefHat,
  serve: ChefHat,
  other: FileText,
};

export const InstructionFormModal: FC<InstructionFormModalProps> = ({
  id,
  index,
  control,
  errors,
  trigger,
}) => {
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

  const stepNumber = index + 1;

  const currentType = useWatch({ control, name: `instructions.${index}.type` });
  const currentMinutes = useWatch({ control, name: `instructions.${index}.minutes` });
  const currentSeconds = useWatch({ control, name: `instructions.${index}.seconds` });

  const hasDuration =
    (currentMinutes != null && currentMinutes > 0) ||
    (currentSeconds != null && currentSeconds > 0);

  const durationLabel = hasDuration
    ? `${currentMinutes ?? 0}m ${currentSeconds ?? 0}s`
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-full max-w-lg h-full">
        {/* Header */}
        <DialogHeader>
          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center">
              <Text className="text-sm font-bold text-primary">{stepNumber}</Text>
            </View>
            <View>
              <DialogTitle>Step {stepNumber}</DialogTitle>
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
        </DialogHeader>

        <ScrollView
          className="max-h-[70vh]"
          contentContainerClassName="gap-5 pb-2"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Section: Type */}
          <View className="gap-1.5">
            <View className="flex-row items-center gap-2">
              <Icon as={Tag} size={14} className="text-muted-foreground" />
              <Text className="text-sm font-medium text-foreground">Type</Text>
            </View>
            <Controller
              control={control}
              name={`instructions.${index}.type`}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={{
                    label: value || INSTRUCTION_TYPES[0],
                    value: value || INSTRUCTION_TYPES[0],
                  }}
                  onValueChange={(selected) =>
                    onChange(selected?.value || INSTRUCTION_TYPES[0])
                  }
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

          {/* Section: Description */}
          <View className="gap-1.5">
            <View className="flex-row items-center gap-2">
              <Icon as={FileText} size={14} className="text-muted-foreground" />
              <Text className="text-sm font-medium text-foreground">Description</Text>
              <Text className="text-xs text-destructive">*</Text>
            </View>
            <Controller
              control={control}
              name={`instructions.${index}.description`}
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  placeholder="Describe this step in detail..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ''}
                  numberOfLines={5}
                  autoFocus={false}
                />
              )}
            />
            {errors?.instructions?.[index]?.description && (
              <Text className="text-destructive text-xs mt-0.5">
                {errors.instructions[index]?.description?.message}
              </Text>
            )}
          </View>

          {/* Section: Duration */}
          <View className="gap-1.5">
            <View className="flex-row items-center gap-2">
              <Icon as={Clock} size={14} className="text-muted-foreground" />
              <Text className="text-sm font-medium text-foreground">Duration</Text>
            </View>
            <View className="flex-row gap-3">
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
            </View>
          </View>

          {/* Section: Equipment */}
          <View className="gap-1.5">
            <View className="flex-row items-center gap-2">
              <Icon as={ChefHat} size={14} className="text-muted-foreground" />
              <Text className="text-sm font-medium text-foreground">Equipment</Text>
              <Text className="text-xs text-muted-foreground">(optional)</Text>
            </View>
            <EquipmentInput control={control} index={index} />
          </View>

          {/* Section: Note */}
          <View className="gap-1.5">
            <View className="flex-row items-center gap-2">
              <Icon as={BookOpen} size={14} className="text-muted-foreground" />
              <Text className="text-sm font-medium text-foreground">Note</Text>
              <Text className="text-xs text-muted-foreground">(optional)</Text>
            </View>
            <Controller
              control={control}
              name={`instructions.${index}.note`}
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

        <DialogFooter>
          <DialogClose asChild>
            <Button className="flex-1">
              <Text>Done</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ----- Equipment sub-component -----

type EquipmentInputProps = {
  control: Control<RecipeFormData>;
  index: number;
};

const EquipmentInput: FC<EquipmentInputProps> = ({ control, index }) => {
  return (
    <Controller
      control={control}
      name={`instructions.${index}.equipment`}
      render={({ field: { onChange, value } }) => {
        const items: string[] = value ?? [];

        function handleChange(text: string, i: number) {
          const updated = [...items];
          updated[i] = text;
          onChange(updated.filter((_, idx) => idx !== items.length - 1 || text !== ''));
        }

        function handleAdd() {
          onChange([...items, '']);
        }

        function handleRemove(i: number) {
          const updated = items.filter((_, idx) => idx !== i);
          onChange(updated);
        }

        return (
          <View className="gap-2">
            {items.map((item, i) => (
              <View key={i} className="flex-row items-center gap-2">
                <Input
                  className="flex-1"
                  placeholder={`e.g., mixing bowl, whisk`}
                  value={item}
                  onChangeText={(text) => handleChange(text, i)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onPress={() => handleRemove(i)}
                >
                  <Text className="text-destructive font-bold text-base leading-none">×</Text>
                </Button>
              </View>
            ))}
            <Button variant="outline" onPress={handleAdd}>
              <Text className="text-sm text-muted-foreground">+ Add equipment</Text>
            </Button>
          </View>
        );
      }}
    />
  );
};

