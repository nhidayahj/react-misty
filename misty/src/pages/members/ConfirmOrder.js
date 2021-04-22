import React, { useState, useEffect } from 'react';
import { Col, Row, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'

const baseUrl = config.baseUrl;

export default function ConfirmOrder() {

    const [shipOrderData, setShipOrder] = useState({
        'street_name': '',
        'postal_code': '',
        'unit_code': '',
    })

    const [orderFlag, setOrderFlag] = useState(false);
    const [diffuserOrder, setDiffuserOrder] = useState([]);
    const [oilOrder, setOilOrder] = useState([]);
    const [totalAmt, setTotalAmt] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isLoaded, setLoaded] = useState(false)

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const fetch = async () => {
            if (localStorage.getItem('customer_id') !== null) {
                setLoggedIn(true);
                setLoaded(true)

                setDiffuserOrder(location.state.diffusers);
                setOilOrder(location.state.oils);
                setTotalAmt(location.state.total)

            } else {
                history.push('/login')

            }
        }
        fetch()
    }, [])
    console.log("Diffusers order: ", diffuserOrder)
    console.log("Oil orders: ", oilOrder)

    function displayConfirmItems() {
        let diffuserList = [];
        for (let d of diffuserOrder) {
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
        for (let e of oilOrder) {
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

    function formatPrice(price) {
        return parseFloat(price / 100.00).toFixed(2)
    }

    const updateShipOrder = (e) => {
        let clone = { ...shipOrderData };
        clone[e.target.name] = e.target.value;
        setShipOrder(clone);
    }

    const submitOrder = async (e) => {
        // check if shipping fields are filled up 
        // if yes, then display 'checkout btn' 
        if (shipOrderData.street_name !== '' &&
            shipOrderData.postal_code !== '' &&
            shipOrderData.unit_code !== '') {
            console.log("GOOD TO GO")
            setOrderFlag(true);
            let postShipOrder = await axios.post(`${baseUrl}/api/checkout/${e.target.name}/latest/orders`, {
                street_name: shipOrderData.street_name,
                postal_code: shipOrderData.postal_code,
                unit_code: shipOrderData.unit_code,
                order_date: new Date(),
                payment_status: 'unpaid',
                order_status: 'pending',
                payment_type: 'card',
                amount: 0,
                customer_id: parseInt(e.target.name)
            });
            console.log(postShipOrder.data);
            if (postShipOrder.data.status == 200) {
                alert('Successfully added shipping address')
            }
        }
    }

    // this btn creates an instance for the vendor 
    // to capture order items 
    const checkoutOrder = async(e) => {
        if(submitOrder) {
            let response = await axios.get(`${baseUrl}/api/checkout/${e.target.name}/orders`);
            if (response.status === 200) {
                console.log(response.data);
                history.push('/checkout', {
                    'orderDiffusers':response.data.diffusers,
                    'orderOils':response.data.oils,
                    'total':totalAmt
                })
            }
        }
    }

    return (
        <React.Fragment>
            <div className="container">
                <h3>Shipping Details</h3>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" value={shipOrderData.street_name}
                        placeholder="1234 Main St"
                        onChange={updateShipOrder} name="street_name" id="address" invalid={false} />
                    <FormFeedback for="address" >Address field is required!</FormFeedback>
                </FormGroup>


                <Row form>
                    <Col md={8}>
                        <FormGroup>
                            <Label for="postalCode">Postal Code</Label>
                            <Input type="text" value={shipOrderData.postal_code}
                                name="postal_code" onChange={updateShipOrder} id="postalCode" invalid={false} />
                            <FormFeedback for="postalCode" >Postal code is required!</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="unitCode">Unit Code</Label>
                            <Input type="text" value={shipOrderData.unit_code} name="unit_code"
                                onChange={updateShipOrder} id="unitCode" placeholder="01-123" invalid={false} />
                            <FormFeedback for="unitCode" >Unit Code is required!</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <div>
                    <Button onClick={submitOrder} name={localStorage.getItem('customer_id')}>Add Shipping</Button>
                </div>

                <div className="mt-4">
                    <Row>
                        <Col md={8}>
                            <h3>Preview Order Items</h3>
                            {displayConfirmItems().diffuserList}
                            {displayConfirmItems().oilList}
                        </Col>
                        <Col md={4}>
                            <h3>Total Amount: {totalAmt} SGD</h3>
                            <p>Need changes to shopping cart? <Link to="/profile/cart">Back to cart.</Link></p>
                            {orderFlag ? <Button color="primary"
                                name={localStorage.getItem('customer_id')} onClick={checkoutOrder}>Proceed to Checkout</Button> : null}
                        </Col>
                    </Row>
                </div>
                {/* <div >
                    {orderFlag ? <Button color="primary"
                        name={localStorage.getItem('customer_id')}>Proceed to Checkout</Button> : null}
                </div> */}
            </div>


        </React.Fragment>

    )
}