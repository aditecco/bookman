/* ---------------------------------
Profile
--------------------------------- */

import React, { ReactElement } from "react";
import Layout from "../../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BaseButton from "../../../components/BaseButton/BaseButton";
import { signOutUser } from "../../../store/actions";

interface IOwnProps {}

export default function Profile(props: IOwnProps): ReactElement {
  const { user } = useSelector((state: RootState) => state.authentication);
  const dispatch = useDispatch();

  return (
    <Layout root="Profile">
      Welcome, {user.email}!{""}
      <BaseButton onClick={() => dispatch(signOutUser())}>Logout</BaseButton>
    </Layout>
  );
}
