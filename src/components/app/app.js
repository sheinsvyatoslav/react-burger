import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header";
import Main from "../../pages/Main/main/main";
import Login from "../../pages/Login/login/login";
import Register from "../../pages/Register/register/register";
import ForgotPassword from "../../pages/ForgotPassword/forgot-password/forgot-password";
import ResetPassword from "../../pages/ResetPassword/reset-password/reset-password";
import ProtectedRoute from "../protected-routes/protected-route";
import ProtectedRouteAuth from "../protected-routes/protected-route-auth";
import Profile from "../../pages/Profile/profile/profile";
import PageNotFound from "../../pages/NotFound/not-found/not-found";
import IngredientPage from "../../pages/IngredientPage/ingredient-page/ingredient-page";
import { clearForm } from "../../services/actions/form";
import {
  getStorageIngredients,
  getIngredientsCount,
} from "../../services/actions/ingredients";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem("isPopupOpened");
      if (localStorage.getItem("constructorIngredients")) {
        dispatch(
          getStorageIngredients(
            JSON.parse(localStorage.getItem("constructorIngredients"))
          )
        );
        dispatch(
          getIngredientsCount(
            JSON.parse(localStorage.getItem("ingredientsCount"))
          )
        );
      }
    }
    dispatch(clearForm());
  }, [location, dispatch]);

  return (
    <>
      <AppHeader />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/ingredients/:id">
          {JSON.parse(localStorage.getItem("isPopupOpened")) ? (
            <Main />
          ) : (
            <IngredientPage />
          )}
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRouteAuth exact path="/login">
          <Login />
        </ProtectedRouteAuth>
        <ProtectedRouteAuth exact path="/register">
          <Register />
        </ProtectedRouteAuth>
        <ProtectedRouteAuth exact path="/forgot-password">
          <ForgotPassword />
        </ProtectedRouteAuth>
        <ProtectedRouteAuth exact path="/reset-password">
          <ResetPassword />
        </ProtectedRouteAuth>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;
