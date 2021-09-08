import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { RecipeInfoData } from '../../../models/recipeInfo';

import './recipe-card-summary.css';

interface RecipeCardProps {
  recipe: RecipeInfoData;
}

export const RecipeCardSummary: React.FC<RecipeCardProps> = ({ recipe }) => {
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
      <CardContent className="card--flex">
        <img className="card__image" src={recipe.image} alt={recipe.title} />
        <p
          className="card__summary"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></p>
        <Button variant="contained" color="secondary">
          Show more
        </Button>
      </CardContent>
    </Card>
  );
};
