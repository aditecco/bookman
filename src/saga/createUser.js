/* ---------------------------------
createUser
--------------------------------- */

import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  showNotif,
  createUser,
  createUserPending,
  createUserError,
  createUserSuccess,
} from "../redux/actions";
import * as firebase from "firebase/app";

/**
 * createUserSaga
 */

function* createUserSaga(action) {
  const {
    payload: { username, password },
  } = action;

  yield put(createUserPending());

  try {
    // yield call(firebase.auth().setPersistence, [
    //   firebase.auth.Auth.Persistence.LOCAL,
    // ]);

    // const user = yield call(firebase.auth().createUserWithEmailAndPassword, [
    //   username,
    //   password,
    // ]);

    const user = yield firebase
      .auth()
      .createUserWithEmailAndPassword(username, password);

    yield put(createUserSuccess(user));

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
    console.error(error);
    yield put(createUserError({ error }));
  }
}

/**
 * _createUser
 */

export default function* () {
  yield takeEvery(`${createUser}`, createUserSaga);
}
