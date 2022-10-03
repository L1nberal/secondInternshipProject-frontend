import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import classnames from 'classnames/bind'
// import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss'

const cx = classnames.bind(style)

function PaginationComponent({ driversPerPage, totalDrivers, paginate}) {
    // ===========number of pages===================
    const pageNumbers = []
    
    for(let i = 1; i<= Math.ceil(totalDrivers / driversPerPage); i++) {
        pageNumbers.push(i)
    }


    return(
        <Pagination className={cx('pagination')}>
            <Pagination.First />
            <Pagination.Prev/>
            {/* ===============render pages indexes================ */}
            {pageNumbers.map(number => {
                return (
                    <a onClick={() => {paginate(number)}} href='#' key={number} className={cx('each-page-pagination')}>
                        <Pagination.Item >{number}</Pagination.Item>
                    </a>
                )
            })}
            <Pagination.Next/>
            <Pagination.Last />
        </Pagination>
    )
    
}

export default PaginationComponent