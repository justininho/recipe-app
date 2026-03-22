import {Link, Stack, useLocalSearchParams} from 'expo-router';
import {MOCK_RECIPES} from '@/features/recipes/mocks/recipe.mocks';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {ScrollView, View} from 'react-native';
import {Image} from "expo-image";
import React from "react";
import {ChefHat, Clock, MoveRight, SquarePen} from "lucide-react-native";
import {Icon} from "@/components/ui/icon";
import {Badge} from "@/components/ui/badge";

export default function RecipeScreen() {
  const {recipeId} = useLocalSearchParams<{ recipeId: string }>();
  const recipe = MOCK_RECIPES.find(r => r.id === recipeId);
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: recipe ? recipe?.name : 'Recipe Details',
          headerTitle: () => <></>,
          headerRight: () => <>
            <View className="px-6">
              <Link href={`/recipes/edit/${recipeId}`} asChild>
                <Button variant="outline" size="icon">
                  <Icon as={SquarePen}></Icon>
                </Button>
              </Link>
            </View>
          </>
        }}
      />
      
      {!recipe ? (
        <Text>Recipe not found</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          
          <View className="flex">
            <Image
              className="flex w-100"
              style={{height: 250}}
              source={recipe?.imageUrl}
              contentFit="cover"
            />
          </View>
          
          <View className="p-4">
            <View className="mb-2">
              <Text className="text-2xl font-bold">{recipe.name}</Text>
              <Text className="text-sm text-muted-foreground">{recipe.description}</Text>
              <View className="flex-row gap-2 mt-3">
                <Badge variant="secondary" className="flex-row items-center gap-1 px-3 py-1">
                  <Icon as={Clock} size={12}/>
                  <Text className="text-xs">Prep {recipe.prepTime}m</Text>
                </Badge>
                <Badge variant="secondary" className="flex-row items-center gap-1 px-3 py-1">
                  <Icon as={ChefHat} size={12}/>
                  <Text className="text-xs">Cook {recipe.cookTime}m</Text>
                </Badge>
              </View>
            </View>
            
            
            {/* Ingredients */}
            <View className="mb-4">
              <Text className="text-lg font-semibold mb-1">Ingredients:</Text>
              {recipe.ingredients.map(({name}, index) => (
                <Text key={index} className="text-sm text-muted-foreground">
                  - {name}
                </Text>
              ))}
            </View>
            
            {/* Instructions */}
            <View>
              <Text className="text-lg font-semibold mb-1">Instructions:</Text>
              {recipe.instructions.map(({order, description}, index) => (
                <Text key={index} className="text-sm text-muted-foreground">
                  {order}. {description}
                </Text>
              ))}
            </View>
            
            <View className="mt-6">
              {/* todo: link*/}
              {/*<Link href={`/recipes/edit/${id}`} asChild>*/}
              <Button variant="outline">
                <Text>Cook Recipe</Text>
                <Icon as={MoveRight}/>
              </Button>
              {/*</Link>*/}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}