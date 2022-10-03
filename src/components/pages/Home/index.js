import classnames from 'classnames/bind'
import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';

import style from './Home.module.scss'

const cx = classnames.bind(style)


function Home() {
    // ==============for carousel==================
    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    
    return(
       <div className={cx('wrapper')}>
        {/* ===================carousel==================== */}
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item className={cx('carousel-item')}>
                    <img
                        className="d-block w-100"
                        src="/Images/background-castle.webp"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Đại nội Huế</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={cx('carousel-item')}>
                    <img
                        className="d-block w-100"
                        src="/Images/background-bridge.webp"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Cầu Gỗ Lim</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
       </div>
    )
}

export default Home
