import {
  LOGOUT_CURRENT_USER,
  SET_CURRENT_USER,
  UserState,
} from '../../../models';
import { CurrentUserActions } from '../actions/currentUserActions';

const INITIAL_STATE: UserState = {
  data: undefined,
};

export const currentUserReducer = (
  state: UserState = INITIAL_STATE,
  action: CurrentUserActions,
) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        data: action.payload,
      };
    }
    case LOGOUT_CURRENT_USER: {
      return {
        data: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
