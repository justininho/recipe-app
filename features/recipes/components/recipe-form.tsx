import React, {FC, useEffect} from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recipeSchema, RecipeFormData } from '@/features/recipes/validation/recipe-schema';
import {Recipe} from "@/features/recipes/types/recipe.types";
import {NumberInput} from "@/components/ui/number-input";

export type RecipeFormProps = {
  recipe?: Recipe;
  onSave: () => void;
}

export const RecipeForm: FC<RecipeFormProps> = ({
  recipe,
  onSave,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      description: '',
      prepTime: 0,
      cookTime: 0,
      servings: 4,
      ingredients: [{ name: '', amount: 0, unit: '' }],
      instructions: [{ step: 1, text: '' }],
      tags: [],
      imageUrl: '',
    },
  });

  useEffect(() => {
    if(recipe) {
      reset(recipe);
    }
  }, [recipe])

  const onSubmit = async (data: RecipeFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log('Recipe data:', data);
      Alert.alert('Success', 'Recipe added successfully!');
      onSave();
      reset();
    } catch {
      Alert.alert('Error', 'Failed to add recipe. Please try again.');
    }
  };

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: 'instructions',
  });

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-4">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View>
              <Text className="text-sm font-medium mb-1">Recipe Title</Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="e.g., Chocolate Chip Cookies"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.name && (
                <Text className="text-destructive text-sm mt-1">{errors.name.message}</Text>
              )}
            </View>

            <View>
              <Text className="text-sm font-medium mb-1">Description</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Brief description of the recipe"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={3}
                  />
                )}
              />
              {errors.description && (
                <Text className="text-destructive text-sm mt-1">{errors.description.message}</Text>
              )}
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-sm font-medium mb-1">Prep Time (min)</Text>
                <Controller
                  control={control}
                  name="prepTime"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="30"
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(parseInt(text) || 0)}
                      value={value.toString()}
                      keyboardType="numeric"
                    />
                  )}
                />
                {errors.prepTime && (
                  <Text className="text-destructive text-sm mt-1">{errors.prepTime.message}</Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium mb-1">Cook Time (min)</Text>
                <Controller
                  control={control}
                  name="cookTime"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="45"
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(parseInt(text) || 0)}
                      value={value.toString()}
                      keyboardType="numeric"
                    />
                  )}
                />
                {errors.cookTime && (
                  <Text className="text-destructive text-sm mt-1">{errors.cookTime.message}</Text>
                )}
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium mb-1">Servings</Text>
              <Controller
                control={control}
                name="servings"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="4"
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(parseInt(text) || 0)}
                    value={value.toString()}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.servings && (
                <Text className="text-destructive text-sm mt-1">{errors.servings.message}</Text>
              )}
            </View>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            {ingredientFields.map((field, index) => (
              <View key={field.id} className="gap-2">
                <View className="flex-row gap-2 items-start">
                  <View className="flex-1 gap-2">
                    <Controller
                      control={control}
                      name={`ingredients.${index}.name`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Ingredient name"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                    />
                    {errors.ingredients?.[index]?.name && (
                      <Text className="text-destructive text-sm">
                        {errors.ingredients[index].name?.message}
                      </Text>
                    )}
                    <View className="flex-row gap-2">
                      <Controller
                        control={control}
                        name={`ingredients.${index}.amount`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <NumberInput
                            keyboardType={"number-pad"}
                            placeholder="Amount"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            className="flex-1"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`ingredients.${index}.unit`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Unit"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || ''}
                            className="flex-1"
                          />
                        )}
                      />
                    </View>
                    {errors.ingredients?.[index]?.amount && (
                      <Text className="text-destructive text-sm">
                        {errors.ingredients[index].amount?.message}
                      </Text>
                    )}
                  </View>
                  {ingredientFields.length > 1 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onPress={() => removeIngredient(index)}
                    >
                      <Trash2 size={18} className="text-destructive-foreground" />
                    </Button>
                  )}
                </View>
              </View>
            ))}
            <Button
              variant="outline"
              onPress={() => appendIngredient({ name: '', amount: 0, unit: '' })}
            >
              <Plus size={18} className="text-foreground mr-2" />
              <Text>Add Ingredient</Text>
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            {instructionFields.map((field, index) => (
              <View key={field.id} className="gap-2">
                <View className="flex-row gap-2 items-start">
                  <Text className="text-lg font-semibold mt-2">{index + 1}.</Text>
                  <View className="flex-1">
                    <Controller
                      control={control}
                      name={`instructions.${index}.text`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Describe this step"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          multiline
                          numberOfLines={2}
                        />
                      )}
                    />
                  </View>
                  {instructionFields.length > 1 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onPress={() => removeInstruction(index)}
                    >
                      <Trash2 size={18} className="text-destructive-foreground" />
                    </Button>
                  )}
                </View>
                {/* Error message for this instruction */}
                {errors.instructions?.[index]?.text && (
                  <Text className="text-destructive text-sm ml-6">
                    {errors.instructions[index].text?.message}
                  </Text>
                )}
              </View>
            ))}
            <Button
              variant="outline"
              onPress={() => appendInstruction({ step: instructionFields.length + 1, text: '' })}
            >
              <Plus size={18} className="text-foreground mr-2" />
              <Text>Add Step</Text>
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          size="lg"
        >
          <Text>{isSubmitting ? 'Saving...' : 'Save Recipe'}</Text>
        </Button>

        <View className="h-8" />
      </View>
    </ScrollView>
  );
}
