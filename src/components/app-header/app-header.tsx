import { Link, useLocation } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { HeaderLink } from "./header-link";

import styles from "./app-header.module.scss";

export const AppHeader = () => {
  const location = useLocation();
  const iconType = (path: string) => (location.pathname === path ? "primary" : "secondary");
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <Logo />
      </Link>
      <nav className={styles.navigation}>
        <div className={styles.container}>
          <HeaderLink name="Конструктор" link="/" icon={<BurgerIcon type={iconType("/")} />} />
          <HeaderLink
            name="Лента заказов"
            link="/feed"
            icon={<ListIcon type={iconType("/feed")} />}
          />
        </div>
        <HeaderLink
          name="Личный кабинет"
          link="/profile"
          icon={<ProfileIcon type={iconType("/profile")} />}
        />
      </nav>
    </header>
  );
};
