/* ---------------------------------
Authentication
--------------------------------- */

import React from "react";
import { signInUser, signUpUser } from "../../store/actions";
import AuthForm from "../AuthForm/AuthForm";
import TabSwitcher from "../TabSwitcher/TabSwitcher";
import Layout from "../Layout/Layout";

export default function Authentication() {
  return (
    <Layout root="Authentication">
      <TabSwitcher
        tabs={[
          {
            name: "Login",
            content: <AuthForm intent="login" actionHandler={signInUser} />,
          },
          {
            name: "Signup",
            content: <AuthForm intent="signup" actionHandler={signUpUser} />,
          },
        ]}
      />
    </Layout>
  );
}
