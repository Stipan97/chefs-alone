import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { SET_RECIPES_INFO } from '../../../models';
import { RecipeInfoData } from '../../../models/recipeInfo';
import { infoRecipeReducer } from '../reducers/infoRecipeReducer';

interface SetRecipesInfo {
  type: typeof SET_RECIPES_INFO;
  payload: RecipeInfoData[];
}

export type RecipesInfoActions = SetRecipesInfo;

export const setRecipesInfo = (): ThunkAction<
  void,
  typeof infoRecipeReducer,
  null,
  RecipesInfoActions
> => {
  return async (dispatch) => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random/?${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=3`,
      )
      .then((response) => {
        dispatch({
          type: SET_RECIPES_INFO,
          payload: response.data,
        });
      });
  };
};
