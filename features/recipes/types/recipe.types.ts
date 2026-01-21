export type Recipe = {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl?: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
};

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};