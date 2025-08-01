"use client";

/* ---------------------------------
Page
--------------------------------- */

import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import InputField from "../../../components/InputField/InputField";
import BaseButton from "../../../components/BaseButton/BaseButton";
import Spinner from "../../../components/Spinner/Spinner";
import { sanitizeUserInput } from "../../../utils";
import { SECURITY_UTILS } from "../../../security";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeUserInput(formData.email.trim());
    const sanitizedPassword = sanitizeUserInput(formData.password);
    const sanitizedConfirmPassword = sanitizeUserInput(
      formData.confirmPassword
    );

    // Validate email format
    if (!SECURITY_UTILS.validateEmail(sanitizedEmail)) {
      // TODO all the following should be inline messages
      toast.error("Please enter a valid email address");

      return;
    }

    // Validate password length
    if (sanitizedPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");

      return;
    }

    // Validate password strength (basic)
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(sanitizedPassword)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );

      return;
    }

    // Check if passwords match
    if (sanitizedPassword !== sanitizedConfirmPassword) {
      toast.error("Passwords don't match");

      return;
    }

    setIsLoading(true);

    try {
      await signUp(sanitizedEmail, sanitizedPassword);

      toast.success("Account created! Please check your email to confirm.");

      router.push("/login");
    } catch (error: any) {
      toast.error("Signup failed: " + error.message ?? "Unknown error");
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
          <h1>Sign up for BookMan</h1>

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

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />

            <BaseButton
              className="submitButton"
              type="submit"
              label={isLoading ? "Creating account..." : "Sign up"}
            />
          </form>

          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
