export interface RecipeCardInfo {
  id: string;
  title: string;
  image: string;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredientCount: number;
  usedIngredients: Ingredient[];
  unusedIngredients: Ingredient[];
}

export interface Ingredient {
  name: string;
}

export interface RecipeCardInfoState {
  data: RecipeCardInfo[];
}
