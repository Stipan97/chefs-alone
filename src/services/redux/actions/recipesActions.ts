import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { SET_RECIPE_LIST } from '../../../models';
import { RecipeCardInfo } from '../../../models/recipes';
import { recipesListReducer } from '../reducers/recipesReducer';

interface SetRecipesListAction {
  type: typeof SET_RECIPE_LIST;
  payload: RecipeCardInfo[];
}

export type RecipesListActions = SetRecipesListAction;

export const setRecipesListAction = (
  ingredients: string[],
): ThunkAction<void, typeof recipesListReducer, null, RecipesListActions> => {
  return async (dispatch) => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?${
          process.env.REACT_APP_SPOONACULAR_API_KEY
        }&ingredients=${ingredients.join(',+')}&number=15`,
      )
      .then((response) => {
        dispatch({
          type: SET_RECIPE_LIST,
          payload: response.data,
        });
      });
  };
};
