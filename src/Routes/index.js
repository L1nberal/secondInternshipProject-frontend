import {Routes, Route} from 'react-router-dom' 
import React, {useState, useEffect} from 'react'
import axios from 'axios'

import DefaultLayout from '../components/Layouts/DefaultLayout'
import Home from "../components/pages/Home"
import DriverQuotation from "../components/pages/Quotation"
import DriverList from "../components/pages/DriverList"
import Management from '../components/pages/Management'
import QRCodeDownload from '../components/pages/DriverList/components/QRCodeDownload'


function PublishedRoutes() {
    const [loading, setLoading] = useState(false)

    // // get infor from API
    // useEffect(() => {
    //     const fetchDrivers = async () => {
    //         setLoading(true)
    //         const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    //         setDrivers(res.data)
    //         setLoading(false)
    //     }

    //     fetchDrivers()
    // }, [])

    // get drivers' infor from API
    const [drivers, setDrivers] = useState([])
    useEffect(() => {
        axios.get("http://xichloapi.huecit.com/api/drivers?populate=*")
            .then(function (response) {
                setDrivers(response.data.data)
            });
    }, [])

    // =================pages' routes=======================
    const PublishedRoutes = [
        {path: '/', component: Home},
        {path: '/driver-list', component: DriverList},
        {path: '/management', component: Management},
    ]
    // =================quotations' routes================
    const quotationRoutes = 
    drivers.map(driver => {
        return {path: `/driver-quotation-${driver.id}`, component: DriverQuotation, id: driver.id}
    })

    // ==============qrcode download====================
    const qrcodeDownloadRoutes = 
    drivers.map(driver => {
        return {path: `/qrcode-download-${driver.id}`, component: QRCodeDownload, id: driver.id}
    })
    return (
        <Routes>
            {/* ============ pages' routes ================*/}
            {PublishedRoutes.map((route, index) => {
                const Component = route.component
                let Layout = DefaultLayout

                if(route.layout) {{
                Layout = route.layout
                }}

                return (
                <Route 
                    key={index} 
                    path={route.path} 
                    element={
                    <Layout>
                        <Component drivers={drivers} loading={loading}/>
                    </Layout>
                    }
                />
                )
            })}
            {/* ====================each quotation's route================ */}
            {quotationRoutes.map((route, index) => {
                const Component = route.component
                let Layout = DefaultLayout
                const driverId = route.id

                if(route.layout) {{
                Layout = route.layout
                }}

                return (
                <Route 
                    key={index} 
                    path={route.path} 
                    element={
                    <Layout>
                        <Component drivers={drivers} loading={loading} driverId={driverId}/>
                    </Layout>
                    }
                />
                )
            })}
            {/* ====================each qrcode-download's route================ */}
            {qrcodeDownloadRoutes.map((route, index) => {
                const Component = route.component
                let Layout = DefaultLayout
                const driverId = route.id

                if(route.layout) {{
                Layout = route.layout
                }}

                return (
                <Route 
                    key={index} 
                    path={route.path} 
                    element={
                    <Layout>
                        <Component driverId={driverId}/>
                    </Layout>
                    }
                />
                )
            })}
        </Routes>
    )
}


export default PublishedRoutes
