import {Link, Stack, useLocalSearchParams} from 'expo-router';
import {MOCK_RECIPES} from '@/features/recipes/mocks/recipe.mocks';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {View} from 'react-native';

export default function RecipeScreen() {
  const {id} = useLocalSearchParams<{ id: string }>();
  const recipe = MOCK_RECIPES.find(r => r.id === id);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: recipe?.name ?? 'Recipe'
        }}
      />

      {!recipe ? (
        <Text>Recipe not found</Text>
      ) : (
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{recipe.name}</Text>
          <Text className="text-sm text-muted-foreground mb-4">{recipe.description}</Text>

          {/* Ingredients */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-1">Ingredients:</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index} className="text-sm text-muted-foreground">
                - {ingredient}
              </Text>
            ))}
          </View>

          {/* Instructions */}
          <View>
            <Text className="text-lg font-semibold mb-1">Instructions:</Text>
            {recipe.instructions.map((step, index) => (
              <Text key={index} className="text-sm text-muted-foreground">
                {index + 1}. {step}
              </Text>
            ))}
          </View>
          <View>
            <Link href={`/recipes/edit/${id}`} asChild>
              <Button>
                <Text>Edit Recipe</Text>
              </Button>
            </Link>
          </View>
        </View>
      )}
    </>
  );
}