import { FC, ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { getCookie } from "../../utils/cookie";

type ProtectedRouteProps = {
  children: ReactNode;
} & RouteProps;

export const ProtectedRouteAuth: FC<ProtectedRouteProps> = ({ children, ...props }) => {
  return (
    <Route {...props} render={() => (getCookie("accessToken") ? <Redirect to="/" /> : children)} />
  );
};
