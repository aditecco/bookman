/* ---------------------------------
AuthForm
--------------------------------- */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { capitalize } from "../../utils";

export default function AuthForm({ intent, actionHandler }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * validate
   */

  function validate(input) {
    return Object.values(input).every(val => val !== "");
  }

  function handleSubmit() {
    if (!validate({ email, password })) {
      window.alert("nope!");
      return;
    }

    dispatch(actionHandler({ email, password }));
  }

  return (
    <div className="wrapper thin">
      <form className="AuthForm">
        <label htmlFor="emailField">{`${capitalize(intent)} email`}</label>
        <input
          id="emailField"
          name="emailField"
          type="email"
          className="BaseInput"
          placeholder={`${intent}.email@example.com`}
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />

        <label htmlFor="passwordField">Password</label>
        <input
          id="passwordField"
          name="passwordField"
          type="password"
          className="BaseInput"
          placeholder="your password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />

        <button type="button" className="BaseButton" onClick={handleSubmit}>
          {capitalize(intent)}
        </button>
      </form>
    </div>
  );
}
