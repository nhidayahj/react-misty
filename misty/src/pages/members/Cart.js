import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { useLocation, useHistory } from 'react-router-dom';
import {
    ListGroup, ListGroupItem, Button,
} from 'reactstrap';



const baseUrl = config.baseUrl;


export default function Cart() {
    const customer_id = localStorage.getItem('customer_id')
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [customer, setCustomer] = useState('')
    const [diffuserItem, setDiffuser] = useState([]);
    const [oilItem, setOil] = useState([]);
    // const [cartItems, setCartItems] = useState({})
    const [pageLoaded, isPageLoaded] = useState(false)
    


    useEffect(() => {
        const fetch = async () => {
            // check if customer is logged in
            if (localStorage.getItem('customer_id') !== null) {
                setLoggedIn(true);
                setCustomer(localStorage.getItem('customer_id'))
                // then get the customer's cart items
                let items = await axios.get(baseUrl +
                    `/api/shoppingCart/${localStorage.getItem('customer_id')}`);
                // separate diffusers & oils
                setDiffuser(items.data.diffusers)
                setOil(items.data.oils)
                localStorage.setItem("diffusers", JSON.stringify(items.data.diffusers))
                localStorage.setItem("oils", JSON.stringify(items.data.oils))
                isPageLoaded(true);
            }
            else {
                // if customer not logged in, then re-direct to log in page
            }
        }
        fetch();
    }, [customer])

    console.log("Diffuser Items:", diffuserItem);
    console.log("Oil Items:", oilItem);

    const incrementDiffQty = (e) => {
        let itemIndex = diffuserItem.findIndex(d => d.diffusers.id === parseInt(e.target.name));
        let cloned = [...diffuserItem];
        cloned[itemIndex].quantity += 1;
        setDiffuser(cloned);

    }

    const decrementDiffQty = (e) => {
        let itemIndex = diffuserItem.findIndex(d => d.diffusers.id === parseInt(e.target.name));
        let cloned = [...diffuserItem]; 
        if ((cloned[itemIndex]).quantity > 1){
            cloned[itemIndex].quantity -= 1;
        } else {
            // product qty is alr 1 
        }
        setDiffuser(cloned);
    }

    const updateDiffQty = async (e) => {
        let customer_id = localStorage.getItem('customer_id');
        let updateQty = await axios.get(`${baseUrl}/diffuser/${customer_id}/${e.target.name}/update`);
        if (updateQty.data.status == 200 ) {
            return alert("Quantity updated")
        } else {
            return alert("Product is running low.")
        }
    }

    const incrementOilQty = (e) => {
        let itemIndex = oilItem.findIndex(i => i.oils.id === parseInt(e.target.name));
        let cloned = [...oilItem]; 
        cloned[itemIndex].quantity += 1;
        setOil(cloned);
    }

    const decrementOilQty = (e) => {
        let itemIndex = oilItem.findIndex(i => i.oils.id === parseInt(e.target.name));
        let cloned = [...oilItem]; 
        if ((cloned[itemIndex]).quantity > 1){
            cloned[itemIndex].quantity -= 1;
        } else {
            // product qty is alr 1 
        }
        setOil(cloned);
    }

    const updateOilQty = async (e) => {
        let customer_id = localStorage.getItem('customer_id');
        let updateQty = await axios.get(`${baseUrl}/oil/${customer_id}/${e.target.name}/update`);
    }

    function displayDiffuserItems() {
        let diffuserCart = []
        for (let d of diffuserItem) {
            diffuserCart.push(
                <ListGroup className="mt-3 mb-3">
                    <img src={d.diffusers.image_url} style={{ width: "175px", height: "197px" }} name={d.diffusers.id} />
                    <ListGroupItem id={d.diffuser_id} name={d.diffusers.id}>Item: {d.diffusers.diffuser_name}</ListGroupItem>
                    <ListGroupItem id={d.diffuser_id}>
                        <p>Quantity: {d.quantity}{' '}</p>
                        <Button outline color="success" size="sm" name={d.diffusers.id} onClick={incrementDiffQty} value={d.quantity}>+</Button>{' '}
                        <Button outline color="danger" size="sm" name={d.diffusers.id} onClick={decrementDiffQty} value={d.quantity}>-</Button>{' '}
                        <Button color="info" size="sm" name={d.diffusers.id} onClick={updateDiffQty} value={d.quantity}>Update</Button>
                    </ListGroupItem>
                    <ListGroupItem id={d.diffuser_id} name={d.diffusers.id}>Price: SGD {(formatPrice(d.diffusers.cost) * (d.quantity)).toFixed(2)}</ListGroupItem>
                </ListGroup>
            );
        }
        return diffuserCart;
    }

    function displayOilItems() {
        let oilCart = []
        for (let i of oilItem) {
            oilCart.push(
                <ListGroup className="mt-3 mb-3">
                    <img src={i.oils.image_url} alt="product img" style={{ width: "175px", height: "197px" }} />
                    <ListGroupItem id={i.oil_id}>Item: {i.oils.name}</ListGroupItem>
                    <ListGroupItem id={i.oil_id}>
                        <p>Quantity: {i.quantity}</p>
                        <Button outline color="success" size="sm" name={i.oils.id} onClick={incrementOilQty} value={i.quantity}>+</Button>{' '}
                        <Button outline color="danger" size="sm" name={i.oils.id} onClick={decrementOilQty} value={i.quantity}>-</Button>{' '}
                        <Button color="info" size="sm" name={i.oils.id} onClick={updateOilQty} value={i.quantity}>Update</Button>
                    </ListGroupItem>
                    <ListGroupItem id={i.oil_id}>Price: SGD {(formatPrice(i.oils.cost) * (i.quantity)).toFixed(2)}</ListGroupItem>
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
        // alert("Customer confirming order");
        history.push(`/shipping`, {
            'diffusers':diffuserItem,
            'oils':oilItem
        });
    }

    return (
        <React.Fragment>

            <h4 className="mt-3">Diffuser Cart</h4>
            {pageLoaded ? displayDiffuserItems() : null}

            <h4 className="mt-3">Essential Oil Cart</h4>
            {pageLoaded ? displayOilItems() : null}

            <div>
                <Button outline color="info" onClick={confirmOrder}>Proceed to Checkout</Button>
            </div>
        </React.Fragment>
    )
}