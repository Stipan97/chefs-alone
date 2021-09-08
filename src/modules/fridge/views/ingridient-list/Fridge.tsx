import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerState } from '../../../../models';
import {
  auth,
  firestore,
  firestoreRef,
} from '../../../../services/firebase/firebaseProvider';
import { getFridgeIngredients } from '../../../../services/redux/actions/fridgeIngredientsActions';
import { EditModal } from '../../components/ingridient-modal/EditModal';
import { AddModal } from '../../components/ingridient-modal/AddModal';

import './fridge.css';

export const Fridge: React.FC = () => {
  const dispatch = useDispatch();
  const savedIngredients = useSelector(
    (state: rootReducerState) => state.fridge.data,
  );
  const [ingredients, setIngredients] = useState(
    savedIngredients ? savedIngredients : [],
  );

  const totalIngredients = useSelector(
    (state: rootReducerState) => state.fridge.total,
  );
  const [totalIngredientsState, setTotalIngredientsState] =
    useState(totalIngredients);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idIngredient, setIdIngredient] = useState('');

  const onClickDeleteIngredient = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    firestore
      .collection('fridges')
      .doc(auth.currentUser?.uid)
      .update({
        ingredients: firestoreRef.FieldValue.arrayRemove({
          id: event.currentTarget.dataset.id,
          ingredient: ingredients.filter(
            (item) => item.id === event.currentTarget.dataset.id,
          )[0].ingredient,
        }),
      })
      .then(() => {
        dispatch(getFridgeIngredients(page, rowsPerPage));
      });
  };

  const onClickEditIngredient = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setShowEditModal(true);
    setIdIngredient(event.currentTarget.dataset.id!);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(getFridgeIngredients(newPage, rowsPerPage));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    dispatch(getFridgeIngredients(0, parseInt(event.target.value, 10)));
    setPage(0);
  };

  const onClickShowAddModal = () => {
    setShowAddModal(true);
  };

  useEffect(() => {
    dispatch(getFridgeIngredients(0, 5));
  }, [dispatch]);

  useEffect(() => {
    setTotalIngredientsState(totalIngredients);
  }, [totalIngredients]);

  useEffect(() => {
    setIngredients(savedIngredients);
  }, [savedIngredients]);

  return (
    <div className="fridge-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="table__header">
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table__content">
            {ingredients.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.ingredient}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    data-id={row.id}
                    onClick={onClickEditIngredient}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    data-id={row.id}
                    color="secondary"
                    onClick={onClickDeleteIngredient}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                className="fridge__pagination"
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={2}
                count={totalIngredientsState}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <IconButton className="add-button" onClick={onClickShowAddModal}>
        <AddIcon />
      </IconButton>
      <AddModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        totalIngredients={totalIngredientsState}
        setTotalIngredients={setTotalIngredientsState}
        rowsPerPage={rowsPerPage}
      />
      {showEditModal ? (
        <EditModal
          setShowModal={setShowEditModal}
          id={idIngredient}
          ingredients={ingredients}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
