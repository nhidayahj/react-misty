import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Row, Col } from 'reactstrap';

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
        setTimeout(() => {
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
        }, 1000)
    }, [])

    function displayShipOrder() {
        return (
            <React.Fragment>
                <p>Name: {custInfo.name}</p>
                <p>Shipping Address: {custShipAdd.street_name}, S({custShipAdd.postal_code}) #{custShipAdd.unit_code}</p>
                <p>Contact Number: {custInfo.mobile_no}</p>
                <hr className="divider"></hr>
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
                            <img src={d.diffusers.image_url} className="checkout-img"
                                style={{ width: "175px", height: "197px" }} alt="product img" />
                        </Col>
                        <Col md={6}>
                            <div className="mt-3">
                                <p>Item: {d.diffusers.diffuser_name}</p>
                                <p>Qty: {d.quantity}</p>
                                <p>Price: {(formatPrice(d.diffusers.cost) * (d.quantity)).toFixed(2)} SGD</p>
                            </div>

                        </Col>
                    </Row>
                )
            }

            let oilList = [];
            for (let e of oils) {
                oilList.push(
                    <Row className="mt-3 mb-3">
                        <Col md={4}>
                            <img src={e.oils.image_url} className="checkout-img"
                                style={{ width: "175px", height: "197px" }} alt="product img" />
                        </Col>
                        <Col md={6}>
                            <div className="mt-3">
                                <p>Item: {e.oils.name}</p>
                                <p>Qty: {e.quantity}</p>
                                <p>Price: {(formatPrice(e.oils.cost) * (e.quantity)).toFixed(2)} SGD</p>
                            </div>
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

                <h3 className="product-headers mt-4 mb-4">Confirm Shipping Details</h3>
                <div className="mt-4 mb-4">
                    {displayShipOrder()}
                </div>
                <div>
                    {displayOrder().diffuserList}
                    {displayOrder().oilList}
                </div>
                <hr className="divider"></hr>
                <div className='mb-3 checkout-total'>
                    <h4 className="checkout-amt-text">Total Amount: {totalAmt} SGD</h4>
                <a href=
                    {"https://tgc11-misty.herokuapp.com/api/checkout/" + localStorage.getItem('customer_id') + "/confirm"}
                    className="btn mt-4 mb-4 checkout-btn">Payment</a>
                </div>
            </div>
        </React.Fragment>
    )
}