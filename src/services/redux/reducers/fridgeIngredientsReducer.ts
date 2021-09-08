import {
  CLEAR_FRIDGE_INGREDIENTS,
  DELETE_FRIDGE_INGREDIENT,
  GET_FRIDGE_INGREDIENTS,
  SET_FRIDGE_INGREDIENTS,
} from '../../../models';
import { FridgeIngredientsState } from '../../../models/fridge';
import { FridgeIngredientsActions } from '../actions/fridgeIngredientsActions';

const INITIAL_STATE: FridgeIngredientsState = {
  total: 0,
  data: [],
};

export const fridgeIngredientsReducer = (
  state: FridgeIngredientsState = INITIAL_STATE,
  action: FridgeIngredientsActions,
) => {
  switch (action.type) {
    case SET_FRIDGE_INGREDIENTS: {
      return {
        ...state,
        data: [
          { id: action.payload.id, ingredient: action.payload.ingredient },
          ...state.data.slice(0, action.rowsPerPage - 1),
        ],
      };
    }
    case GET_FRIDGE_INGREDIENTS: {
      return {
        ...state,
        total: action.payload.total,
        data: action.payload.ingredients,
      };
    }
    case CLEAR_FRIDGE_INGREDIENTS: {
      return {
        data: [],
      };
    }
    case DELETE_FRIDGE_INGREDIENT: {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};
