import React from 'react';
import styles from './app-header.module.scss';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderMenuItem from '../header-menu-item/header-menu-item.jsx';
import { useNavigate } from 'react-router-dom';


function AppHeader() {
    const navigate = useNavigate();
    function switchPage() {
        navigate("/profile");
    }
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <nav className={styles.items}>
                    <HeaderMenuItem
                        text="Конструктор"
                        stylesModifier={{marginRight: "4px"}}
                    >
                        <BurgerIcon type="primary" />
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        text="Лента заказов"
                        stylesModifier={{marginLeft: "4px"}}
                    >
                        <ListIcon type="secondary" />
                    </HeaderMenuItem>
                </nav>
                <Logo />
                <div className={styles.container} onClick={switchPage}>
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

{/* <Link to="/profile">
</Link> */}

export default AppHeader;