import React, { useState } from 'react';
import { Col, Row, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'

const baseUrl = config.baseUrl;

export default function ConfirmOrder() {

    const location = useLocation();
    let diffuserItems = location.state.diffusers;
    let oilItems = location.state.oils;

    const [shipOrderData, setShipOrder] = useState({
        'street_name': '',
        'postal_code': '',
        'unit_code': '',
    })

    const [orderFlag, setOrderFlag] = useState(false)

    function displayConfirmItems() {
        let diffuserList = [];
        for (let d of diffuserItems) {
            diffuserList.push(
                <Row className="mt-3 mb-3">
                    <Col md={6} sm={6}>
                        <img src={d.diffusers.image_url} style={{ width: "175px", height: "197px" }} />
                    </Col>
                    <Col sm={6}>
                        <p>Item: {d.diffusers.diffuser_name}</p>
                        <p>Qty: {d.quantity}</p>
                        <p>Price: SGD {(formatPrice(d.diffusers.cost) * (d.quantity)).toFixed(2)}</p>
                    </Col>
                </Row>
            )
        }
        let oilList = [];
        for (let e of oilItems) {
            oilList.push(
                <Row className="mt-3 mb-3">
                    <Col md={4} sm={6}>
                        <img src={e.oils.image_url} style={{ width: "175px", height: "197px" }} />
                    </Col>
                    <Col md={6} sm={6}>
                        <p>Item: {e.oils.name}</p>
                        <p>Qty: {e.quantity}</p>
                        <p>Price: SGD {(formatPrice(e.oils.cost) * (e.quantity)).toFixed(2)}</p>
                    </Col>
                </Row>
            )
        }
        return { diffuserList, oilList };
        // return diffuserList;
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
        if (shipOrderData.street_name !== '' &&
            shipOrderData.postal_code !== '' &&
            shipOrderData.unit_code !== '') {
            console.log("GOOD TO GO")
            setOrderFlag(true);
        }



        // let postShipOrder = await axios.post(`${baseUrl}/api/checkout/${e.target.name}/latest/orders`, {
        //     street_name: shipOrderData.street_name,
        //     postal_code: shipOrderData.postal_code,
        //     unit_code: shipOrderData.unit_code,
        //     order_date: new Date(),
        //     payment_status: 'unpaid',
        //     order_status: 'pending',
        //     payment_type: 'card',
        //     amount: 0,
        //     customer_id: parseInt(e.target.name)
        // });
        // console.log(postShipOrder.data);
        // if (postShipOrder.data.status==200) {
        //     alert('Successfully added shipping address')
        // }
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
                    <Button onClick={submitOrder}>Add Shipping</Button>
                </div>

                <div className="mt-4">
                    <h3>Preview Order Items</h3>
                    <Row>
                        <Col>
                            {displayConfirmItems().diffuserList}
                        </Col>
                        <Col>
                            {displayConfirmItems().oilList}
                        </Col>
                    </Row>
                    <div>
                        {/* {displayConfirmItems()} */}
                    </div>
                </div>



                <div >
                    {orderFlag ? <Button color="primary"
                        name={localStorage.getItem('customer_id')}>Proceed to Checkout</Button> : null}
                </div>
            </div>


        </React.Fragment>

    )
}