import { useEffect, MouseEvent, FC, ReactNode } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux-hooks";

import { logout } from "../../../services/slices/auth";
import { getUser } from "../../../services/slices/user";

import profileStyles from "./profile.module.scss";

interface IProfile {
  children: ReactNode;
}

const Profile: FC<IProfile> = ({ children }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(logout({ newRoute: () => history.replace("/login") }));
  };

  return (
    <section className={profileStyles.main}>
      <div className={`${profileStyles.sidebar} mr-15 mt-20`}>
        <NavLink
          to="/profile"
          className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={profileStyles.selected}
          exact
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={profileStyles.selected}
          exact
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={profileStyles.selected}
          onClick={handleLogout}
          exact
        >
          Выход
        </NavLink>
        <p
          className={`${profileStyles.tip} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {children}
    </section>
  );
};

export default Profile;
