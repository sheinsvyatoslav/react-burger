import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, Link } from "react-router-dom";
import headerStyles from "./app-header.module.css";

const AppHeader = () => {
  const location = useLocation();
  return (
    <header className={headerStyles.header}>
      <Link className={headerStyles.logo} to="/">
        <Logo />
      </Link>
      <nav className={`${headerStyles.navigation} pb-4 pt-4`}>
        <div className={headerStyles.container}>
          <NavLink
            className={`${headerStyles.link} pr-5 pb-4 pt-4 mr-1`}
            to="/"
            activeClassName={headerStyles.activeLink}
            exact
          >
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>
          <NavLink
            className={`${headerStyles.link} pl-5 pr-5 pb-4 pt-4`}
            to="/orders"
            activeClassName={headerStyles.activeLink}
            exact
          >
            <ListIcon
              type={location.pathname === "/orders" ? "primary" : "secondary"}
            />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
        <NavLink
          className={headerStyles.link}
          to="/profile"
          activeClassName={headerStyles.activeLink}
          exact
        >
          <ProfileIcon
            type={location.pathname === "/profile" ? "primary" : "secondary"}
          />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
