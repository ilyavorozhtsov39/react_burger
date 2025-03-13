import styles from './app-header.module.scss';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderMenuItem from '../header-menu-item/header-menu-item';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react"


const AppHeader = (): React.JSX.Element => {

    const [ activePage, setActivePage ] = useState<string>("/")

    const navigate = useNavigate();
    const location = useLocation()

    async function switchPage(page: string) {
        navigate(page);
    }

    useEffect(() => {
        setActivePage(location.pathname)
    }, [location])

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <nav className={styles.items}>
                    <div onClick={() => switchPage("/")}>
                    <HeaderMenuItem
                        text="Конструктор"
                        stylesModifier={{marginRight: "4px"}}
                        type={activePage === "/" ? "primary" : "secondary"}
                    >
                        <BurgerIcon type={activePage === "/" ? "primary" : "secondary"} />
                    </HeaderMenuItem>
                    </div>
                    <div onClick={() => switchPage("/feed")}>
                    <HeaderMenuItem
                        text="Лента заказов"
                        stylesModifier={{marginLeft: "4px"}}
                        type={activePage === "/feed" ? "primary" : "secondary"}
                    >
                        <ListIcon type={activePage === "/feed" ? "primary" : "secondary"} />
                    </HeaderMenuItem>
                    </div>
                </nav>
                <Logo />
                <div className={styles.container} onClick={() => switchPage("/profile")}>
                    <HeaderMenuItem
                        text="Личный кабинет"
                        type={activePage === "/profile" ? "primary" : "secondary"}
                    >
                        <ProfileIcon type={activePage === "/profile" ? "primary" : "secondary"} />
                    </HeaderMenuItem>
                </div>
            </div>    
        </header>
    );
}


export default AppHeader;