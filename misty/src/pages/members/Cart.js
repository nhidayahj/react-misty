import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { useLocation, useHistory } from 'react-router-dom';
import {
    ListGroup, ListGroupItem, Button
} from 'reactstrap';



const baseUrl = config.baseUrl;


export default function Cart() {
    const location = useLocation();
    const customer_id = localStorage.getItem('customer_id')

    const [customer, setCustomer] = useState('')
    const [cartItems, setCartItems] = useState({})
    const [pageLoaded, isPageLoaded] = useState(false)
    // have an update btn
    // const [updateItem, setUpdate] = useState(0);


    useEffect(() => {
        const fetch = async () => {
            setCustomer(customer_id);
            let items = await axios.get(baseUrl +
                `/api/shoppingCart/${customer_id}`);
            setCartItems(items.data)
            localStorage.setItem("diffusers", JSON.stringify(items.data.diffusers))
            localStorage.setItem("oils", JSON.stringify(items.data.oils))
            isPageLoaded(true);
        }
        fetch();
    }, [])

    console.log("All Items:", cartItems);

    function displayDiffuserItems() {
        let diffuserCart = []
        for (let d of cartItems.diffusers) {
            diffuserCart.push(
                <ListGroup className="mt-3 mb-3">
                    <img src={d.diffusers.image_url} alt="product img" style={{ width: "175px", height: "197px" }} />
                    <ListGroupItem id={d.diffuser_id}>Item: {d.diffusers.diffuser_name}</ListGroupItem>
                    <ListGroupItem id={d.diffuser_id}>Quantity: {d.quantity}</ListGroupItem>
                    <ListGroupItem id={d.diffuser_id}>Price: SGD {formatPrice(d.diffusers.cost)}</ListGroupItem>
                </ListGroup>
            );
        }
        return diffuserCart;
    }

    function displayOilItems() {
        let oilCart = []
        for (let i of cartItems.oils) {
            oilCart.push(
                <ListGroup className="mt-3 mb-3">
                    <img src={i.oils.image_url} alt="product img" style={{ width: "175px", height: "197px" }} />
                    <ListGroupItem id={i.oil_id}>Item: {i.oils.name}</ListGroupItem>
                    <ListGroupItem id={i.oil_id}>Quantity: {i.quantity}</ListGroupItem>
                    <ListGroupItem id={i.oil_id}>Price: SGD {formatPrice(i.oils.cost)}</ListGroupItem>
                </ListGroup>


            );
        }
        return oilCart;
    }

    function formatPrice(price) {
        return parseFloat(price / 100.00).toFixed(2)
    }

    const history = useHistory();
    const confirmOrder = () => {
        alert("Customer confirming order");
        history.push(`/profile/${customer_id}/confirm`);
    }

    return (
        <React.Fragment>
            <div className="container">
                <h4 className="mt-3">Diffuser Cart</h4>
                {pageLoaded ? displayDiffuserItems() : null}

                <h4 className="mt-3">Essential Oil Cart</h4>
                {pageLoaded ? displayOilItems() : null}
            </div>
            <div>
                <Button outline color="info" onClick={confirmOrder}>Proceed to Checkout</Button>
            </div>
        </React.Fragment>
    )
}