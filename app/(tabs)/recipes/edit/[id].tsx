import { useLocalSearchParams } from 'expo-router';
import {RecipeForm} from "@/features/recipes/components/recipe-form";
import { MOCK_RECIPES } from '@/features/recipes/mocks/recipe.mocks';

export default function EditRecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = MOCK_RECIPES.find(r => r.id === id);

  // todo: on save.
  return <RecipeForm recipe={recipe} onSave={() => console.log('save')}/>;
}