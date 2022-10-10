import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

import style from './Signup.module.scss'
import { AuthContext } from '../../../Auth';

const cx = classnames.bind(style)

function Signup() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    //checking errors for logging in with database 
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Bạn chưa nhập email!')
            .email(),
        username: Yup.string()
            .required('Bạn chưa nhập username!'),
        password: Yup.string()
            .required('Bạn chưa nhập mật khẩu')
            .min(6, 'mật khẩu phải dài ít nhất 6 kí tự'),
         
    })
    const formOptions = { resolver: yupResolver(formSchema)}
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState
    //used to pop up a dialogue when an error exists
    const [popup, setPopup] = useState(false)

    // login with database
    function onSubmit(data) {
        axios.post('http://xichloapi.huecit.com/api/auth/local/register', {
            email: data.email,
            username: data.username,
            password: data.password
        })
            .then(respond => {
                navigate('/log-in')
            })
            .catch(error => {
                console.log(error)
                setShow(true)
            })      
    }
    // navigate when already logged in
    if(user) {
        navigate('/')
    }
    // modal dialogue when errors exist
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className={cx('wrapper')}>
            {/* =======================modal dialogue when errors exist=============== */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Có Lỗi xảy ra</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thông tin bạn nhập không khả dụng, mời bạn thử lại!</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-warning" onClick={handleClose}>
                        Đã hiểu
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* =====================form========================= */}
            <Form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
                <Form.Group className={cx('form-group')} controlId="formBasicEmail">
                    <Form.Label className={cx('form-group__title')}>Email address</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='email' 
                        className={cx('form-group__input')}
                        name='email'
                        {...register('email')}
                    />
                    <Form.Text className={cx('form-group__message')}>
                        {errors.email?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className={cx('form-group')} controlId="formBasicEmail">
                    <Form.Label className={cx('form-group__title')}>Email address</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='username' 
                        className={cx('form-group__input')}
                        name='username'
                        {...register('username')}
                    />
                    <Form.Text className={cx('form-group__message')}>
                        {errors.username?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className={cx('form-group')} controlId="formBasicPassword">
                    <Form.Label className={cx('form-group__title')}>Password</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='password' 
                        className={cx('form-group__input')}
                        name='password'
                        {...register('password')}
                    />
                    <Form.Text className={cx('form-group__message')}>
                        {errors.password?.message}
                    </Form.Text>
                </Form.Group>
              
                <Button 
                    variant="secondary" 
                    type="submit"
                    className={cx('form-submit-btn')}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Signup
