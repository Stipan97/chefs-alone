import { SET_RECIPES_INFO } from '../../../models';
import { RecipeInfoState } from '../../../models/recipeInfo';
import { RecipesInfoActions } from '../actions/infoRecipeActions';

const INITIAL_STATE: RecipeInfoState = {
  data: { recipes: [] },
};

export const infoRecipeReducer = (
  state: RecipeInfoState = INITIAL_STATE,
  action: RecipesInfoActions,
) => {
  switch (action.type) {
    case SET_RECIPES_INFO: {
      return {
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
