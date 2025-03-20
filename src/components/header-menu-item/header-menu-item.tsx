import React, { ReactNode } from 'react';
import styles from './header-menu-item.module.scss';

type THeaderMenuItemProps = {
    text: string,
    stylesModifier?: { [name: string]: string },
    type: string,
    children: ReactNode
}

const HeaderMenuItem = ({text, stylesModifier = {}, type, children}: THeaderMenuItemProps): React.JSX.Element => {
    return (
        <div className={styles.item} style={stylesModifier}>
            {children}
            <p data-id="header-menu-item" className={type === "primary" ? styles.text : styles.textInactive}>{text}</p>
        </div>
    );
}

export default HeaderMenuItem;