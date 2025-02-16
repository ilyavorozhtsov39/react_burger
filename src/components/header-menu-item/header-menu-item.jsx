import React from 'react';
import styles from './header-menu-item.module.scss';
import PropTypes from 'prop-types';

function HeaderMenuItem({text, stylesModifier = {}, type, children}) {
    console.log(text, type)
    return (
        <div className={styles.item} style={stylesModifier}>
            {children}
            <p className={type === "primary" ? styles.text : styles.textInactive}>{text}</p>
        </div>
    );
}


HeaderMenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    classModifier: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.node.isRequired
}

export default HeaderMenuItem;