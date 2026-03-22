import React, {FC, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {RecipeFormData, recipeSchema} from '@/features/recipes/validation/recipe-schema';
import {Recipe} from "@/features/recipes/types/recipe.types";
import DraggableFlatList from 'react-native-draggable-flatlist';
import {ScrollView} from 'react-native-gesture-handler';
import {IngredientItem} from "@/features/recipes/components/Ingredient/ingredient-item";
import {InstructionItem} from "@/features/recipes/components/instruction/instruction-item";
import {useRouter} from "expo-router";

export type RecipeFormProps = {
  recipe?: Recipe;
  recipeId?: string;
  onSave: () => void;
}

export const RecipeForm: FC<RecipeFormProps> = ({
                                                  recipe,
                                                  recipeId,
                                                  onSave,
                                                }) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      description: '',
      prepTime: 0,
      cookTime: 0,
      servings: 4,
      ingredients: [{id: Date.now().toString(), name: '', amount: 0, unit: ''}],
      instructions: [{order: 1, description: ''}],
      tags: [],
      imageUrl: '',
    },
  });
  
  // todo: fix this.
  useEffect(() => {
    if (recipe) {
      reset({
        ...recipe,
        ingredients: recipe.ingredients.map((ingredient) => ({
          id: ingredient.id || Date.now().toString(),
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          prepNote: ingredient.prepNote,
          note: ingredient.note,
        })),
        instructions: recipe.instructions.map((instruction, index) => ({
          id: instruction.id || Date.now().toString(), // Ensure id is set
          order: index + 1,
          description: instruction.description,
          note: instruction.note,
          minutes: instruction.minutes,
          seconds: instruction.seconds,
          type: instruction.type,
          equipment: instruction.equipment,
        })),
      });
    }
  }, [recipe, reset]);
  
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
  
  const {fields: ingredientFields, append: appendIngredient, remove: removeIngredient} = useFieldArray({
    control,
    name: 'ingredients',
  });
  
  const {
    fields: instructionFields,
    append: appendInstruction,
    replace: replaceInstructions,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  // useFieldArray overwrites `id` with its own generated key; watch the real instruction ids from form values
  const watchedInstructions = useWatch({ control, name: 'instructions' });
  const watchedIngredients = useWatch({ control, name: 'ingredients' });
  
  const router = useRouter();
  
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
                render={({field: {onChange, onBlur, value}}) => (
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
                render={({field: {onChange, onBlur, value}}) => (
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
                  render={({field: {onChange, onBlur, value}}) => (
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
                  render={({field: {onChange, onBlur, value}}) => (
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
                render={({field: {onChange, onBlur, value}}) => (
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
        <Card className="gap-2">
          <CardHeader>
            <CardTitle>
              <Text>Ingredients</Text>
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            {ingredientFields.map((field, index) => {
              const ingredient = watchedIngredients?.[index];
              const ingredientWithDefaults = ingredient
                ? { ...ingredient, unit: ingredient.unit ?? '' }
                : { ...field, unit: field.unit ?? '' };
              return (
                <IngredientItem
                  key={field.id}
                  ingredient={ingredientWithDefaults}
                  onPress={recipeId ? () => router.push(`/(tabs)/recipes/edit/${recipeId}/ingredients/${ingredientWithDefaults.id}` as any) : undefined}
                  onDelete={ingredientFields.length > 1 ? () => removeIngredient(index) : undefined}
                />
              );
            })}
            
            <View className="flex items-end">
              <Button variant="outline" onPress={() => router.push(`/(tabs)/recipes/edit/${recipeId}/ingredients/new` as any)}>
                <Text className="text-sm text-muted-foreground">+ Add ingredient</Text>
              </Button>
            </View>
            
          </CardContent>
        </Card>
        
        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <DraggableFlatList
              data={instructionFields}
              keyExtractor={(item) => item.id}
              onDragEnd={({data}) => {
                setTimeout(() => {
                  replaceInstructions(
                    data.map((item, index) => ({...item, order: index + 1}))
                  );
                }, 0);
              }}
              activationDistance={1}
              scrollEnabled={false}
              renderItem={({item, getIndex, drag, isActive}) => {
                const idx = getIndex() ?? 0;
                const instructionId = watchedInstructions?.[idx]?.id ?? item.id;
                return (
                  <InstructionItem
                    instruction={item}
                    index={idx}
                    onPress={() => router.push(`/(tabs)/recipes/edit/${recipeId}/instructions/${instructionId}` as any)}
                    drag={drag}
                    isActive={isActive}
                  />
                );
              }}
            />
            
            <View className="flex items-end">
              <Button
                variant="outline"
                className="mt-2"
                onPress={() => router.push(`/(tabs)/recipes/edit/${recipeId}/instructions/new` as any)}
              >
                <Text className="text-sm text-muted-foreground">+ Add step</Text>
              </Button>
            </View>
            
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
        
        <View className="h-8"/>
      </View>
    </ScrollView>
  );
}
