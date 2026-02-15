import {Stack, useLocalSearchParams} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RecipeList} from '@/features/recipes/components/recipe-list';
import {MOCK_RECIPES} from '@/features/recipes/mocks/recipe.mocks';
import RecipesHeader from "@/features/recipes/components/recipes-header";
import {View} from "react-native";

export default function TagDetailScreen() {
  const {tag} = useLocalSearchParams<{ tag: string }>();
  
  const recipes = MOCK_RECIPES.filter(recipe =>
    recipe.tags.includes(tag)
  );
  
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          title: tag,
          headerTitle: () => <></>
        }}
      />
      
      <View className="px-6">
        <RecipesHeader
          title={tag}
          count={recipes.length}
          inline={true}
        />
      </View>
      
      <RecipeList recipes={recipes} numColumns={2}/>
    </SafeAreaView>
  );
}