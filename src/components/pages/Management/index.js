import React, { useState, useRef, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import classnames from 'classnames/bind'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBScrollspy, MDBScrollspyLink } from 'mdb-react-ui-kit';
import $ from "jquery";

import style from './Management.module.scss'

const cx = classnames.bind(style)

function Management({drivers}) {
    let ageContainer = document.getElementById('age-container')
    // ============for adding from================
    const collapseSection01 = useRef(null);
    const collapseSection02 = useRef(null);
    const collapseContainerRef2 = useRef(null);
   
    // ==============get and print out driver's age automatically===========
    const getYear = (e) => {
        let driverDateOfBirth = new Date(e.target.value)
        let today = new Date()

        let driverAge = today.getFullYear() - driverDateOfBirth.getFullYear()
        ageContainer.innerHTML = driverAge
        setDriverAge(driverAge)
    }

    // ============post method to send infor to server=============
    // set driver's infor
    const [name, setName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [licensePlate, setLicensePlate] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [photo, setPhoto] = useState()
    const [driverAge, setDriverAge] = useState()
    // driver submit handler
    function driverSubmitHandler(e) {
        e.preventDefault()

        axios.post('http://xichloapi.huecit.com/api/drivers', {
            "data": {
                name: name,
                phoneNumber: phoneNumber,
                licensePlate: licensePlate,
                dateOfBirth: dateOfBirth,
                age: driverAge,
                photo: photo,
            }
        })
            .then((response) => {
            console.log(response);
            }, (error) => {
            console.log(error);
        });
    }
    // set quotation's infor
    const [tour, setTour] = useState()
    const [price, setPrice] = useState(0)
    const [returnTrip, setReturnTrip] = useState('Không')
    const [turn, setTurn] = useState(1)
    console.log(tour)
    console.log(price)
    console.log(returnTrip)
    console.log(turn)
    // quotation submit handler
    function quotationSubmitHandler(e) {
        e.preventDefault()

        axios.post('http://xichloapi.huecit.com/api/quotes', {
            "data": {
               tour: tour,
               price: price,
               returnTrip: returnTrip,
               turn: turn,
            }
        })
            .then((response) => {
            console.log(response);
            }, (error) => {
            console.log(error);
        });
    }
    // ====================for delete form=========================
    const collapseSection1 = useRef(null);
    const collapseSection2 = useRef(null);
    const collapseContainerRef1 = useRef(null);
    // axios with get method (driver)
    axios.get('http://xichloapi.huecit.com/api/drivers')
        .then((response) => {
            // console.log(response.data);
        });  
 
    // driver checkboxes handler
    const driverChangeHandler = () => { //check all individual drivers
        const isChecked = $('#all-drivers').prop('checked')
        if(isChecked) {
            $('input[name="each-driver"]').prop('checked', true)
        } else (
            $('input[name="each-driver"]').prop('checked', false)

        )
        driverDeleteBtn()
    }
    const driverCheckAllHandler = (driver) => { //check the all-drivers checkbox
        const isCheckedAll = $('input[name="each-driver"]').length === $('input[name="each-driver"]:checked').length
        if(isCheckedAll) {
            $('#all-drivers').prop('checked', true)
        }else{
            $('#all-drivers').prop('checked', false)
        }
        driverDeleteBtn()
    }

    // set driver delete button as being disabled if no checkbox is checked
    const driverDeleteBtn = () => {
        const numberOfBoxesChecked = $('input[name="each-driver"]:checked').length
        
        if(numberOfBoxesChecked > 0) {
            $('button[name="driver-delete-btn"]').prop("disabled", false)
        }else{
            $('button[name="driver-delete-btn"]').prop("disabled", true)
        }
    }   
    // driver delete button clicked
    $('button[name="driver-delete-btn"]').click(function(iddd) {
        console.log(iddd)
        // const headers = {
        //     'authorization': 'token',
        //     'foo': 'bar'
        // }

        // axios.delete(`http://xichloapi.huecit.com/api/drivers/${driver.id}`, { data: {headers} })
        //     .then(response => console.log(response))
    })
    // ====================for quotation delete form=========================
    const quotationChangeHandler = () => {//check all individual quotations
        const isChecked = $('#all-quotations').prop('checked')

        if(isChecked) {
            $('input[name="each-quotation"]').prop('checked', true)
        } else (
            $('input[name="each-quotation"]').prop('checked', false)
        )
        quotationDeleteBtn()
    }

    const quotationCheckAllHandler = () => {//check the all-quotations checkbox
        const isCheckedAll = $('input[name="each-quotation"]').length === $('input[name="each-quotation"]:checked').length
        if(isCheckedAll) {
            $('#all-quotations').prop('checked', true)
        }else{
            $('#all-quotations').prop('checked', false)
        }
        quotationDeleteBtn()
    }
    // set quotation delete button as being disabled if no checkbox is checked
    const quotationDeleteBtn = () => {
        const numberOfBoxesChecked = $('input[name="each-quotation"]:checked').length
        
        if(numberOfBoxesChecked > 0) {
            $('button[name="quotation-delete-btn"]').prop("disabled", false)
        }else{
            $('button[name="quotation-delete-btn"]').prop("disabled", true)
        }
    }
    // quotation delete button clicked
    $('button[name="quotation-delete-btn"]').click(function() {
        const headers = {
            'authorization': 'token',
            'foo': 'bar'
        }

        axios.delete('http://xichloapi.huecit.com/api/quotations/1', { data: {headers} })
            .then(response => console.log(response))
    })

    return (
        <div className={cx('wrapper')}>
            <Accordion defaultActiveKey="0" className={cx('accordion')}>
                {/* =============adding new driver================ */}
                <Accordion.Item eventKey="0" className={cx('add-item')}>
                    <Accordion.Header>Thêm tài xế</Accordion.Header>
                    <Accordion.Body>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md='10'>
                                    <div id='collapse' ref={collapseContainerRef2} className='scrollspy-example'>
                                        {/* =====================driver delete form===================== */}
                                        <section ref={collapseSection01} id='section-collapse-1' >
                                            {/* =========================driver adding from================== */}
                                            <Form className={cx('driver-adding-form')} onSubmit={driverSubmitHandler} >
                                                <h3 className={cx('driver-adding-form__title')}>Thông tin cá nhân</h3>
                                                {/* =============driver's name================== */}
                                                <Form.Group className={cx('driver-adding-form__name')}>
                                                    <Form.Label>Tên tài xế</Form.Label>
                                                    <Form.Control 
                                                        placeholder="input" 
                                                        name='name' 
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </Form.Group>
                                                {/* =============driver's phone number================== */}
                                                <Form.Group className={cx('driver-adding-form__phone-number')}>
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <Form.Control 
                                                        placeholder="input"
                                                        name='phoneNumber' 
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </Form.Group>
                                                {/* =============driver's license plate================== */}
                                                <Form.Group className={cx('driver-adding-form__license-plate')}>
                                                    <Form.Label>Biển số xe</Form.Label>
                                                    <Form.Control 
                                                        placeholder="input" 
                                                        name='licensePlate' 
                                                        onChange={(e) => setLicensePlate(e.target.value)}
                                                    />
                                                </Form.Group>
                                                {/* =============driver's date of birth================== */}
                                                <Form.Group className={cx('driver-adding-form__date-of-birth')}>
                                                    <Form.Label>Ngày sinh</Form.Label>

                                                    <div className={cx('container')}>
                                                        <Form.Control 
                                                            type='date' 
                                                            id='date-of-birth-input' 
                                                            placeholder="input" 
                                                            onChange={(e) => {
                                                                getYear(e)
                                                                setDateOfBirth(e.target.value)
                                                            }}
                                                            name="dateOfBirth"
                                                        />

                                                        <div className={cx('age')}>
                                                            Tuổi:

                                                            <span className={cx('age-container')} id="age-container" name="age">0</span>
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                                {/* =============driver's photo================== */}
                                                <Form.Group className={cx('driver-adding-form__photo')}>
                                                    <Form.Label>Ảnh của tài xế</Form.Label>

                                                    <Form.Control 
                                                        type='file' 
                                                        onChange={e => setPhoto(e.target.fieldset)}
                                                    />
                                                </Form.Group>

                                                <Button type="submit" className={cx('driver-adding-form__submit-btn')}>Submit</Button>
                                            </Form>                                       
                                        </section>
                                        {/* ==================quotation delete form===================== */}
                                        <section ref={collapseSection02} id='section-collapse-2' className={cx('quotations')}>
                                            {/* ===========quotaion adding form=================== */}
                                            <Form className={cx('quotation-adding-form')} onSubmit={quotationSubmitHandler}>
                                                <h3 className={cx('quotation-adding-form__title')}>Bảng báo giá</h3>
                                                
                                                <Form.Group className={cx('quotation-adding-form__tour')}>
                                                    <Form.Label>Hành trình</Form.Label>
                                                    <Form.Control 
                                                        placeholder="input" 
                                                        name="tour"
                                                        onChange={e => setTour(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className={cx('quotation-adding-form__phone-number')}>
                                                    <Form.Label>Lượt đi</Form.Label>
                                                    <Form.Control 
                                                        placeholder="input"
                                                        name='turn' 
                                                        onChange={(e) => setTurn(parseInt(e.target.value))}
                                                    />
                                                </Form.Group>

                                                <Form.Group className={cx('quotation-adding-form__price')}>
                                                    <Form.Label>Giá</Form.Label>

                                                    <Form.Control 
                                                        placeholder="input" 
                                                        name="price"
                                                        onChange={e => setPrice(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className={cx('quotation-adding-form__returnTrip')}>
                                                    <Form.Label>Khứ hồi</Form.Label>

                                                    <Form.Select 
                                                        name="returnTrip" 
                                                        onChange={e => setReturnTrip(e.target.value)}
                                                    >
                                                        <option>không</option>
                                                        <option>có</option>
                                                    </Form.Select>                                    
                                                </Form.Group>
                                                
                                                <Button type="submit" className={cx('quotation-adding-form__submit-btn')}>Submit</Button>
                                            </Form>
                                        </section>
                                    </div>
                                </MDBCol>

                                <MDBCol md='2'>
                                    <MDBScrollspy>
                                        <MDBScrollspyLink targetRef={collapseSection01} style={{fontSize: "15px", padding: "5px", width: "140px"}}>Tài xế xích lô</MDBScrollspyLink>
                                        <MDBScrollspyLink targetRef={collapseSection02} style={{fontSize: "15px", padding: "5px", width: "140px"}}>Bảng báo giá</MDBScrollspyLink>
                                    </MDBScrollspy>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>   
                    </Accordion.Body>
                </Accordion.Item>
                {/* =============delete form=============== */}
                <Accordion.Item eventKey="1" className={cx('delete-item')}>
                    <Accordion.Header>Delete Form</Accordion.Header>
                    
                    <Accordion.Body>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md='10'>
                                    <div id='collapse' ref={collapseContainerRef1} className='scrollspy-example'>
                                        {/* =====================driver delete form===================== */}
                                        <section ref={collapseSection1} id='section-collapse-1' className={cx('drivers')}>
                                            <div className={cx('head')}>
                                                <h3 className={cx('head__title')}>Tài xế xích lô</h3>

                                                <div className={cx('head__actions')}>
                                                    <Button 
                                                        className={cx('head__actions-button')} 
                                                        name="driver-delete-btn" 
                                                        variant="outline-danger" 
                                                        disabled
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            <Table responsive="sm" className={cx('table')}>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="all-drivers"
                                                                onChange={(e) => driverChangeHandler(e)}
                                                            />
                                                        </th>
                                                        <th>#</th>
                                                        <th>Họ và Tên</th>
                                                        <th>Số điện thoại</th>
                                                        <th>Biển số xe</th>
                                                        <th>Ngày sinh</th>
                                                        <th>Tuổi</th>
                                                        <th>Bảng báo giá</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {drivers.map((driver, index) => {
                                                        return(
                                                            <React.Fragment key={index}>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check 
                                                                            type="checkbox"
                                                                            name="each-driver"
                                                                            onChange={() => driverCheckAllHandler(driver)}
                                                                        />
                                                                    </td>
                                                                    <td>{driver.id}</td>
                                                                    <td>{driver.attributes.name}</td>
                                                                    <td>{driver.attributes.phoneNumber}</td>
                                                                    <td>{driver.attributes.licensePlate}</td>
                                                                    <td>{driver.attributes.dateOfBirth}</td>
                                                                    <td>{driver.attributes.age}</td>
                                                                    <td>{driver.attributes.quotation.data}</td>
                                                                </tr>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>                                       
                                        </section>
                                        {/* ==================quotation delete form===================== */}
                                        <section ref={collapseSection2} id='section-collapse-2' className={cx('quotations')}>
                                            <div className={cx('head')}>
                                                <h3 className={cx('head__title')}>Bảng báo giá</h3>

                                                <div className={cx('head__actions')}>
                                                    <Button 
                                                        className={cx('head__actions-button')} 
                                                        name="quotation-delete-btn" 
                                                        variant="outline-danger" 
                                                        disabled
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            <Table responsive="sm" className={cx('table')}>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="all-quotations"
                                                                onChange={(e) => quotationChangeHandler(e)}
                                                            />
                                                        </th>
                                                        <th>#</th>
                                                        <th>Chuyến đi</th>
                                                        <th>Giá</th>
                                                        <th>Chuyến khứ hồi</th>
                                                        <th>Lượt</th>
                                                        <th>Tài xế</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <Form.Check 
                                                                type="checkbox"
                                                                name="each-quotation"
                                                                onChange={e => quotationCheckAllHandler(e)}
                                                            />
                                                        </td>
                                                        <td>1</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </Table> 
                                        </section>
                                    </div>
                                </MDBCol>

                                <MDBCol md='2'>
                                    <MDBScrollspy>
                                        <MDBScrollspyLink targetRef={collapseSection1} style={{fontSize: "15px", padding: "5px", width: "140px"}}>Tài xế xích lô</MDBScrollspyLink>
                                        <MDBScrollspyLink targetRef={collapseSection2} style={{fontSize: "15px", padding: "5px", width: "140px"}}>Bảng báo giá</MDBScrollspyLink>
                                    </MDBScrollspy>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Management
