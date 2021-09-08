import { SET_RECIPE_LIST } from '../../../models';
import { RecipeCardInfoState } from '../../../models/recipes';
import { RecipesListActions } from '../actions/recipesActions';

const INITIAL_STATE: RecipeCardInfoState = {
  data: [],
};

export const recipesListReducer = (
  state: RecipeCardInfoState = INITIAL_STATE,
  action: RecipesListActions,
) => {
  switch (action.type) {
    case SET_RECIPE_LIST: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
