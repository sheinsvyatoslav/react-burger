import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerNavigationStyles from './burger-navigation.module.css';

function BurgerNavigation() {
  const [current, setCurrent] = useState('buns')

  return (
    <div className={`${burgerNavigationStyles.container} mb-10`}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default BurgerNavigation