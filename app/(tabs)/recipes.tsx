import {View, FlatList, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {Plus} from 'lucide-react-native';
import {MOCK_RECIPES} from "@/features/recipes/mocks/recipe.mocks";
import {RecipeList} from "@/features/recipes/components/recipe-list";

export default function RecipesScreen() {
  const [recipes] = useState(MOCK_RECIPES);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto"/>

      {/* Header */}
      <View className="bg-card px-6 py-5 border-b border-border">
        <Text className="text-3xl font-bold">My Recipes</Text>
        <Text className="text-muted-foreground mt-1">
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
        </Text>
      </View>

      {/* Recipe List */}
      <RecipeList recipes={recipes} />

      {/* Add Recipe FAB */}
      <View className="absolute bottom-8 right-6">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-lg"
          onPress={() => console.log('Add recipes')}
        >
          <Plus size={24} color="white"/>
        </Button>
      </View>
    </SafeAreaView>
  );
}