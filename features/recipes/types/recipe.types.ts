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
  id: string;
  name: string;
  amount: number;
  unit: string;
  
  prepNote?: string;
  note?: string;
  // todo: maybe add tooltip to prep note
  // todo: prep note
  // todo: note
};

// todo: rename step
export type Instruction = {
  id: string;
  order: number;
  description: string;
  note?: string;
  ingredients?: Ingredient[];
  minutes?: number;
  seconds?: number;
  type?: 'prep' | 'cook' | 'serve' | 'bake' | 'other';
  equipment?: string[];
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