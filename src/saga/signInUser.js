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

    yield call(
      {
        context,
        fn: context.setPersistence,
      },
      firebase.auth.Auth.Persistence.LOCAL
    );

    const user = yield call(
      {
        context,
        fn: context.signInWithEmailAndPassword,
      },
      email,
      password
    );

    yield put(signInUserSuccess(user));

    // yield put(
    //   showNotif({
    //     message: `Rated ${User} stars for ${title}`,
    //     icon: "star",
    //     timeOut: 2000,
    //     theme: "light",
    //   })
    // );

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
