import { FC, ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { getCookie } from "../../utils/cookie";

interface IProtectedRoute extends RouteProps {
  children: ReactNode;
}

export const ProtectedRouteAuth: FC<IProtectedRoute> = ({ children, ...props }) => {
  return <Route {...props} render={() => (getCookie("accessToken") ? <Redirect to="/" /> : children)} />;
};
