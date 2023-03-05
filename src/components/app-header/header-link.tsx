import { FC, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

import styles from "./app-header.module.scss";

type HeaderLinkProps = {
  icon: ReactNode;
  name: string;
  link: string;
};

export const HeaderLink: FC<HeaderLinkProps> = ({ icon, name, link }) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });

  return (
    <NavLink className={styles.link} to={link} activeClassName={styles.activeLink} exact>
      {icon}
      <p className={`text text_type_main-${isBigScreen ? "default" : "small"} ml-2`}>{name}</p>
    </NavLink>
  );
};
