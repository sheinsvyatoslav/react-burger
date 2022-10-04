import React from 'react';
import {Logo, ProfileIcon, BurgerIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import './AppHeader.css'

function AppHeader() {

  return (
    <header className="header">
      <div className="burger-container">
        <BurgerIcon type="primary" />
        <p className="text text_type_main-default">Конструктор</p>
      </div>
      <div className="orders-container">
        <ListIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
      </div>
      <Logo />
      <div>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
      </div>
    </header>
  );
}

export default AppHeader;