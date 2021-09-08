import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootReducerState } from '../../../models';
import {
  RecipeInfoData,
  RecipeInfoResponseBulk,
} from '../../../models/recipeInfo';
import { RecipeCardSummary } from '../../../shared/modules/recipe-card-summary/RecipeCardSummary';

import './liked-recipes.css';

export const LikedRecipes: React.FC = () => {
  const likedRecipes = useSelector(
    (state: rootReducerState) => state.likedRecipes.data,
  );
  const totalRecipes = useSelector(
    (state: rootReducerState) => state.likedRecipes.total,
  );
  const [likedRecipesData, setLikedRecipesData] = useState<RecipeInfoData[]>();

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/informationBulk?${
          process.env.REACT_APP_SPOONACULAR_API_KEY
        }&ids=${likedRecipes.map((item) => item.likedRecipe).join(',')}`,
      )
      .then((response: RecipeInfoResponseBulk) => {
        setLikedRecipesData(response.data);
      });
  }, [likedRecipes]);

  return (
    <div className="liked-container">
      <h1>Liked Recipes</h1>
      {totalRecipes > 0 ? (
        <div className="liked-grid">
          {likedRecipesData?.length === 0 ? (
            <CircularProgress />
          ) : (
            <>
              {likedRecipesData?.map((recipe) => (
                <RecipeCardSummary key={recipe.id} recipe={recipe} />
              ))}
            </>
          )}
        </div>
      ) : (
        <h2>You did not like any recipes.</h2>
      )}
    </div>
  );
};
