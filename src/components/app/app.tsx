import { useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { Location } from "history";

import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Login from "../../pages/Login/login/login";
import Register from "../../pages/Register/register/register";
import ForgotPassword from "../../pages/ForgotPassword/forgot-password/forgot-password";
import ResetPassword from "../../pages/ResetPassword/reset-password/reset-password";
import ProtectedRoute from "../protected-routes/protected-route";
import ProtectedRouteAuth from "../protected-routes/protected-route-auth";
import Profile from "../../pages/Profile/profile/profile";
import PageNotFound from "../../pages/NotFound/not-found/not-found";
import IngredientPage from "../../pages/IngredientPage/ingredient-page/ingredient-page";
import Modal from "../modal/modal";
import IngredientDetails from "../../pages/IngredientPage/ingredient-details/ingredient-details";

import { useFormAndValidation } from "../../hooks/use-form-and-validation";
import { closeIngredientPopup } from "../../services/actions/popups";
import { getIngredients } from "../../services/actions/ingredients";
import { TCard } from '../../utils/constants'

export interface ILocationState {
  background: Location;
  ingredient: TCard;
  from: string;
}

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const locationState = location.state as ILocationState
  const background = locationState?.background;
  const selectedIngredient = locationState?.ingredient;
  const { resetForm } = useFormAndValidation();

  const handleModalClose = () => {
    dispatch(closeIngredientPopup());
    history.replace("/");
  };

  useEffect(() => {
    resetForm();
  }, [location, resetForm]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/ingredients/:id">
          <IngredientPage />
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

      {background && (
        <Route exact path="/ingredients/:ingredientId">
          <Modal
            handleClosePopup={handleModalClose}
            isOpened={Boolean(background)}
          >
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
