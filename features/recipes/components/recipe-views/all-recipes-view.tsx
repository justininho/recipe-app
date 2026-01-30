// features/recipes/components/recipe-views/all-recipes-view.tsx
import { Recipe } from '@/features/recipes/types/recipe.types';
import { RecipeList } from '@/features/recipes/components/recipe-list';

type AllRecipesViewProps = {
  recipes: Recipe[];
};

export function AllRecipesView({ recipes }: AllRecipesViewProps) {
  return <RecipeList recipes={recipes} numColumns={2} />;
}