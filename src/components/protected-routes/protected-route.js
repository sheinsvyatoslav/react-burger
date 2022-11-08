import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const ProtectedRoute = ({ children, ...props }) => {
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
