import React from "react"
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import classnames from "classnames/bind";

import style from './Quotation.module.scss'

const cx = classnames.bind(style)

function DriverQuotation({drivers, driverId}) {
    console.log(drivers)
    return(
        <div className={cx('wrapper')}>
            {drivers.map((driver, index) => {
                return (
                    <React.Fragment key={index}>
                        {/* ===============render quotation based on driver's id================ */}
                        {driver.id === driverId && 
                            <React.Fragment>
                                {/* ==============driver's infor================= */}
                                <Card className={cx('driver-infor')}>
                                    <Card.Body className={cx('driver-infor__body')}>
                                        <Card.Title className={cx('driver-infor__license-plate')}>
                                            <div>Biển số xe:</div>
                                            <div>{driver.attributes.licensePlate}</div>
                                        </Card.Title>

                                        <Card.Img className={cx('driver-infor__image')} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Cycle_rickshaw_in_Hanoi.jpg/330px-Cycle_rickshaw_in_Hanoi.jpg" />
                                        
                                        <Card.Text className={cx('driver-infor__private-infor')}>
                                            <span>name: <span>{driver.attributes.name}</span></span>
                                            <span>phone number: <span>{driver.attributes.phoneNumber}</span></span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                {/* ====================driver's quotation====================== */}
                                <Table striped bordered hover className={cx('quotation')}>
                                    <thead>
                                        <tr>
                                            <th rowSpan={2}>#</th>
                                            <th colSpan={3}>Bảng báo giá</th>
                                        </tr>
                                        <tr>
                                            <td>Chuyến đi</td>
                                            <td>Giá</td>
                                            <td>Khứ hồi</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Từ Sân Bay đến Đại nội Huế</td>
                                            <td className={cx('price')}>200.000 đ</td>
                                            <td>Không</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Từ Từ Ga Huế đến Đại nội Huế</td>
                                            <td className={cx('price')}>400.000 đ</td>
                                            <td>Không</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Từ Sân Bay đến Sông Hương</td>
                                            <td className={cx('price')}>250.000 đ</td>
                                            <td>Không</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </React.Fragment>
                        } 
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default DriverQuotation
