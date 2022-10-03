import React, {useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind'
import ListGroup from 'react-bootstrap/ListGroup'
import QRCode from "qrcode.react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faFilter, 
    faDownload,
    faQrcode 
} from '../../../../../assets/FontAwesome';
import style from './Drivers.module.scss'

const cx = classnames.bind(style)

function Drivers({ currentDrivers, loading, totalDrivers }) {
    //for navigating to another page
    const navigate = useNavigate()
    // for searching
    const [query, setQuery] = useState(true) 

    //QR popup handler
    const UpdatingPopover = React.forwardRef(
        ({ popper, children, show: _, ...props }, ref) => {
            useEffect(() => {
                console.log('updating!')
                popper.scheduleUpdate()
            }, [children, popper])
        
            return (
                <Popover ref={ref} body {...props}>
                    {children}
                </Popover>
            )
        }
    )
    //loading when infor hasn's been loaded yets
    if(loading) {
        return <Spinner className={cx('spinner')} animation="border" variant="primary" />
    }
    // ================Search feature=================
    // search results are displayed when typing
    const searchResults = document.getElementById('search-results')
    
    if(query != true){
        searchResults.style.display = "block"
            
        if(!query) {
            searchResults.style.display = "none"
        }  
    } 
    
    return(
        <div className={cx('wrapper')}>
            {/* =============filter================ */}
            <div className={cx('filter-container')}>
                <OverlayTrigger trigger="click" placement="left" overlay={
                    <Form className={cx('form')}> 
                        <Form.Control
                            id="search-input"
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <div className={cx('search-results')} id="search-results">
                            {totalDrivers.map(driver => {
                                return(
                                    <React.Fragment key={driver.id}>
                                        {driver.attributes.name.includes(query) && 
                                            <ListGroup variant="flush">
                                                <Link to={`/driver-quotation-${driver.id}`}><ListGroup.Item>{driver.attributes.name}</ListGroup.Item></Link>
                                            </ListGroup>
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </Form>
                }>
                    <Button className={cx('filter-button')}><FontAwesomeIcon icon={faFilter}/></Button>
                </OverlayTrigger>
            
           </div>
    
            {/* ========== list container================ */}
            <ul className={cx('list-group')}>
                {currentDrivers.map(driver => (
                    // =============each list item===================
                    <ListGroup.Item
                        key={driver.id}
                        as="li"
                        className="d-flex justify-content-between align-items-start mb-2 border rounded-2"
                    >
                        {/* ============item information================= */}
                        <div className={cx('list-item')}> 
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Driver {driver.id}: </div>
                                
                                {driver.attributes.name}
                            
                                <div className={cx('phone-number')}>Phone number: <span>{driver.attributes.phoneNumber}</span></div>
                            </div>
    
                            <div className={cx('company')}>company: company</div>
    
                            {/* ==========QR code popup =============== */}
                            <div className={cx('button-container')}>
                                <div className={cx('button-container__overlay-container')}>
                                    <OverlayTrigger
                                        className={cx('container')}
                                        placement='right'
                                        trigger="click"
                                        overlay={
                                            <UpdatingPopover className={cx('popover-container')} id="popover-contained" >

                                                <QRCode className={cx('qrcode-shown')} id="qrcode-shown" size={150} value={`http://localhost:3001/driver-quotation-${driver.id}`}/>

                                                <Button
                                                    className={cx('download-button')}
                                                    onClick={() => navigate(`/qrcode-download-${driver.id}`)}
                                                >
                                                    <FontAwesomeIcon icon={faDownload}/>
                                                </Button>
                                            </UpdatingPopover>
                                        }
                                    >
                                        <Button><FontAwesomeIcon icon={faQrcode}/></Button>
                                    </OverlayTrigger>
                                </div>
                                {/* ================Go to quotation button ===================*/}
                                <Link className={cx('button-container__driver-quotation')} to={`/driver-quotation-${driver.id}`} state={driver}><Button variant="outline-secondary">Chi tiết</Button></Link>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ul>
        </div>
    )
}

export default Drivers
