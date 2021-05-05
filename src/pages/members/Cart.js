import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { useHistory } from 'react-router-dom';
import {
    ListGroup, ListGroupItem, Button
} from 'reactstrap';

const baseUrl = config.baseUrl;

export default function Cart() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [customer, setCustomer] = useState('')
    const [diffuserItem, setDiffuser] = useState([]);
    const [oilItem, setOil] = useState([]);
    const [pageLoaded, isPageLoaded] = useState(false);


    // useEffect(() => {
    //     setTimeout(() => {
    //         const fetch = async () => {
    //             let paymentHist = await axios.get(`${baseUrl}/api/checkout/${localStorage.getItem('customer_id')}/latest/orders`);
    //             console.log(paymentHist.data);
    //             try {
    //                 // customer has not made payment yet
    //                 console.log("display cart history")
    //                 setCartFull(true);
    //             } catch (e) {
    //                 // payment has been done
    //                 console.log("Browse our catalog");
    //                 setCartFull(false);
    //             }
    //         }
    //         fetch();
    //     }, 500)
    // }, [])

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
                // console.log("Your last payment is completed")
            }
        }
        fetch();
    }, [customer])

    // console.log("Diffuser Items:", diffuserItem);
    // console.log("Oil Items:", oilItem);

    const incrementDiffQty = (e) => {
        let itemIndex = diffuserItem.findIndex(d => d.diffusers.id === parseInt(e.target.name));
        let cloned = [...diffuserItem];
        cloned[itemIndex].quantity += 1;
        setDiffuser(cloned);

    }

    const decrementDiffQty = (e) => {
        let itemIndex = diffuserItem.findIndex(d => d.diffusers.id === parseInt(e.target.name));
        let cloned = [...diffuserItem];
        if ((cloned[itemIndex]).quantity > 1) {
            cloned[itemIndex].quantity -= 1;
        } else {
            // product qty is alr 1 
        }
        setDiffuser(cloned);
    }

    const updateDiffQty = async (e) => {
        let customer_id = localStorage.getItem('customer_id');
        let updateQty = await axios.get(`
        ${baseUrl}/api/shoppingCart/diffuser/${customer_id}/${e.target.name}/${e.target.value}/update`);
        if (updateQty.status === 200) {
            console.log(updateQty.data);
        }
        if (updateQty.status === 404) {
            console.log(updateQty.data)
        }
    }

    const removeDiff = async (e) => {
        let customer_id = localStorage.getItem('customer_id');
        let itemIndex = diffuserItem.findIndex(d => d.diffusers.id === parseInt(e.target.name));
        let cloned = [...diffuserItem];
        cloned.splice(cloned[itemIndex], 1);
        setDiffuser(cloned.splice(cloned[itemIndex], 1))

        let removeDiff = await axios.get(`${baseUrl}/api/shoppingCart/diffuser/${customer_id}/${e.target.name}/remove`);
        if (removeDiff.status === 200) {
            console.log(removeDiff.data);

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
        if ((cloned[itemIndex]).quantity > 1) {
            cloned[itemIndex].quantity -= 1;
        } else {
            // product qty is alr 1 
        }
        setOil(cloned);
    }

    const updateOilQty = async (e) => {
        let customer_id = localStorage.getItem('customer_id');
        let updateQty = await axios.get(`
        ${baseUrl}/api/shoppingCart/oil/${customer_id}/${e.target.name}/${e.target.value}/update`);
        if (updateQty.status === 200) {
            console.log(updateQty.data);
        }
        if (updateQty.status === 400) {
            console.log(updateQty.data);
        }
    }

    const removeOil = async (e) => {
        let customer_id = localStorage.getItem('customer_id');
        let itemIndex = oilItem.findIndex(i => i.oils.id === parseInt(e.target.name));
        let cloned = [...oilItem];
        cloned.splice(cloned[itemIndex], 1);
        setOil(cloned.splice(cloned[itemIndex], 1))

        let removeOil = await axios.get(`${baseUrl}/api/shoppingCart/oil/${customer_id}/${e.target.name}/remove`);
        if (removeOil.status === 200) {
            console.log(removeOil.data);

        }
    }

    function displayDiffuserItems() {
        let diffuserCart = []
        for (let d of diffuserItem) {

            diffuserCart.push(
                <React.Fragment>

                    <div className="container mt-3 mb-3">
                        <ListGroup className={`${d.diffusers.id}`} >
                            <img src={d.diffusers.image_url} className="cart-item-img"
                                style={{ width: "175px", height: "197px" }} name={d.diffusers.id} />
                            <ListGroupItem className="cart-item-name mt-3" id={d.diffuser_id} name={d.diffusers.id}>
                                Item: {d.diffusers.diffuser_name}</ListGroupItem>
                            <ListGroupItem id={d.diffuser_id}>
                                <div className="cart-qty">Quantity: {d.quantity}{' '}
                                </div>
                                <div className="cart-actions mt-3">
                                    <Button outline color="success" size="sm" name={d.diffusers.id} onClick={incrementDiffQty} value={d.quantity}>+</Button>{' '}

                                    <Button outline color="danger" size="sm" name={d.diffusers.id} onClick={decrementDiffQty} value={d.quantity}>-</Button>{' '}
                                    <Button className="cart-update" size="sm" name={d.diffusers.id} onClick={updateDiffQty} value={d.quantity}>Update</Button>{' '}
                                    <Button className="cart-remove" color="danger" size="sm" name={d.diffusers.id} onClick={removeDiff}>Remove</Button>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem id={d.diffuser_id} className="cart-price"
                                name={d.diffusers.id}>Price: {(formatPrice(d.diffusers.cost) * (d.quantity)).toFixed(2)} SGD</ListGroupItem>
                        </ListGroup>
                    </div>
                </React.Fragment>
            );
        }
        return diffuserCart;
    }

    function displayOilItems() {
        let oilCart = []
        for (let i of oilItem) {
            oilCart.push(
                <ListGroup className={"mt-3 mb-3" + " " + `${i.oils.id}`}>
                    <img src={i.oils.image_url} alt="product img"
                        className="cart-item-img" style={{ width: "175px", height: "197px" }} />
                    <ListGroupItem className="cart-item-name mt-3" id={i.oil_id}>
                        Item: {i.oils.name}</ListGroupItem>
                    <ListGroupItem id={i.oil_id}>
                        <div className="cart-qty">Quantity: {i.quantity}</div>
                        <div className="mt-3">
                            <Button outline color="success" size="sm" name={i.oils.id} onClick={incrementOilQty} value={i.quantity}>+</Button>{' '}
                            <Button outline color="danger" size="sm" name={i.oils.id} onClick={decrementOilQty} value={i.quantity}>-</Button>{' '}
                            <Button className="cart-update" size="sm" name={i.oils.id} onClick={updateOilQty} value={i.quantity}>Update</Button>{' '}
                            <Button className="cart-remove" size="sm" name={i.oils.id} onClick={removeOil}>Remove</Button>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="cart-price"
                        id={i.oil_id}>Price: {(formatPrice(i.oils.cost) * (i.quantity)).toFixed(2)} SGD</ListGroupItem>
                </ListGroup>


            );
        }
        return oilCart;
    }

    function displayFinalAmt() {
        let amtDiff = parseFloat(0);
        let amtOil = parseFloat(0);
        if (pageLoaded === true) {
            for (let d of diffuserItem) {
                amtDiff += ((d.quantity) * (d.diffusers.cost));
            }

            for (let e of oilItem) {
                amtOil += ((e.quantity) * (e.oils.cost));
            }
            return formatPrice(amtDiff + amtOil);
        }
    }

    function formatPrice(price) {
        return parseFloat(price / 100.00).toFixed(2)
    }

    const history = useHistory();
    const confirmOrder = () => {
        if (diffuserItem.length < 1 || oilItem.length < 1) {
            alert("Must have at least 1 diffuser and 1 essential oil before checkout");
        } else {
            history.push(`/shipping`, {
                'diffusers': diffuserItem,
                'oils': oilItem,
                'total': displayFinalAmt()
            });
        }
    }

    function displayCheckoutBtn() {
        return (
            <React.Fragment>
                <h3 className="checkout-amt-text">Total Amount: {displayFinalAmt()} SGD</h3>
                <Button className="mt-4 mb-4 confirm-btn" color="info" onClick={confirmOrder}>Proceed to Checkout</Button>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className="container">
                <h4 className="product-headers mt-4">Diffuser Cart</h4>
                {pageLoaded ? displayDiffuserItems() : null}

                <h4 className="product-headers mt-4">Essential Oil Cart</h4>
                {pageLoaded ? displayOilItems() : null}

                <div className="checkout-total">
                    {displayCheckoutBtn()}
                    {/* {isCartFull ? displayCheckoutBtn : null} */}

                </div>
                <div>
                </div>
            </div>
        </React.Fragment>
    )
}