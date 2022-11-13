import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import burgerNavigationStyles from "./burger-navigation.module.css";

const BurgerNavigation = ({ inViewBuns, inViewSauces, inViewFilling }) => {
  const [current, setCurrent] = useState("buns");

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("buns");
    } else if (inViewSauces) {
      setCurrent("sauces");
    } else if (inViewFilling) {
      setCurrent("mains");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  return (
    <div className={`${burgerNavigationStyles.container} mb-10`}>
      <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="fillings" active={current === "mains"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

BurgerNavigation.propTypes = {
  inViewBuns: PropTypes.bool.isRequired,
  inViewSauces: PropTypes.bool.isRequired,
  inViewFilling: PropTypes.bool.isRequired,
};

export default BurgerNavigation;
