import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Button } from 'reactstrap';

const baseUrl = config.baseUrl;

export default function Checkout() {

    const [custDiffusers, setDiffusers] = useState([]);
    const [custOils, setOils] = useState([]);
    const [custShipAdd, setShipAdd] = useState([])

    const location = useLocation();
    const diffusers = location.state.orderDiffusers;
    const oils = location.state.orderOils;
    const totalAmt = location.state.total

    useEffect(() => {
        const fetch = async () => {
            if (localStorage.getItem('customer_id') != null) {
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
            if (localStorage.getItem('customer_id') != null) {
                let response = await axios.get(`${baseUrl}/api/checkout/${localStorage.getItem('customer_id')}/latest/orders`);
                if (response.status === 200) {
                    console.log(response.data);
                    setShipAdd(response.data);

                }
            }
        }
        fetch()
    }, [])




    // const stripeCheckout = async(e) => {
    //     let checkout = await axios.post(`${baseUrl}/api/checkout/process_payment`);
    //     if (checkout.data.status === 200) {
    //         console.log("OK")
    //     }
    // }

    return (
        <React.Fragment>
            <h3>Order Details</h3>
            <a href=
            {"https://3001-emerald-herring-pjfc5f72.ws-us03.gitpod.io/api/checkout/"+localStorage.getItem('customer_id')+"/confirm"}
            className="btn btn-primary mt-4">Payment</a>
            
        </React.Fragment>
    )
}