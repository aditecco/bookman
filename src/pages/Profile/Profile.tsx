/* ---------------------------------
Profile
--------------------------------- */

import React, { ReactElement } from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import BaseButton from "../../components/BaseButton/BaseButton";
import { signOutUser } from "../../redux/actions";

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
