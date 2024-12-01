"use client";

/* ---------------------------------
LoginForm
--------------------------------- */

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ERROR__GENERIC_ERROR, TOKEN_KEY, USER_KEY } from "../../../constants";

export default function LoginForm(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function validate(input) {
    return Object.values(input).every(val => val !== "");
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate({ email, password })) {
      window.alert("nope!");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const { data } =
        (await axios.post("/api/login", { email, password })) ?? {};

      if (!data?.jwt || !data?.user) throw new Error(ERROR__GENERIC_ERROR);

      localStorage.setItem(TOKEN_KEY, data.jwt);

      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          username: data.user.username,
          email: data.user.email,
        })
      );

      router.push("/bookmarks");
    } catch (err) {
      setError(
        err.response?.data?.message ?? err.message ?? ERROR__GENERIC_ERROR
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrapper thin">
      {error ? <div className="error">{error}</div> : false}

      <form className="AuthForm" onSubmit={handleLogin}>
        <label htmlFor="emailField">{`Login email`}</label>
        <input
          id="emailField"
          name="emailField"
          type="email"
          className="BaseInput"
          placeholder={`login.email@example.com`}
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

        <button type="submit" className="BaseButton">
          Login
        </button>
      </form>
    </div>
  );
}
