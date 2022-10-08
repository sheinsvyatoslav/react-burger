import {Logo, ProfileIcon, BurgerIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css'

function AppHeader() {

  return (
    <header className={headerStyles.header}>
      <div className={`${headerStyles.container} pb-4 pt-4`}>
        <nav className={headerStyles.navigation}>
          <div className={`${headerStyles.link} pr-5 pb-4 pt-4 mr-1`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </div>
          <div className={`${headerStyles.link} pl-5 pr-5 pb-4 pt-4`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
          </div>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <a className={headerStyles.link} href='#'>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;