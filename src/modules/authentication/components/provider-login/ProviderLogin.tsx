import React from 'react';
import { useHistory } from 'react-router';
import googleIcon from '../../../../assets/google-icon.png';
import facebookIcon from '../../../../assets/facebook-icon.png';
import {
  auth,
  authProviderFacebook,
  authProviderGoogle,
  firestore,
} from '../../../../services/firebase/firebaseProvider';

import './provider-login.css';

interface ProviderLoginProps {
  type: 'Google' | 'Facebook';
}

export const ProviderLogin: React.FC<ProviderLoginProps> = ({ type }) => {
  const history = useHistory();
  let provider: typeof authProviderGoogle | typeof authProviderFacebook;
  if (type === 'Google') {
    provider = authProviderGoogle;
  } else {
    provider = authProviderFacebook;
  }

  const onClickLoginWithProvider = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        firestore
          .collection('users')
          .doc(result.user?.uid)
          .set({
            username: result.user?.displayName,
          })
          .then(() => {
            history.push('/home');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button className="provider-button" onClick={onClickLoginWithProvider}>
      <img
        src={type === 'Google' ? googleIcon : facebookIcon}
        alt={'Login with ' + type}
      />
    </button>
  );
};
