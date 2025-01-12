import React from 'react';
import './header-menu-item.scss';
import PropTypes from 'prop-types';

function HeaderMenuItem({text, classModifier = "", children}) {
    return (
        <div className={`header-menu-item pt-4 pb-4 pl-5 pr-5 ${classModifier}`}>
            {children}
            <p className="text text_type_main-small ml-2">{text}</p>
        </div>
    );
}

HeaderMenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    classModifier: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default HeaderMenuItem;