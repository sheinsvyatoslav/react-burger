import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css'

function AppHeader() {

  return (
    <header className={headerStyles.header}>
      <nav className={`${headerStyles.navigation} pb-4 pt-4`}>
        <div className={headerStyles.container}>
          <a className={`${headerStyles.link} pr-5 pb-4 pt-4 mr-1`} href='#'>
            <BurgerIcon type="primary" />
            <p className={`${headerStyles.linkText} text text_type_main-default ml-2`}>Конструктор</p>
          </a>
          <a className={`${headerStyles.link} pl-5 pr-5 pb-4 pt-4`} href='#'>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
          </a>
        </div>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <a className={headerStyles.link} href='#'>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;