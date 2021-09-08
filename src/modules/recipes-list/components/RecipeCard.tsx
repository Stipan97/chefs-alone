import { Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeCardInfo } from '../../../models/recipes';

interface RecipeCardProps {
  recipe: RecipeCardInfo;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const history = useHistory();

  const onClickRecipe = (event: React.MouseEvent<HTMLElement>) => {
    history.push(`/recipe/${event.currentTarget.dataset.id}`);
  };

  return (
    <Card
      onClick={onClickRecipe}
      data-id={recipe.id}
      className="card--fixed-size card--as-link"
    >
      <CardHeader className="card-header__ellipsis" title={recipe.title} />
      <CardContent>
        <img className="card__image" src={recipe.image} alt={recipe.title} />
        <p>Used Ingredients count: {recipe.usedIngredientCount}</p>
        <p>Missed Ingredients count: {recipe.missedIngredientCount}</p>
        <p>
          Unused Ingredients:{' '}
          {recipe.unusedIngredients.length === 0
            ? 'Used all'
            : recipe.unusedIngredients.length}
        </p>
      </CardContent>
    </Card>
  );
};
