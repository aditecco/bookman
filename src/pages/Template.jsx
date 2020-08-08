/******************
  Template
*******************/

// js
import React from "react";

// comps
import PillButton from "../components/PillButton/PillButton";
import { Link } from "react-router-dom";

export default function Template(props) {
  const root = "Template";

  return (
    <>
      <h1>{root}</h1>

      <Link to={`/`}>
        <PillButton label="Home" />
      </Link>
    </>
  );
}
