import {
  Button,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeInfoData, RecipeInfoResponse } from '../../../models/recipeInfo';

import './recipe-info.css';

interface routerRecipeParams {
  id: string;
}

export const RecipeInfo: React.FC = () => {
  const { id } = useParams<routerRecipeParams>();
  const [recipeInfo, setRecipeInfo] = useState<RecipeInfoData>();
  const [checked, setChecked] = useState([0]);

  const handleCheckList = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    currentIndex === -1
      ? newChecked.push(index)
      : newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
      )
      .then((response: RecipeInfoResponse) => {
        setRecipeInfo(response.data);
      });
  }, [id]);

  return (
    <>
      {recipeInfo ? (
        <div className="recipe__container">
          <h1 className="recipe__title">{recipeInfo.title}</h1>
          <div className="recipe__main-info-container">
            <img
              className="recipe__image"
              src={recipeInfo.image}
              alt={recipeInfo.title}
            />
            <div className="recipe__main-info">
              <p>
                <span>Diets: </span>
                {recipeInfo.diets.map((diet, index) => (
                  <>
                    {diet}
                    {recipeInfo.diets.length > 1 &&
                    index !== recipeInfo.diets.length - 1
                      ? ', '
                      : ''}
                  </>
                ))}
              </p>
              <p>
                <span>Time: </span>
                {recipeInfo.readyInMinutes} min
              </p>
              <p>
                <span>Servings: </span>
                {recipeInfo.servings} plate/s
              </p>
              <a
                className="anchor--decoration-none"
                href={recipeInfo.sourceUrl}
              >
                <Button variant="contained" color="secondary">
                  Recipe on source page
                </Button>
              </a>
            </div>
          </div>

          <h2>Ingredients</h2>
          <TableContainer className="recipe-table" component={Paper}>
            <Table size="small">
              <TableHead className="recipe-table__header">
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="recipe-table__content">
                {recipeInfo.extendedIngredients.map((ingredient, index) => (
                  <TableRow key={ingredient.name + '-' + index}>
                    <TableCell component="th" scope="row">
                      {ingredient.name}
                    </TableCell>
                    <TableCell align="right">
                      {ingredient.measures.metric.amount}{' '}
                      {ingredient.measures.metric.unitShort}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h2>Step by step instructions</h2>
          <List className="recipe-list__content">
            {recipeInfo.analyzedInstructions.map((item) =>
              item.steps.map((step) => (
                <ListItem
                  key={'listItem-' + step.number}
                  dense
                  button
                  onClick={handleCheckList(step.number)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      color="primary"
                      checked={checked.indexOf(step.number) !== -1}
                    />
                  </ListItemIcon>
                  <ListItemText primary={step.number + '. ' + step.step} />
                </ListItem>
              )),
            )}
          </List>

          <h2>Summary</h2>
          <p
            className="justify-text"
            dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}
          ></p>
        </div>
      ) : (
        <CircularProgress className="recipe-loader" />
      )}
    </>
  );
};
