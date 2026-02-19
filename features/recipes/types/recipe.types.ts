export type Recipe = {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];

  // view by
  // move to recipe tags
  tags: string[];

  // todo: preheat
  // todo: oven temp
  // todo: bake time
  // todo: chill time
  // todo: notes
};

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  // todo: maybe add tooltip to prep note
  // todo: prep note
  // todo: note
};

// todo: rename step
export type Instruction = {
  id: string;
  step: number;
  description: string;
  ingredients?: Ingredient[];
  seconds?: number;
  // todo: add type (prep, cook, serve, etc)
  // todo: equipment
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