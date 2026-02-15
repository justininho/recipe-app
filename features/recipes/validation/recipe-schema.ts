import { z } from 'zod';

// Recipe validation schema
export const recipeSchema = z.object({
  name: z.string().min(1, 'Recipe name is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  prepTime: z.number().min(1, 'Prep time must be at least 1 minute').max(1440, 'Prep time is too long'),
  cookTime: z.number().min(0, 'Cook time cannot be negative').max(1440, 'Cook time is too long'),
  servings: z.number().min(1, 'Must serve at least 1 person').max(50, 'Servings is too high'),
  // difficulty: z.enum(['easy', 'medium', 'hard'], {
  //   errorMap: () => ({ message: 'Please select a difficulty level' })
  // }),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, 'Ingredient name is required'),
      amount: z.number().min(0, 'Amount is required'),
      unit: z.string().optional(),
    })
  ).min(1, 'At least one ingredient is required'),
  instructions: z.array(
    z.object({
      step: z.number(),
      text: z.string().min(1, 'Step description is required'),
    })
  ).min(1, 'At least one instruction step is required'),
  tags: z.array(z.string()).optional(),
  imageUrl: z.url('Must be a valid URL').optional().or(z.literal('')),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;