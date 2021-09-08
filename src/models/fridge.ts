export interface FridgeIngredient {
  id: string;
  ingredient: string;
}

export interface FirebaseFridgeIngredientsState {
  total: number;
  ingredients: FridgeIngredient[];
}

export interface FridgeIngredientsState {
  total: number;
  data: FridgeIngredient[];
}
