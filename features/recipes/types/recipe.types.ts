export type Recipe = {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl?: string;
  ingredients: Ingredient[];
  instructions: string[];

  // view by
  // move to recipe tags
  tags: string[];
};

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

export type Instruction = {
  id: string;
  step: number;
  description: string;
  ingredients?: Ingredient[];
  seconds?: number;
}

// todo: move to recipe tags
export type RecipeTag = {
  id: string,
  name: string;
  recipeIds: string[];
}

// Groups - collections of recipes organized by theme/purpose
export type RecipeGroup = {
  id: string;
  name: string;
  description?: string;
  recipeIds: string[];
};

export type ViewBy = 'all' | 'favorites' | 'tags' | 'groups';