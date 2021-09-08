import {
  ADD_LIKED_RECIPE,
  CLEAR_LIKED_RECIPES,
  GET_LIKED_RECIPES,
  REMOVE_LIKED_RECIPE,
} from '../../../models';
import { LikedRecipesState } from '../../../models/likedRecipes';
import { LikedRecipesActions } from '../actions/likedRecipesActions';

const INITIAL_STATE: LikedRecipesState = {
  data: [],
  total: 0,
};

export const likedRecipesReducer = (
  state: LikedRecipesState = INITIAL_STATE,
  action: LikedRecipesActions,
) => {
  switch (action.type) {
    case GET_LIKED_RECIPES: {
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
      };
    }
    case ADD_LIKED_RECIPE: {
      return {
        ...state,
        data: [{ likedRecipe: action.payload.likedRecipe }, ...state.data],
        total: state.total + 1,
      };
    }
    case CLEAR_LIKED_RECIPES: {
      return {
        data: [],
      };
    }
    case REMOVE_LIKED_RECIPE: {
      return {
        ...state,
        data: state.data.filter((item) => item.likedRecipe !== action.payload),
        total: state.total - 1,
      };
    }
    default: {
      return state;
    }
  }
};
