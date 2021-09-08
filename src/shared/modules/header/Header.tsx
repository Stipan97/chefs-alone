import { AppBar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { rootReducerState } from '../../../models';
import { auth } from '../../../services/firebase/firebaseProvider';
import { logoutCurrentUser } from '../../../services/redux/actions/currentUserActions';
import { clearFridgeIngredients } from '../../../services/redux/actions/fridgeIngredientsActions';
import ChefHat from '../../../assets/chef.png';

import './header.css';
import { clearLikedRecipes } from '../../../services/redux/actions/likedRecipesActions';

export const Header: React.FC = () => {
  const userRedux = useSelector((state: rootReducerState) => state.user.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const onClickLogout = () => {
    auth.signOut().then(() => {
      dispatch(logoutCurrentUser());
      dispatch(clearFridgeIngredients());
      dispatch(clearLikedRecipes());
      history.push('/login');
    });
  };

  const onClickLogIn = () => {
    if (userRedux) {
      setShowMenu(!showMenu);
    }

    history.push('/login');
  };

  const onClickFridge = () => {
    if (userRedux) {
      setShowMenu(!showMenu);
    }

    history.push('/fridge');
  };

  const onClickLikedRecipes = () => {
    if (userRedux) {
      setShowMenu(!showMenu);
    }

    history.push('/liked-recipes');
  };

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    showMenu ? setMenuAnchor(null) : setMenuAnchor(event.currentTarget);
    setShowMenu(!showMenu);
  };

  return (
    <AppBar className="header" position="static" color="primary">
      <div className="bar-maxwidth">
        <h1>
          <Link className="header__title" to={userRedux ? '/home' : '/login'}>
            <img className="header__logo" src={ChefHat} alt="ChefHat" />
            Chefs Alone
          </Link>
        </h1>
        {userRedux ? (
          <IconButton onClick={toggleMenu}>
            <MoreVert className="button-icon--white" />
            <Menu
              className="menu"
              open={showMenu}
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={onClickFridge}>Fridge</MenuItem>
              <MenuItem onClick={onClickLikedRecipes}>Liked recipes</MenuItem>
              <MenuItem className="menu-item__logout" onClick={onClickLogout}>
                Logout
              </MenuItem>
            </Menu>
          </IconButton>
        ) : (
          <Button variant="contained" color="default" onClick={onClickLogIn}>
            Login
          </Button>
        )}
      </div>
    </AppBar>
  );
};
