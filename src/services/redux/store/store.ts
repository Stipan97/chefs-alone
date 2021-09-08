import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { currentUserReducer } from '../reducers/currentUserReducer';
import { fridgeIngredientsReducer } from '../reducers/fridgeIngredientsReducer';
import { infoRecipeReducer } from '../reducers/infoRecipeReducer';
import { likedRecipesReducer } from '../reducers/likedRecipesReducer';
import { recipesListReducer } from '../reducers/recipesReducer';

export const store = createStore(
  combineReducers({
    user: currentUserReducer,
    fridge: fridgeIngredientsReducer,
    recipes: recipesListReducer,
    recipesInfo: infoRecipeReducer,
    likedRecipes: likedRecipesReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);
