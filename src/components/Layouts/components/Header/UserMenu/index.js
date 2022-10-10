import React from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classnames from 'classnames/bind'
import { Link } from 'react-router-dom';

import style from './UserMenu.module.scss'

const cx = classnames.bind(style)

function UserMenu({children, logout}) {
    return (
        <Tippy
            // visible
            placement='bottom-start'
            interactive
            delay={[0, 500]}
            render={attrs => (
                <ul className={cx('menu-container')} tabIndex="-1" {...attrs}>
                    <Link to="/private-page"><li>Trang cá nhân</li></Link>
                    <Link onClick={logout}><li>Đăng xuất</li></Link>
                </ul>
            )}
        >
            {children}
        </Tippy>
    )
}

export default UserMenu
