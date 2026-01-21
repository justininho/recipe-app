import {Recipe} from "@/features/recipes/types/recipe.types";
import {FC} from "react";
import RecipeCard from "@/features/recipes/components/recipe-card";
import {FlatList, View} from "react-native";
import {Text} from "@/components/ui/text";

export type RecipeListProps = {
  recipes: Recipe[];
  onPress?: (recipe: Recipe) => void;
}

export const RecipeList: FC<RecipeListProps> = ({recipes, onPress}: RecipeListProps) => {
  const defaultOnPress = (recipe: Recipe) => {
    console.log("Recipe: {recipe} clicked", recipe);
  }
  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <RecipeCard
        recipe={item}
        onPress={onPress ?? defaultOnPress}
      />}
      contentContainerStyle={{padding: 16}}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View className="items-center justify-center py-20">
          <Text className="text-xl text-muted-foreground mb-2">
            No recipes yet
          </Text>
          <Text className="text-muted-foreground">
            Tap + to add your first recipe
          </Text>
        </View>
      }
    />
  )
}