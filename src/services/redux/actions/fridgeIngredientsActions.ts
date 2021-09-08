import { ThunkAction } from 'redux-thunk';
import {
  CLEAR_FRIDGE_INGREDIENTS,
  DELETE_FRIDGE_INGREDIENT,
  GET_FRIDGE_INGREDIENTS,
  SET_FRIDGE_INGREDIENTS,
} from '../../../models';
import {
  FirebaseFridgeIngredientsState,
  FridgeIngredient,
} from '../../../models/fridge';
import { auth, firestore } from '../../firebase/firebaseProvider';
import { fridgeIngredientsReducer } from '../reducers/fridgeIngredientsReducer';

interface SetFridgeIngredientsAction {
  type: typeof SET_FRIDGE_INGREDIENTS;
  payload: FridgeIngredient;
  page: number;
  rowsPerPage: number;
}

interface GetFridgeIngredientsAction {
  type: typeof GET_FRIDGE_INGREDIENTS;
  payload: FirebaseFridgeIngredientsState;
}

interface ClearFridgeIngredientsAction {
  type: typeof CLEAR_FRIDGE_INGREDIENTS;
}

interface DeleteFridgeIngredientAction {
  type: typeof DELETE_FRIDGE_INGREDIENT;
  payload: string;
}

export type FridgeIngredientsActions =
  | SetFridgeIngredientsAction
  | GetFridgeIngredientsAction
  | ClearFridgeIngredientsAction
  | DeleteFridgeIngredientAction;

export const setFridgeIngredients = (
  id: string,
  ingredient: string,
  rowsPerPage: number,
) => {
  return {
    type: SET_FRIDGE_INGREDIENTS,
    payload: { id: id, ingredient: ingredient },
    rowsPerPage: rowsPerPage,
  };
};

export const getFridgeIngredients = (
  page: number,
  rowsPerPage: number,
): ThunkAction<
  void,
  typeof fridgeIngredientsReducer,
  null,
  FridgeIngredientsActions
> => {
  return async (dispatch) => {
    firestore
      .collection('fridges')
      .doc(auth.currentUser?.uid)
      .get()
      .then((doc) => {
        const total = (doc.data() as FirebaseFridgeIngredientsState).total;
        const ingredients = (
          doc.data() as FirebaseFridgeIngredientsState
        ).ingredients
          .reverse()
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        dispatch({
          type: GET_FRIDGE_INGREDIENTS,
          payload: {
            total: total,
            ingredients: ingredients,
          },
        });
      });
  };
};

export const getAllFridgeIngredients = (): ThunkAction<
  void,
  typeof fridgeIngredientsReducer,
  null,
  FridgeIngredientsActions
> => {
  return async (dispatch) => {
    firestore
      .collection('fridges')
      .doc(auth.currentUser?.uid)
      .get()
      .then((doc) => {
        dispatch({
          type: GET_FRIDGE_INGREDIENTS,
          payload: {
            total: (doc.data() as FirebaseFridgeIngredientsState).total,
            ingredients: (doc.data() as FirebaseFridgeIngredientsState)
              .ingredients,
          },
        });
      });
  };
};

export const clearFridgeIngredients = () => {
  return { type: CLEAR_FRIDGE_INGREDIENTS };
};

export const deleteFridgeIngredient = (id: string) => {
  return { type: DELETE_FRIDGE_INGREDIENT, payload: id };
};
