import {Recipe} from '@/features/recipes/types/recipe.types';
import {FlatList, View} from 'react-native';
import {RecipeTagCard} from "@/features/recipes/components/recipe-tag-card";
import {useMemo} from "react";

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

  const images = useMemo(() => recipes.map(r => r.imageUrl).filter(url => url !== undefined), [recipes]);

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
          <RecipeTagCard tag={item[0]} count={item[1].length} images={images}/>
        </View>
      )}
    />
  );
}