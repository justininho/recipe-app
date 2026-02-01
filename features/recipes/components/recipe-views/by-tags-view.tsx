import {Recipe} from '@/features/recipes/types/recipe.types';
import {FlatList, View} from 'react-native';
import {RecipeTagCard} from "@/features/recipes/components/recipe-tag-card";

type RecipesByTagsViewProps = {
  recipes: Recipe[];
  numColumns?: number;
};

type RecipesByTag = Map<string, Recipe[]>;

export function RecipesByTagsView({recipes, numColumns = 2}: RecipesByTagsViewProps) {
  // Group recipes by tags
  const recipesByTag: RecipesByTag = recipes.reduce((map, recipe) => {
    recipe.tags.forEach(tag => {
      if (!map.has(tag)) map.set(tag, []);
      map.get(tag)!.push(recipe);
    });
    return map;
  }, new Map<string, Recipe[]>());

  const imagesForTag = (tag: string): string[] => {
    const taggedRecipes = recipesByTag.get(tag) || [];
    return taggedRecipes.slice(0, 3).map(recipe => recipe.imageUrl || "");
  }


  return (
    <FlatList
      data={Array.from(recipesByTag)}
      keyExtractor={(item) => item[0]}
      numColumns={numColumns}
      key={numColumns} // Important: Forces re-render when numColumns changes
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View key={item[0]}
              style={{
                flex: 1 / numColumns,
                padding: 8,
                // Add margin for the last item in a row to prevent uneven spacing
                marginRight: (index + 1) % numColumns === 0 ? 0 : 0
              }}
        >
          <RecipeTagCard tag={item[0]} count={item[1].length} images={imagesForTag(item[0])}/>
        </View>
      )}
    />
  );
}