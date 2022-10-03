import classnames from 'classnames/bind'

import style from './DefaultLayout.module.scss'
import Header from "../components/Header"

const cx = classnames.bind(style)

function DefaultLayout({children}) {
    return (
        <div className={cx('wrapper')}>
            <Header/>

            <div className={cx('content')}>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout
