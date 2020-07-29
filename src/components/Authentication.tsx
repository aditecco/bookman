/* ---------------------------------
Authentication
--------------------------------- */

import React, { useState } from "react";
import BaseButton from "./BaseButton";
import { signUpUser, signInUser } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function Authentication(props) {
  const dispatch = useDispatch();

  const [authInfo, setAuthInfo] = useState("");

  return (
    <form action="#">
      <input
        style={{ width: "100%" }}
        type="text"
        placeholder="login info"
        onChange={e => {
          const {
            target: { value },
          } = e;

          setAuthInfo(value);
        }}
      />

      <BaseButton
        className="clearTagsButton"
        onClick={_ => {
          const [email, password] = authInfo.split(",");
          // @ts-ignore
          dispatch(signUpUser({ email, password }));
        }}
        onKeyDown={null}
        label="TEST SIGN-UP"
      />

      <BaseButton
        className="clearTagsButton"
        onClick={_ => {
          const [email, password] = authInfo.split(",");
          // @ts-ignore
          dispatch(signInUser({ email, password }));
        }}
        onKeyDown={null}
        label="TEST SIGN-IN"
      />
    </form>
  );
}
