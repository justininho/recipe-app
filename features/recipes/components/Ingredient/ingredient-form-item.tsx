import React, {FC} from 'react';
import {View} from 'react-native';
import {MessageSquare, Trash2} from 'lucide-react-native';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {NumberInput} from '@/components/ui/number-input';
import {Card, CardContent, CardFooter} from '@/components/ui/card';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {RecipeFormData} from '@/features/recipes/validation/recipe-schema';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Textarea} from '@/components/ui/textarea';
import {Icon} from "@/components/ui/icon";

type IngredientItemProps = {
  index: number;
  control: Control<RecipeFormData>;
  errors?: FieldErrors<RecipeFormData>;
  onDelete: () => void;
  canDelete: boolean;
};

export const IngredientFormItem: FC<IngredientItemProps> = ({
                                                              index,
                                                              control,
                                                              errors,
                                                              onDelete,
                                                              canDelete,
                                                            }) => {
  return (
    <>
      
      <Card className="mb-2">
        <CardContent style={{marginTop: 0}}>
          <View className="flex-row items-center gap-3">
            {/* Content */}
            <View className="flex-1 gap-3">
              <View>
                <Text className="text-xs text-muted-foreground mb-1">Ingredient</Text>
                <Controller
                  control={control}
                  name={`ingredients.${index}.name`}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="e.g., All-purpose flour"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors?.ingredients?.[index]?.name && (
                  <Text className="text-destructive text-sm mt-1">
                    {errors.ingredients[index].name?.message}
                  </Text>
                )}
              </View>
              
              <View>
                <Text className="text-xs text-muted-foreground mb-1">Preparation</Text>
                <Controller
                  control={control}
                  name={`ingredients.${index}.prepNote`}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="e.g., chopped, diced, minced"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                    />
                  )}
                />
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Text className="text-xs text-muted-foreground mb-1">Amount</Text>
                  <Controller
                    control={control}
                    name={`ingredients.${index}.amount`}
                    render={({field: {onChange, onBlur, value}}) => (
                      <NumberInput
                        keyboardType="number-pad"
                        placeholder="0"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-muted-foreground mb-1">Unit</Text>
                  <Controller
                    control={control}
                    name={`ingredients.${index}.unit`}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder="e.g., cups, tsp"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value || ''}
                      />
                    )}
                  />
                </View>
              </View>
              {errors?.ingredients?.[index]?.amount && (
                <Text className="text-destructive text-sm -mt-2">
                  {errors.ingredients[index].amount?.message}
                </Text>
              )}
            </View>
          
          
          </View>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Popover className="flex-1">
            <PopoverTrigger asChild>
              <Button variant="outline">
                {/* Note Button */}
                <Text>Edit Note</Text>
                {/*<Icon as={ChevronUp}/>*/}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end" side="top">
              <View className="gap-2">
                <Text className="font-semibold">Note</Text>
                <Controller
                  control={control}
                  name={`ingredients.${index}.note`}
                  render={({field: {onChange, onBlur, value}}) => (
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
          {/* Delete Button */}
          {canDelete && (
            // todo: warning alert
            <Button
              className="ml-auto"
              variant="destructive"
              size="icon"
              onPress={onDelete}>
              <Icon as={Trash2}/>
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export const ButtonRow: FC<{
  control: Control<RecipeFormData>,
  index: number,
  onDelete: () => void;
  canDelete: boolean
}> = ({control, index, onDelete, canDelete}) => {
  return (
    <View className="flex flex-row gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-auto">
            {/* Note Button - Left */}
            <MessageSquare size={18} className="text-muted-foreground"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end" side="top">
          <View className="gap-2">
            <Text className="font-semibold">Note</Text>
            <Controller
              control={control}
              name={`ingredients.${index}.note`}
              render={({field: {onChange, onBlur, value}}) => (
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
      
      {/* Delete Button - Right */}
      {canDelete && (
        <Button
          className="ml-auto"
          variant="ghost"
          size="icon"
          onPress={onDelete}
        >
          <Trash2 size={20} color="#ef4444"/>
        </Button>
      )}
    </View>
  );
}