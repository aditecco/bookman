"use client";

/* ---------------------------------
LoginForm
--------------------------------- */

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

      await axios.post("/api/login", { email, password });

      await router.push("/home");
    } catch (err) {
      setError(err.message);
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
