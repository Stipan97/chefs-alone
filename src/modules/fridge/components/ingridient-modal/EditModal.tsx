import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FirebaseFridgeIngredientsState,
  FridgeIngredient,
} from '../../../../models/fridge';
import {
  auth,
  firestore,
} from '../../../../services/firebase/firebaseProvider';
import { getFridgeIngredients } from '../../../../services/redux/actions/fridgeIngredientsActions';

interface EditModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  ingredients: FridgeIngredient[];
  page: number;
  rowsPerPage: number;
}

export const EditModal: React.FC<EditModalProps> = ({
  setShowModal,
  id,
  ingredients,
  page,
  rowsPerPage,
}) => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeIngredient = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.currentTarget.value);
  };

  const onClickEditIngredient = () => {
    if (!ingredient) {
      setErrorMessage('This field is required');
      return;
    }

    setErrorMessage('');
    ingredients[
      ingredients.findIndex((ingredient) => ingredient.id === id)
    ].ingredient = ingredient;

    firestore
      .collection('fridges')
      .doc(auth.currentUser?.uid)
      .get()
      .then((doc) => {
        const responseIngridients = (
          doc.data() as FirebaseFridgeIngredientsState
        ).ingredients;
        responseIngridients[
          responseIngridients.findIndex((item) => item.id === id)
        ] = { id: id, ingredient: ingredient };
        firestore
          .collection('fridges')
          .doc(auth.currentUser?.uid)
          .update({
            ingredients: responseIngridients,
          })
          .then(() => {
            dispatch(getFridgeIngredients(page, rowsPerPage));
            setShowModal(false);
          });
      });
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setIngredient(
      ingredients.filter((ingredient) => ingredient.id === id)[0].ingredient,
    );
  }, [id, ingredients]);

  return (
    <>
      <div className="modal" onClick={onClickCloseModal}>
        <IconButton className="close-button">
          <CloseIcon />
        </IconButton>
        <Card className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
          <CardHeader title="Edit Ingredient" />
          <CardContent className="modal__wrapper__content">
            <FormControl>
              <InputLabel
                htmlFor="ingredient"
                error={errorMessage ? true : false}
              >
                Ingredient
              </InputLabel>
              <Input
                id="ingredient"
                type="text"
                value={ingredient}
                onChange={onChangeIngredient}
              />
              {errorMessage ? (
                <FormHelperText error id="ingredient">
                  {errorMessage}
                </FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
            <Button
              className="modal-content__button"
              variant="contained"
              color="primary"
              onClick={onClickEditIngredient}
            >
              Edit Ingredient
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
