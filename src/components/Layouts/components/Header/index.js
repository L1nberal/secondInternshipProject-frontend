import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import classnames from 'classnames/bind'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './Header.module.scss'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { AuthContext } from '../../../../Auth'
import UserMenu from './UserMenu'
import {
    faAngleDown,
} from '../../../../assets/FontAwesome'

const cx = classnames.bind(style)

function Header() {
    const { user, databaseLoginHandler, logout } = useContext(AuthContext)
    const navigate = useNavigate()
   

    return (
        <Navbar bg="light" expand="lg" className={cx('wrapper')}>
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown className={cx('options-list')} title="Options" id="basic-nav-dropdown">
                            {!user ? (
                                <NavDropdown.Item className={cx('option-cyclo')}  href="/driver-list">Xích Lô</NavDropdown.Item>
                            ) : (
                                <React.Fragment>
                                    <NavDropdown.Item className={cx('option-cyclo')}  href="/driver-list">Xích Lô</NavDropdown.Item>
                                    <NavDropdown.Item className={cx('option-settings')}  href="/management">Thiết lập</NavDropdown.Item>
                                </React.Fragment>

                            )}
                        </NavDropdown>
                    </Nav>
                    <Nav className={cx('login-container')}>
                        {!user ? (
                            <React.Fragment>
                                <Button variant="dark" className={cx('login-btn')} onClick={() => {
                                    // setIsLoggedIn(true)
                                    navigate('/log-in')
                                }}>
                                    Login
                                </Button>
    
                                <Button variant="dark" className={cx('signup-btn')} onClick={() => {
                                    // setIsLoggedIn(true)
                                    navigate('/sign-up')
                                }}>
                                    Signup
                                </Button>
                            </React.Fragment>
                        ) : (
                            <UserMenu logout={logout}>
                                <div className={cx('user')}>
                                    <img className={cx('user__avatar')} src="https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png"/>
    
                                    <div className={cx('user__infor')}>
                                        <h5 className={cx('username')}>{user.username}</h5>
                                        <FontAwesomeIcon className={cx('username')} icon={faAngleDown} />
                                    </div>
                                </div>
                            </UserMenu>
                        ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
