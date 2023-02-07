import { FC, MouseEvent, ReactNode, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { useAppDispatch } from "../../hooks/redux-hooks";
import { logout } from "../../services/slices/auth/auth";
import { getUser } from "../../services/slices/user/user";
import { wsConnectionClosed, wsConnectionStart } from "../../services/slices/websocket/websocket";
import { BASE_WEBSOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

import styles from "./profile.module.scss";

type ProfileProps = {
  children: ReactNode;
};

export const Profile: FC<ProfileProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(wsConnectionStart(`${BASE_WEBSOCKET_URL}?token=${getCookie("accessToken") ?? ""}`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(logout({ newRoute: () => history.replace("/login") }));
  };

  return (
    <section className={styles.main}>
      <div className={`${styles.sidebar} mr-15 mt-20`}>
        <NavLink
          to="/profile"
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={styles.selected}
          exact
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={styles.selected}
          exact
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={styles.selected}
          onClick={handleLogout}
          exact
        >
          Выход
        </NavLink>
        <p className={`${styles.tip} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {children}
    </section>
  );
};
