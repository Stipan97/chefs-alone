import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from './modules/home/views/Home';
import { Fridge } from './modules/fridge/views/ingridient-list/Fridge';
import { Header } from './shared/modules/header/Header';
import { Register } from './modules/authentication/views/register/Register';
import { LogIn } from './modules/authentication/views/login/LogIn';
import { ResetPassword } from './modules/authentication/views/reset-password/ResetPassword';
import { RecipesList } from './modules/recipes-list/views/RecipesList';
import { RecipeInfo } from './modules/recipe/views/RecipeInfo';
import { rootReducerState } from './models';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './services/firebase/firebaseProvider';
import { setCurrentUser } from './services/redux/actions/currentUserActions';

import './main.css';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const userRedux = useSelector((state: rootReducerState) => state.user.data);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (userRedux && user) {
        return;
      }
      if (!user) {
        return;
      }
      dispatch(setCurrentUser());
    });
    return () => unsub();
  }, [userRedux, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          {userRedux ? (
            <>
              <Redirect exact from="/" to="/home" />
              <Redirect exact from="/login" to="/home" />
              <Redirect exact from="/resetpassword" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/fridge" component={Fridge} />
              <Route path="/recipes" component={RecipesList} />
              <Route path="/recipe/:id" component={RecipeInfo} />
            </>
          ) : (
            <>
              <Redirect exact from="/home" to="/login" />
              <Redirect exact from="/fridge" to="/login" />
              <Redirect exact from="/recipes" to="/login" />
              <Redirect exact from="/recipe/:id" to="/login" />
              <Route exact path="/" component={Register} />
              <Route path="/login" component={LogIn} />
              <Route path="/resetpassword" component={ResetPassword} />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
};
