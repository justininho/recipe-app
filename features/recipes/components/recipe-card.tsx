import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Recipe } from "@/features/recipes/types/recipe.types";
import { View, Pressable } from "react-native";
import { Text } from '@/components/ui/text';
import { Clock, Users } from "lucide-react-native";
import { Image } from 'expo-image';

type RecipeCardProps = {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
}

export default function RecipeCard({
  recipe,
  onPress,
}: RecipeCardProps) {

  return (
    <Pressable onPress={() => onPress(recipe)}>
      <Card className="mb-4">
        <CardHeader className="p-0">
          <Image
            source={{ uri: recipe.imageUrl }}
            style={{ width: '100%', height: 192 }}
            contentFit="cover"
          />
        </CardHeader>

        <CardContent className="p-4 gap-3">
          <View>
            <CardTitle className="text-2xl">{recipe.name}</CardTitle>
            <CardDescription className="mt-1">
              {recipe.description}
            </CardDescription>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-row items-center gap-2">
              <Clock size={16} color="#666" />
              <Text className="text-sm text-muted-foreground">
                {recipe.prepTime + recipe.cookTime} min
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Users size={16} color="#666" />
              <Text className="text-sm text-muted-foreground">
                {recipe.servings} servings
              </Text>
            </View>
          </View>
        </CardContent>

        <CardFooter className="flex-row flex-wrap gap-2 p-4 pt-0">
          {recipe.tags.map((tag) => (
            <View
              key={tag}
              className="bg-secondary px-3 py-1.5 rounded-full"
            >
              <Text className="text-sm text-secondary-foreground">{tag}</Text>
            </View>
          ))}
        </CardFooter>
      </Card>
    </Pressable>
  );
}