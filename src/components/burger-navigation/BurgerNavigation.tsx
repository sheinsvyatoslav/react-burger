import {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerNavigation() {
  const [current, setCurrent] = useState('buns')

  return (
    <div style={{ display: 'flex' }}>
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