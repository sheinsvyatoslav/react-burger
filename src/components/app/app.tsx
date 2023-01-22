import { useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useFormAndValidation } from "../../hooks/use-form-and-validation";
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
import OrderPage from "../../pages/OrderPage/order-page";
import FeedPage from "../../pages/FeedPage/feed-page";
import OrderFeed from "../order-feed/order-feed";
import ProfileForm from "../profile-form/profile-form";

import { getIngredients } from "../../services/slices/ingredients/ingredients";
import { TCard, TOrder } from "../../utils/types";
import OrderContent from "../order-content/order-content";
export interface ILocationState {
  background: Location;
  ingredient: TCard;
  order: TOrder;
  totalPrice: number;
  from: string;
  orderIngredients: ReadonlyArray<TCard>;
}

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const locationState = location.state as ILocationState;
  const background = locationState?.background;
  const ingredient = locationState?.ingredient;
  const order = locationState?.order;
  const totalPrice = locationState?.totalPrice;
  const orderIngredients = locationState?.orderIngredients;
  const { resetForm } = useFormAndValidation();

  const handleModalClose = () => {
    background.pathname === "/" ? history.replace("/") : history.goBack();
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
        <Route exact path="/feed">
          <FeedPage />
        </Route>
        <Route exact path="/feed/:id">
          <OrderPage />
        </Route>
        <Route exact path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile>
            <ProfileForm />
          </Profile>
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <Profile>
            <OrderFeed />
          </Profile>
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/:id">
          <OrderPage />
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
            <IngredientDetails ingredient={ingredient} />
          </Modal>
        </Route>
      )}

      {background && (
        <Route exact path="/feed/:id">
          <Modal
            handleClosePopup={handleModalClose}
            isOpened={Boolean(background)}
          >
            <OrderContent
              order={order}
              totalPrice={totalPrice}
              orderIngredients={orderIngredients}
            />
          </Modal>
        </Route>
      )}

      {background && (
        <ProtectedRoute exact path="/profile/orders/:id">
          <Modal
            handleClosePopup={handleModalClose}
            isOpened={Boolean(background)}
          >
            <OrderContent
              order={order}
              totalPrice={totalPrice}
              orderIngredients={orderIngredients}
            />
          </Modal>
        </ProtectedRoute>
      )}
    </>
  );
};

export default App;
