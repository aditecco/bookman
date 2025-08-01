"use client";

import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import InputField from "../../../components/InputField/InputField";
import BaseButton from "../../../components/BaseButton/BaseButton";
import Spinner from "../../../components/Spinner/Spinner";
import { sanitizeUserInput } from "../../../utils";
import { SECURITY_UTILS } from "../../../security";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeUserInput(formData.email.trim());
    const sanitizedPassword = sanitizeUserInput(formData.password);

    // Validate email format
    if (!SECURITY_UTILS.validateEmail(sanitizedEmail)) {
      toast.error("Please enter a valid email address");

      return;
    }

    // Validate password length
    if (sanitizedPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");

      return;
    }

    setIsLoading(true);

    try {
      await signIn(sanitizedEmail, sanitizedPassword);

      toast.success("Welcome back!");

      router.push("/bookmarks");
    } catch (error: any) {
      toast.error("Login failed");
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
