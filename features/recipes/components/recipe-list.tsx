import {Recipe} from "@/features/recipes/types/recipe.types";
import {FC} from "react";
import RecipeCard from "@/features/recipes/components/recipe-card";
import {FlatList, View} from "react-native";
import {Text} from "@/components/ui/text";

export type RecipeListProps = {
  recipes: Recipe[];
  numColumns?: number;
}

export const RecipeList: FC<RecipeListProps> = ({recipes, numColumns = 2}: RecipeListProps) => {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      key={numColumns} // Important: Forces re-render when numColumns changes
      contentContainerStyle={{paddingLeft: 16, paddingRight :16, paddingTop: 0, paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View
          style={{
            flex: 1 / numColumns,
            padding: 4,
            // Add margin for the last item in a row to prevent uneven spacing
            marginRight: (index + 1) % numColumns === 0 ? 0 : 0
          }}
        >
          <RecipeCard
            recipe={item}
            href={`/recipes/view/${item.id}`}
          />
        </View>
      )}
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