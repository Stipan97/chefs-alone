import { ThunkAction } from 'redux-thunk';
import {
  ADD_LIKED_RECIPE,
  CLEAR_LIKED_RECIPES,
  GET_LIKED_RECIPES,
  REMOVE_LIKED_RECIPE,
} from '../../../models';
import {
  FirebaseLikedRecipesState,
  LikedRecipe,
  LikedRecipesState,
} from '../../../models/likedRecipes';
import { auth, firestore } from '../../firebase/firebaseProvider';
import { likedRecipesReducer } from '../reducers/likedRecipesReducer';

interface GetLikedRecipesAction {
  type: typeof GET_LIKED_RECIPES;
  payload: LikedRecipesState;
}

interface AddLikedRecipesAction {
  type: typeof ADD_LIKED_RECIPE;
  payload: LikedRecipe;
}

interface RemoveLikedRecipesAction {
  type: typeof REMOVE_LIKED_RECIPE;
  payload: string;
}

interface ClearLikedRecipesAction {
  type: typeof CLEAR_LIKED_RECIPES;
}

export type LikedRecipesActions =
  | GetLikedRecipesAction
  | AddLikedRecipesAction
  | RemoveLikedRecipesAction
  | ClearLikedRecipesAction;

export const getLikedRecipes = (): ThunkAction<
  void,
  typeof likedRecipesReducer,
  null,
  LikedRecipesActions
> => {
  return async (dispatch) => {
    firestore
      .collection('liked-recipes')
      .doc(auth.currentUser?.uid)
      .get()
      .then((doc) => {
        const total = (doc.data() as FirebaseLikedRecipesState).total;
        const likedRecipes = (doc.data() as FirebaseLikedRecipesState)
          .likedRecipes;

        dispatch({
          type: GET_LIKED_RECIPES,
          payload: {
            total: total,
            data: likedRecipes,
          },
        });
      });
  };
};

export const addLikedRecipe = (id: string) => {
  return {
    type: ADD_LIKED_RECIPE,
    payload: { likedRecipe: id },
  };
};

export const clearLikedRecipes = () => {
  return { type: CLEAR_LIKED_RECIPES };
};

export const removeLikedRecipe = (id: string) => {
  return { type: REMOVE_LIKED_RECIPE, payload: id };
};
