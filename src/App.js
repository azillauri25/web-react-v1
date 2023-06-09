import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

import AssignUsers from './components/AssignUsers';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Preparation from './components/Preparation';
import Sign from './components/Sign';
import View from './components/View';
// import Header from './components/Header';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Welcome from './components/Welcome';
import PasswordUpdate from './components/PasswordUpdate/PasswordUpdate';

import { auth, generateUserDocument } from './firebase/firebase';
import { setUser, selectUser } from './firebase/firebaseSlice';

import './App.css';
// import Page404 from './components/404';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const user = await generateUserDocument(userAuth);
        const { uid, displayName, email, photoURL } = user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
      }
    });
  }, [dispatch]);

  return user ? (
    <div>
      <Router>
        <Welcome path="/masuk" />
        <AssignUsers path="/kirim" />
        <Preparation path="/menyiapkan-dokumen" />
        <Sign path="/tanda-tangan" />
        <View path="/lihat" />
      </Router>
    </div>
  ) : (
    <div>
      {/* <Header /> */}
      <Router>
        <SignIn path="masuk" />
        <SignUp path="daftar" />
        <PasswordReset path="lupa-katasandi" />
        <PasswordUpdate path="atur-katasandi" />
        {/* <Page404 path="404"/> */}
      </Router>
    </div>
  );
};

export default App;
