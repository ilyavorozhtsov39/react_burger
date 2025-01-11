import React from 'react';
import './HeaderMenuItem.scss';

function HeaderMenuItem({text, classModifier = "", children}) {
    return (
        <div className={`header-menu-item pt-4 pb-4 pl-5 pr-5 ${classModifier}`}>
            {children}
            <p className="text text_type_main-small ml-2">{text}</p>
        </div>
    );
}

export default HeaderMenuItem;