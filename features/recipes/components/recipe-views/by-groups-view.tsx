import { Recipe, RecipeGroup } from '@/features/recipes/types/recipe.types';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { RecipeList } from '@/features/recipes/components/recipe-list';

type RecipesByGroupsViewProps = {
  recipes: Recipe[];
  groups: RecipeGroup[];
};

export function RecipesByGroupsView({ recipes, groups }: RecipesByGroupsViewProps) {
  return (
    <View>
      {groups.map(group => {
        const groupRecipes = recipes.filter(r => group.recipeIds.includes(r.id));

        return (
          <View key={group.id} className="mb-6">
            <Text className="text-lg font-semibold px-6">{group.name}</Text>
            {group.description && (
              <Text className="text-sm text-muted-foreground px-6 mb-3">
                {group.description}
              </Text>
            )}
            <RecipeList recipes={groupRecipes} numColumns={2} />
          </View>
        );
      })}
    </View>
  );
}