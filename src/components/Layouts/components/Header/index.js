import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import classnames from 'classnames/bind'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'


import style from './Header.module.scss'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'

const cx = classnames.bind(style)

function Header() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // let isLoggedIn = false
    // console.log(isLoggedIn)

    return (
        <Navbar bg="light" expand="lg" className={cx('wrapper')}>
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown className={cx('options-list')} title="Options" id="basic-nav-dropdown">
                            {isLoggedIn === false ? (
                                <NavDropdown.Item className={cx('option-cyclo')}  href="/driver-list">Xích Lô</NavDropdown.Item>
                            ) : (
                                <React.Fragment>
                                    <NavDropdown.Item className={cx('option-cyclo')}  href="/driver-list">Xích Lô</NavDropdown.Item>
                                    <NavDropdown.Item className={cx('option-settings')}  href="/management">Thiết lập</NavDropdown.Item>
                                </React.Fragment>

                            )}
                        </NavDropdown>
                    </Nav>
                    <Nav className={cx('login-btn-container')}>
                        {isLoggedIn === false ? (
                            <Button variant="dark" className={cx('login-btn')} onClick={() => {
                                setIsLoggedIn(true)
                                navigate('/')
                            }}>
                                Login
                            </Button>
                        ) : (
                            <Button variant="dark" className={cx('login-btn')} onClick={() => {
                                setIsLoggedIn(false)
                                navigate('/')
                            }}>
                                User
                            </Button>
                        ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
