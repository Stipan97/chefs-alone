export interface RecipeInfoState {
  data: { recipes: RecipeInfoData[] };
}

export interface RecipeInfoResponse {
  data: RecipeInfoData;
}

export interface RecipeInfoResponseBulk {
  data: RecipeInfoData[];
}

export interface RecipeInfoData {
  id: string;
  title: string;
  analyzedInstructions: RecipeSteps[];
  diets: string[];
  extendedIngredients: Ingredient[];
  image: string;
  instructions: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
}

interface RecipeSteps {
  steps: RecipeStep[];
}

interface RecipeStep {
  number: number;
  step: string;
}

interface Ingredient {
  measures: { metric: { amount: number; unitShort: string } };
  name: string;
}
