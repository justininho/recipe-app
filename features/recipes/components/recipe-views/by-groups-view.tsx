import { Recipe, RecipeGroup } from '@/features/recipes/types/recipe.types';
import {FlatList, View} from 'react-native';
import { Text } from '@/components/ui/text';
import { RecipeList } from '@/features/recipes/components/recipe-list';
import {RecipeTagCard} from "@/features/recipes/components/recipe-tag-card";
import {useMemo} from "react";
import RecipeGroupCard from "@/features/recipes/components/recipe-group-card";

type RecipesByGroupsViewProps = {
  recipes: Recipe[];
  groups: RecipeGroup[];
  numColumns?: number;
};

type RecipesByGroup = Map<string, Recipe[]>;

export function RecipesByGroupsView({ recipes, groups, numColumns = 2 }: RecipesByGroupsViewProps) {
  const recipesByGroup: RecipesByGroup = groups.reduce((map, group) => {
    group.recipeIds.forEach(id => {
      const recipe = recipes.find(r => r.id === id);
      if (recipe) {
        if (!map.has(group.name)) map.set(group.name, []);
        map.get(group.name)!.push(recipe);
      }
    })
    return map;
  }, new Map<string, Recipe[]>());

  const images = useMemo(() => recipes.map(r => r.imageUrl).filter(url => url !== undefined), [recipes]);

  return (
    <FlatList
      data={Array.from(recipesByGroup)}
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
          <RecipeGroupCard group={item[0]} count={item[1].length} images={images}/>
        </View>
      )}
    />
  );
}