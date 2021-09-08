export interface LikedRecipe {
  likedRecipe: string;
}

export interface LikedRecipesState {
  data: LikedRecipe[];
  total: number;
}

export interface FirebaseLikedRecipesState {
  likedRecipes: LikedRecipe[];
  total: number;
}
