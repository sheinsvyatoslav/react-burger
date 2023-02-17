import { FC, ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { getCookie } from "../../utils/cookie";

type ProtectedRouteProps = {
  children: ReactNode;
} & RouteProps;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        getCookie("accessToken") ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
