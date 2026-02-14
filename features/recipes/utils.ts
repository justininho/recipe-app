import {Recipe} from "@/features/recipes/types/recipe.types";

export const getImageUrls = (recipes: Recipe[]) => {
  return recipes.map(r => r.imageUrl).filter(url => url !== undefined);
}