import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import {Row, Col } from 'reactstrap';

const baseUrl = config.baseUrl;

export default function Checkout() {

    const [custDiffusers, setDiffusers] = useState([]);
    const [custOils, setOils] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [custShipAdd, setShipAdd] = useState([])
    const [custInfo, setCustInfo] = useState([])

    const location = useLocation();
    const diffusers = location.state.orderDiffusers;
    const oils = location.state.orderOils;
    const totalAmt = location.state.total

    useEffect(() => {
        const fetch = async () => {
            if (localStorage.getItem('customer_id') !== null) {
                setLoggedIn(true);
                let response = await axios.get(`${baseUrl}/api/checkout/${localStorage.getItem('customer_id')}`);
                if (response.status === 200) {
                    console.log(response.data);
                    setDiffusers(response.data.diffuserItems);
                    setOils(response.data.oilItems);
                }
            }
        }
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (localStorage.getItem('customer_id') !== null) {
                let response = await axios.get(`${baseUrl}/api/checkout/${localStorage.getItem('customer_id')}/latest/orders`);
                if (response.status === 200) {
                    setShipAdd(response.data)
                    setCustInfo(response.data.customers);
                }
            }
        }
        fetch()
    }, [])

    function displayShipOrder() {
        return (
            <React.Fragment>
                <h5>Name: {custInfo.name}</h5>
                <h5>Shipping Address: {custShipAdd.street_name}, S({custShipAdd.postal_code}) #{custShipAdd.unit_code}</h5>
                <h5>Contact Number: {custInfo.mobile_no}</h5>
            </React.Fragment>
        )
    }

    function displayOrder() {
        if (localStorage.getItem('customer_id') !== null) {
            let diffuserList = [];
            for (let d of diffusers) {
                diffuserList.push(
                    <Row className="mt-3 mb-3">
                        <Col md={4}>
                            <img src={d.diffusers.image_url} style={{ width: "175px", height: "197px" }} />
                        </Col>
                        <Col md={6}>
                            <p>Item: {d.diffusers.diffuser_name}</p>
                            <p>Qty: {d.quantity}</p>
                            <p>Price: {(formatPrice(d.diffusers.cost) * (d.quantity)).toFixed(2)} SGD</p>
                        </Col>
                    </Row>
                )
            }

            let oilList = [];
            for (let e of oils) {
                oilList.push(
                    <Row className="mt-3 mb-3">
                        <Col md={4}>
                            <img src={e.oils.image_url} style={{ width: "175px", height: "197px" }} />
                        </Col>
                        <Col md={6}>
                            <p>Item: {e.oils.name}</p>
                            <p>Qty: {e.quantity}</p>
                            <p>Price: {(formatPrice(e.oils.cost) * (e.quantity)).toFixed(2)} SGD</p>
                        </Col>
                    </Row>
                )
            }
            return { diffuserList, oilList };
        }
    }

    function formatPrice(price) {
        return parseFloat(price / 100.00).toFixed(2)
    }

    return (
        <React.Fragment>
            <div className="container">

                <h3>Shipping Details</h3>
                <div className="mt-3 mb-4">
                    {displayShipOrder()}
                </div>
                <div>
                    {displayOrder().diffuserList}
                    {displayOrder().oilList}
                </div>
                <div className='mt-4 mb-3'>
                    <h4>Total Amount: {totalAmt} SGD</h4>
                </div>

                <a href=
                    {"https://3001-emerald-herring-pjfc5f72.ws-us03.gitpod.io/api/checkout/" + localStorage.getItem('customer_id') + "/confirm"}
                    className="btn btn-primary mt-4 mb-4">Payment</a>

            </div>
        </React.Fragment>
    )
}