/* ---------------------------------
createUser
--------------------------------- */

import { call, put, takeEvery } from "redux-saga/effects";
import {
  showNotif,
  signUpUser,
  signUpUserPending,
  signUpUserError,
  signUpUserSuccess,
} from "../redux/actions";
import * as firebase from "firebase/app";

/**
 * signUpUserSaga
 */

function* signUpUserSaga(action) {
  const {
    payload: { email, password },
  } = action;

  yield put(signUpUserPending());

  try {
    const user = yield call(
      {
        context: firebase.auth(),
        fn: firebase.auth().createUserWithEmailAndPassword,
      },
      email,
      password
    );

    yield put(signUpUserSuccess(user));

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
    console.error("@signUpUser", error);
    yield put(signUpUserError({ error }));
  }
}

export default function* () {
  yield takeEvery(`${signUpUser}`, signUpUserSaga);
}
