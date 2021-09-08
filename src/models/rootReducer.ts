import { FridgeIngredientsState } from './fridge';
import { LikedRecipesState } from './likedRecipes';
import { RecipeInfoState } from './recipeInfo';
import { RecipeCardInfoState } from './recipes';
import { UserState } from './user';

export interface rootReducerState {
  user: UserState;
  fridge: FridgeIngredientsState;
  recipes: RecipeCardInfoState;
  recipesInfo: RecipeInfoState;
  likedRecipes: LikedRecipesState;
}
