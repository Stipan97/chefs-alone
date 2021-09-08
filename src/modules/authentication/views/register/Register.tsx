import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  auth,
  firebaseError,
  firestore,
} from '../../../../services/firebase/firebaseProvider';
import '../../authentication.css';

export const Register: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [emailMessage, setEmailMessage] = useState<string | undefined>(
    undefined,
  );
  const [passwordMessage, setPasswordMessage] = useState<string | undefined>(
    undefined,
  );
  const [repeatPasswordMessage, setRepeatPasswordMessage] = useState<
    string | undefined
  >(undefined);
  const [usernameMessage, setUsernameMessage] = useState<string | undefined>(
    undefined,
  );
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [disableButton, setDisableButton] = useState(true);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.currentTarget.value);
  };

  const onClickRegister = () => {
    if (email && password && repeatPassword && username) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          firestore
            .collection('users')
            .doc(response.user?.uid)
            .set({
              username: username,
            })
            .then(() => {
              history.push('/home');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err: firebaseError) => {
          setMessage(err.message);
        });
    }
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
    if (password !== '') {
      if (
        !password.match(
          /^(?=.*\d)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^0-9a-zA-Z]).{8,}$/,
        )
      ) {
        setPasswordMessage(
          'Password must contain 8 characters total with number/s and special character/s.',
        );
      } else {
        setPasswordMessage('');
      }
    } else {
      setPasswordMessage('Please input your password.');
    }
  };

  const validateRepeatPassword = () => {
    if (repeatPassword !== '') {
      if (password !== repeatPassword) {
        setRepeatPasswordMessage('Passwords do not match.');
      } else {
        setRepeatPasswordMessage('');
      }
    } else {
      setRepeatPasswordMessage('Please repeat your password.');
    }
  };

  const validateUsername = () => {
    if (!username) {
      setUsernameMessage('Please enter username');
    } else {
      setUsernameMessage('');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  useEffect(() => {
    if (
      emailMessage === '' &&
      usernameMessage === '' &&
      passwordMessage === '' &&
      repeatPasswordMessage === ''
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [emailMessage, usernameMessage, passwordMessage, repeatPasswordMessage]);

  return (
    <Card className="card card--H-480px">
      <CardHeader className="card__title" title="Register" />
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
          <InputLabel htmlFor="username" error={usernameMessage ? true : false}>
            Username
          </InputLabel>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={onChangeUsername}
            onBlur={validateUsername}
          />
          {usernameMessage ? (
            <FormHelperText id="username" error>
              {usernameMessage}
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
        </FormControl>
        <FormControl>
          <InputLabel
            htmlFor="repeat-password"
            error={repeatPasswordMessage ? true : false}
          >
            Repeat password
          </InputLabel>
          <Input
            id="repeat-password"
            type={showRepeatPassword ? 'text' : 'password'}
            value={repeatPassword}
            onChange={onChangeRepeatPassword}
            onBlur={validateRepeatPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowRepeatPassword}>
                  {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {repeatPasswordMessage ? (
            <FormHelperText id="repeat-password" error>
              {repeatPasswordMessage}
            </FormHelperText>
          ) : (
            <></>
          )}
          {message ? (
            <FormHelperText id="repeat-password" error>
              {message}
            </FormHelperText>
          ) : (
            <></>
          )}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickRegister}
          disabled={disableButton}
        >
          Register
        </Button>
      </CardContent>
    </Card>
  );
};
