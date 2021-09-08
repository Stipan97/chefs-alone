import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { rootReducerState } from '../../../models';
import { RecipeCard } from '../components/RecipeCard';

import './recipes-list.css';

export const RecipesList: React.FC = () => {
  const recipes = useSelector((state: rootReducerState) => state.recipes.data);

  return (
    <>
      {recipes.length === 0 ? (
        <CircularProgress className="recipe-loader" />
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
};
