import { Link, NavLink, useLocation } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.scss";

export const AppHeader = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <Logo />
      </Link>
      <nav className={`${styles.navigation} pb-4 pt-4`}>
        <div className={styles.container}>
          <NavLink className={`${styles.link} pr-5 pb-4 pt-4 mr-1`} to="/" activeClassName={styles.activeLink} exact>
            <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>
          <NavLink
            className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
            to="/feed"
            activeClassName={styles.activeLink}
            exact
          >
            <ListIcon type={location.pathname === "/feed" ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
        <NavLink className={styles.link} to="/profile" activeClassName={styles.activeLink} exact>
          <ProfileIcon type={location.pathname === "/profile" ? "primary" : "secondary"} />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};
