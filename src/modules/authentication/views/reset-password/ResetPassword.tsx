import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../../services/firebase/firebaseProvider';

import './reset-password.css';

export const ResetPassword: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState<string | undefined>(
    undefined,
  );

  const [disableButton, setDisableButton] = useState(true);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onClickConfirmEmail = () => {
    auth.sendPasswordResetEmail(email).then(() => {
      history.push('/login', email);
    });
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

  useEffect(() => {
    if (emailMessage === '') {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [emailMessage]);

  return (
    <Card className="card card--H-256px">
      <CardHeader className="card__title" title="Reset password" />
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
        <Button
          className="card__button"
          variant="contained"
          color="primary"
          onClick={onClickConfirmEmail}
          disabled={disableButton}
        >
          Reset Password
        </Button>
      </CardContent>
    </Card>
  );
};
