// src/components/PrivateRoute.js
import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      role ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
