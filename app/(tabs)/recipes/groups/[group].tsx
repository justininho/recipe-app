import {Stack, useLocalSearchParams} from "expo-router";
import {MOCK_GROUPS, MOCK_RECIPES} from "@/features/recipes/mocks/recipe.mocks";
import {SafeAreaView} from "react-native-safe-area-context";
import RecipesHeader from "@/features/recipes/components/recipes-header";
import {RecipeList} from "@/features/recipes/components/recipe-list";
import { View } from "react-native";

export default function GroupDetailScreen() {
  const { group } = useLocalSearchParams<{ group: string }>();
  const recipeIds = MOCK_GROUPS.find(g => g.name === group)?.recipeIds || [];
  const recipes = MOCK_RECIPES.filter(
    recipe => recipeIds.includes(recipe.id)
  )

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          title: group,
          headerTitle: () => <></>
        }}
      />
      
      <View className="px-6">
        <RecipesHeader
          title={group}
          count={recipes.length}
        />
      </View>
      
      <RecipeList recipes={recipes} numColumns={2} />
    </SafeAreaView>
  );
}