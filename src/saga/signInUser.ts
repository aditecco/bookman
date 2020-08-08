/* ---------------------------------
signInUser
--------------------------------- */

import { call, put, takeEvery } from "redux-saga/effects";
import {
  showNotif,
  signInUser,
  signInUserPending,
  signInUserError,
  signInUserSuccess,
} from "../redux/actions";
import * as firebase from "firebase/app";

/**
 * signInUserSaga
 */

function* signInUserSaga(action) {
  const {
    payload: { email, password },
  } = action;

  yield put(signInUserPending());

  try {
    const context = firebase.auth();

    // setPersistence
    yield call(
      {
        context,
        fn: context.setPersistence,
      },
      firebase.auth.Auth.Persistence.LOCAL
    );

    // signInWithEmailAndPassword
    const { user } = yield call(
      {
        context,
        fn: context.signInWithEmailAndPassword,
      },
      email,
      password
    );

    yield put(
      signInUserSuccess({
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
      })
    );

    yield put(
      showNotif({
        message: `Welcome, ${email}!`,
        icon: "star",
        timeOut: 2000,
        theme: "light",
      })
    );

    //
  } catch (error) {
    //
    console.error("@signInUser", error);
    yield put(signInUserError({ error }));
  }
}

export default function* () {
  yield takeEvery(`${signInUser}`, signInUserSaga);
}
