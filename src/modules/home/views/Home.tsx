import { Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { rootReducerState } from '../../../models';
import { setRecipesInfo } from '../../../services/redux/actions/infoRecipeActions';
import { getLikedRecipes } from '../../../services/redux/actions/likedRecipesActions';
import { RecipeCardSummary } from '../../../shared/modules/recipe-card-summary/RecipeCardSummary';
import { SelectModal } from '../components/ingredient-select/SelectModal';

import './home.css';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const randomRecipes = useSelector(
    (state: rootReducerState) => state.recipesInfo.data.recipes,
  );
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const showSelectModal = () => {
    setShowModal(true);
  };

  const onClickGoToFridge = () => {
    history.push('/fridge');
  };

  useEffect(() => {
    if (randomRecipes.length !== 0) {
      return;
    }
    dispatch(setRecipesInfo());
  }, [dispatch, randomRecipes.length]);

  useEffect(() => {
    dispatch(getLikedRecipes());
  }, [dispatch]);

  return (
    <>
      <div className="home-container">
        <Button
          onClick={onClickGoToFridge}
          variant="contained"
          color="secondary"
        >
          Add ingredients to fridge
        </Button>
        <Button onClick={showSelectModal} variant="contained" color="primary">
          Select ingredients & fetch recipes
        </Button>
        <div className="home-grid">
          {randomRecipes.length === 0 ? (
            <CircularProgress />
          ) : (
            <>
              {randomRecipes.map((recipe) => (
                <RecipeCardSummary key={recipe.id} recipe={recipe} />
              ))}
            </>
          )}
        </div>
      </div>

      {showModal ? <SelectModal setShowModal={setShowModal} /> : <></>}
    </>
  );
};
