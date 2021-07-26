import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { readLocal, TOKEN } from "../../utils/localStorage";

export default function ProtectedRoute({
  component: Component,
  path,
  ...rest
}) {
  const location = useLocation();

  // Redux
  const { token } = useSelector((state) => state.user);

  // LocalStorage
  const localToken = readLocal(TOKEN);

  const hasLogin = token || localToken;

  if (hasLogin)
    return <Route path={path} render={() => <Component {...rest} />} />;
  else return <Redirect from={location.pathname} to="/login" />;
}
