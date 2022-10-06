import React from 'react';
import {Logo, ProfileIcon, BurgerIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import './AppHeader.css'

function AppHeader() {

  return (
    <header className="header p-6">
      <nav className="navigation">
        <div className="navigation__link pl-5 pr-5 pb-4 pt-4 mr-1">
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </div>
        <div className="navigation__link pl-5 pr-5 pb-4 pt-4">
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
        </div>
      </nav>
      <Logo />
      <div className="navigation__link">
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
      </div>
    </header>
  );
}

export default AppHeader;