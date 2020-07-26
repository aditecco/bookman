/* ---------------------------------
App
--------------------------------- */

// js deps
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Route path={"/"} exact component={Home} />
    </Router>
  );
}
