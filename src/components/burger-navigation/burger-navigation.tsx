import { FC, useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-navigation.module.scss";

type BurgerNavigationProps = {
  inViewBuns: boolean;
  inViewSauces: boolean;
  inViewFilling: boolean;
};

export const BurgerNavigation: FC<BurgerNavigationProps> = ({
  inViewBuns,
  inViewSauces,
  inViewFilling,
}) => {
  const [current, setCurrent] = useState("bun");

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("bun");
    } else if (inViewSauces) {
      setCurrent("sauce");
    } else if (inViewFilling) {
      setCurrent("main");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const handleClickTab = (name: string) => {
    setCurrent(name);
    document.querySelector(`#${name}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className={`${styles.container} mb-10`}>
      <Tab value="bun" active={current === "bun"} onClick={handleClickTab}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={handleClickTab}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={handleClickTab}>
        Начинки
      </Tab>
    </div>
  );
};
