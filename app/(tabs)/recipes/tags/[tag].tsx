import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecipeList } from '@/features/recipes/components/recipe-list';
import RecipesHeader from '@/features/recipes/components/recipes-header';
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';

export default function TagDetailScreen() {
  const { tag } = useLocalSearchParams<{ tag: string }>();

  const recipes = MOCK_RECIPES.filter(recipe =>
    recipe.tags.includes(tag)
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />

      <RecipesHeader
        title={tag}
        count={recipes.length}
        showBackButton={true}
      />

      <RecipeList recipes={recipes} numColumns={2} />
    </SafeAreaView>
  );
}