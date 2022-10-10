import React, {useRef} from "react";
import QRCode from "qrcode.react";
import Button from 'react-bootstrap/Button';
import * as htmlToImage from "html-to-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import { useNavigate } from "react-router-dom";

import style from './QRCodeDownload.module.scss'
import { 
    faDownload,
} from '../../../../../assets/FontAwesome';

const cx = classnames.bind(style)


function QRCodeDownload({driverId}) {
    // navigate
    const navigate = useNavigate()
    // html to image
    const node = document.getElementById('domEl');
    const domEl = useRef(null); 

    const downloadImage = async () => { 
        const dataUrl = await htmlToImage.toPng(domEl.current);
     
        // download image
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
    }
    
    return (
        <div className={cx('wrapper')}>
            <Button onClick={downloadImage} className={cx('download-btn')}>Tải xuống <FontAwesomeIcon icon={faDownload}/></Button>
            
            <div id="domEl" ref={domEl} className={cx('infor-container')}>
                <div className={cx('QRcode-for-downloading')}>
                    <div className={cx('title')}>
                        <h3>UBND Thành divhố Huế</h3>
                        <h3>Tổ quản lý xích lô du lịch</h3>
                    </div>
                    <QRCode className={cx('qrcode-hidden')} id="qrcode-hidden" size={400} value={`http://localhost:3001/driver-quotation-${driverId}`}/>
                </div>
            </div>

            <Button onClick={() => navigate('/driver-list')} variant="secondary" className={cx('go-to-driver-list-btn')}>Driver List</Button>
        </div>
    )
}

export default QRCodeDownload
