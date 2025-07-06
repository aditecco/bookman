"use client";

import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAppStore } from "../../../stores/appStore";
import InputField from "../../../components/InputField/InputField";
import BaseButton from "../../../components/BaseButton/BaseButton";
import Spinner from "../../../components/Spinner/Spinner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const { addNotification } = useAppStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      addNotification({
        message: "Welcome back!",
        type: "success",
        timeout: 3000,
      });
      router.push("/bookmarks");
    } catch (error: any) {
      addNotification({
        message: error.message || "Login failed",
        type: "error",
        timeout: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="AuthPage">
      <div className="wrapper">
        <div className="AuthForm">
          <h1>Login to BookMan</h1>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <BaseButton
              className="submitButton"
              type="submit"
              label={isLoading ? "Logging in..." : "Login"}
            />
          </form>

          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
