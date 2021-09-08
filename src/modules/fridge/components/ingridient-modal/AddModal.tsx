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
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import {
  auth,
  firestore,
  firestoreRef,
} from '../../../../services/firebase/firebaseProvider';
import { setFridgeIngredients } from '../../../../services/redux/actions/fridgeIngredientsActions';

import './modal.css';

interface AddModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  totalIngredients: number;
  setTotalIngredients: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
}

export const AddModal: React.FC<AddModalProps> = ({
  showModal,
  setShowModal,
  totalIngredients,
  setTotalIngredients,
  rowsPerPage,
}) => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeIngredient = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.currentTarget.value);
  };

  const onClickAddIngredient = () => {
    if (!ingredient) {
      setErrorMessage('This field is required');
      return;
    }

    setErrorMessage('');
    const id = v4();
    firestore
      .collection('fridges')
      .doc(auth.currentUser?.uid)
      .update({
        ingredients: firestoreRef.FieldValue.arrayUnion({
          id: id,
          ingredient: ingredient,
        }),
      });
    setTotalIngredients(totalIngredients + 1);
    setIngredient('');
    dispatch(setFridgeIngredients(id, ingredient, rowsPerPage));
    setShowModal(false);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <div className="modal" onClick={onClickCloseModal}>
          <IconButton className="close-button">
            <CloseIcon />
          </IconButton>
          <Card className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="modal__title" title="Add Ingredient" />
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
                onClick={onClickAddIngredient}
              >
                Add Ingredient
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
