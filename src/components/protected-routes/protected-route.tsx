import { ReactNode, FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

interface IProtectedRoute extends RouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...props }) => {
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

export default ProtectedRoute;
