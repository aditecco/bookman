"use client";

/* ---------------------------------
Page
--------------------------------- */

import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAppStore } from "../../../stores/appStore";
import InputField from "../../../components/InputField/InputField";
import BaseButton from "../../../components/BaseButton/BaseButton";
import Spinner from "../../../components/Spinner/Spinner";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const { addNotification } = useAppStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      addNotification({
        message: "Passwords don't match",
        type: "error",
        timeout: 5000
      });
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password);
      addNotification({
        message: "Account created! Please check your email to confirm.",
        type: "success",
        timeout: 5000
      });
      router.push("/login");
    } catch (error: any) {
      addNotification({
        message: error.message || "Signup failed",
        type: "error",
        timeout: 5000
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
              onClick={() => {}} // Form submit will handle this
              label={isLoading ? "Creating account..." : "Sign up"}
            />
          </form>
          
          <p>
            Already have an account?{" "}
            <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
