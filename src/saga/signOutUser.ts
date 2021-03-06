/* ---------------------------------
signOutUser
--------------------------------- */

import { call, put, takeEvery } from "redux-saga/effects";
import {
  showNotif,
  signOutUser,
  signOutUserPending,
  signOutUserError,
  signOutUserSuccess,
} from "../redux/actions";
import * as firebase from "firebase/app";

/**
 * signOutUserSaga
 */

function* signOutUserSaga() {
  yield put(signOutUserPending());

  try {
    const context = firebase.auth();

    yield call({
      context,
      fn: context.signOut,
    });

    yield put(signOutUserSuccess());

    yield put(
      showNotif({
        message: `Logged out. Bye!`,
        icon: "star",
        timeout: 2000,
        theme: "light",
      })
    );

    //
  } catch (error) {
    //
    console.error("@signOutUser", error);
    yield put(signOutUserError({ error }));
  }
}

export default function* () {
  yield takeEvery(`${signOutUser}`, signOutUserSaga);
}
