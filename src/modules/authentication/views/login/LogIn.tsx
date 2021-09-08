import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  auth,
  firebaseError,
  persistenceNone,
  persistenceLocal,
} from '../../../../services/firebase/firebaseProvider';
import { ProviderLogin } from '../../components/provider-login/ProviderLogin';

import '../../authentication.css';

export const LogIn: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [saveUser, setSaveUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailMessage, setEmailMessage] = useState<string | undefined>(
    undefined,
  );
  const [passwordMessage, setPasswordMessage] = useState<string | undefined>(
    undefined,
  );
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [disableButton, setDisableButton] = useState(true);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeRememberMe = () => {
    setSaveUser(!saveUser);
  };

  const validateEmail = () => {
    if (email !== '') {
      if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setEmailMessage('Email address is not properly formatted.');
      } else {
        setEmailMessage('');
      }
    } else {
      setEmailMessage('Please input your Email address.');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordMessage('Please enter password');
    } else {
      setPasswordMessage('');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onClickLogIn = () => {
    auth
      .setPersistence(saveUser ? persistenceLocal : persistenceNone)
      .then(() => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            history.push('/home');
          })
          .catch((err: firebaseError) => {
            setMessage(err.message);
          });
      });
  };

  useEffect(() => {
    if (emailMessage === '' && passwordMessage === '') {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [emailMessage, passwordMessage]);

  return (
    <Card className="card card--H-480px">
      <CardHeader title="Login" />
      <CardContent className="card__content">
        <FormControl>
          <InputLabel htmlFor="email" error={emailMessage ? true : false}>
            E-mail
          </InputLabel>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={onChangeEmail}
            onBlur={validateEmail}
          />
          {emailMessage ? (
            <FormHelperText id="email" error>
              {emailMessage}
            </FormHelperText>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password" error={passwordMessage ? true : false}>
            Password
          </InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onChangePassword}
            onBlur={validatePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordMessage ? (
            <FormHelperText id="password" error>
              {passwordMessage}
            </FormHelperText>
          ) : (
            <></>
          )}
          {message ? (
            <FormHelperText id="password" error>
              {message}
            </FormHelperText>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={saveUser}
              onChange={onChangeRememberMe}
              color="primary"
            />
          }
          label="Remember me"
        />
        <div className="card__content__providers">
          <ProviderLogin type="Google" />
          <ProviderLogin type="Facebook" />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickLogIn}
          disabled={disableButton}
        >
          Login
        </Button>
      </CardContent>
      <CardActions className="card__footer">
        <Link to="/resetpassword">Forgot your password?</Link>
        <Link to="/">Don't have account? Create one.</Link>
      </CardActions>
    </Card>
  );
};
