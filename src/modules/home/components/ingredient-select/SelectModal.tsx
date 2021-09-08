import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormHelperText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FridgeIngredient } from '../../../../models/fridge';
import { rootReducerState } from '../../../../models/rootReducer';
import { auth } from '../../../../services/firebase/firebaseProvider';
import { getAllFridgeIngredients } from '../../../../services/redux/actions/fridgeIngredientsActions';
import { setRecipesListAction } from '../../../../services/redux/actions/recipesActions';

import './select-modal.css';

interface SelectModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectModal: React.FC<SelectModalProps> = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const savedIngredients = useSelector(
    (state: rootReducerState) => state.fridge.data,
  );
  const history = useHistory();
  const [ingredients, setIngredients] = useState<FridgeIngredient[]>(
    savedIngredients ? savedIngredients : [],
  );
  let selectedIngredients: string[] = [];

  const [errorMessage, setErrorMessage] = useState('');

  const onChangeSelectedIngredients = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const ingredientId =
      event.currentTarget.parentElement?.parentElement?.dataset.id;
    const selectedIngredient = ingredients.filter(
      (item) => item.id === ingredientId,
    )[0].ingredient;

    if (checked) {
      selectedIngredients = selectedIngredients.concat(selectedIngredient);
    } else {
      selectedIngredients = selectedIngredients.filter(
        (item) => item !== selectedIngredient,
      );
    }
  };

  const onClickSearchWithSelectedIngredients = () => {
    if (selectedIngredients.length === 0) {
      setErrorMessage('Please select at least one ingredient');
      return;
    }
    setErrorMessage('');
    dispatch(setRecipesListAction(selectedIngredients));
    setShowModal(false);
    history.push('/recipes');
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!auth.currentUser?.uid) {
      return;
    }
    dispatch(getAllFridgeIngredients());
  }, [dispatch]);

  useEffect(() => {
    setIngredients(savedIngredients);
  }, [savedIngredients]);

  return (
    <div className="modal modal--bigger" onClick={onClickCloseModal}>
      <IconButton className="close-button">
        <CloseIcon />
      </IconButton>
      <Card
        className="modal__wrapper modal__wrapper--bigger"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader title="Select Ingredients" />
        <CardContent className="modal__wrapper__content">
          <TableContainer className="card-content__table">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell align="right">Ingredient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        data-id={row.id}
                        onChange={onChangeSelectedIngredients}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {row.ingredient}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {errorMessage ? (
            <FormHelperText error>{errorMessage}</FormHelperText>
          ) : (
            <></>
          )}
          <Button
            className="modal-content__button"
            variant="contained"
            color="primary"
            onClick={onClickSearchWithSelectedIngredients}
          >
            Search with selected ingredients
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
