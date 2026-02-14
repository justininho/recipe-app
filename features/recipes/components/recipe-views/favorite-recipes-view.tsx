import { Recipe } from '@/features/recipes/types/recipe.types';
import { RecipeList } from '@/features/recipes/components/recipe-list';

type FavoriteRecipesViewProps = {
  recipes: Recipe[];
  favorites: string[];
};

export function FavoriteRecipesView({ recipes, favorites }: FavoriteRecipesViewProps) {
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
  return <RecipeList recipes={favoriteRecipes} numColumns={2} />;
}