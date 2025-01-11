import React from 'react';
import './AppHeader.scss';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderMenuItem from '../HeaderMenuItem/HeaderMenuItem.jsx';



function AppHeader() {
    return (
        <header className="app-header">
            <div className="app-header__content">
                <div className="app-header__items">
                    <HeaderMenuItem
                        text="Конструктор"
                        classModifier="mr-1"
                    >
                        <BurgerIcon type="primary" />
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        text="Лента заказов"
                        classModifier="ml-1"
                    >
                        <ListIcon type="secondary" />
                    </HeaderMenuItem>
                </div>
                <Logo />
                <div className="app-header__profile-container">
                    <HeaderMenuItem
                        text="Личный кабинет"
                    >
                        <ProfileIcon type="secondary" />
                    </HeaderMenuItem>
                </div>
            </div>    
        </header>
    );
}

export default AppHeader;