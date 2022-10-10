import ListGroup from 'react-bootstrap/ListGroup'
import classnames from 'classnames/bind'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import PaginationComponent from './components/Pagination';
import Drivers from './components/Drivers';
import style from './DriverList.module.scss'
import { AuthContext } from '../../../Auth';

const cx = classnames.bind(style)

function DriverList({drivers, loading}) {
    // destructuring from AuthContext
    const { user, databaseLoginHandler } = useContext(AuthContext)
    
    // =====store current page of the pagination and number of items in a page===========
    const [currentPage, setCurrentPage] = useState(1)
    const [driversPerPage, SetDriversPerPage] = useState(5)
    
    // ========Finding currentDrivers to render out on a page==================
    const indexOfLastDriver = currentPage * driversPerPage
    const indexOfFirstDriver = indexOfLastDriver - driversPerPage
    const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver)

    // change page
    const paginate = (number) => {
        setCurrentPage(number)
        console.log(number)
    }

    return(
       <div className={cx('wrapper')}>
            {/* ================drivers on a page================== */}
            <ListGroup  className={cx('list-group')} as="ol" numbered>
                <Drivers currentDrivers={currentDrivers} totalDrivers={drivers}  loading={loading}/>
            </ListGroup>
            {/* ======================pagination==================== */}
            <PaginationComponent 
                driversPerPage={driversPerPage} 
                totalDrivers={drivers.length} 
                paginate={paginate} 
                drivers={drivers}
            />

            
       </div>
    )
}


export default DriverList
