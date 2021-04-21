import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const baseUrl = config.baseUrl

export default function Home() {

    const history = useHistory();

    const [isLoaded, setLoaded] = useState(false);
    const [diffusers, setDiffusers] = useState([]);
    const [oils, setOils] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [addDiffuserCart, setDiffuserCart] = useState(false);
    const [addOilCart, setOilCart] = useState(false);
    // to search use useEffect

    useEffect(() => {
        const fetch = async () => {
            let diffusers = await axios.get(baseUrl + '/api/products/diffusers');
            setDiffusers(diffusers.data);

            console.log("All diffusers: ", diffusers.data);
            // console.log("All oils: ",oils.data);

            setLoaded(true);
            if (localStorage.getItem('customer_id') !== null) {
                setLoggedIn(true);
            }
        }
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            let oils = await axios.get(`${baseUrl}/api/products/oils`);
            setOils(oils.data);
            console.log("All oils: ", oils.data);
        }
        fetch()
    }, [])

    const diffAddToCart = async (e) => {
        if (isLoggedIn === true && isLoaded === true) {
            console.log("OK")
            let customer_id = localStorage.getItem('customer_id');
            let diffuser = await axios.get(`${baseUrl}/api/shoppingCart/diffuser/${customer_id}/${e.target.name}/addtocart`);
            console.log(diffuser.data);
            setDiffuserCart(diffuser.data);
        }

        if (isLoggedIn === false) {
            history.push('/login');
        }
    }

    const oilAddToCart = async (e) => {
        if (isLoggedIn === true && isLoaded === true) {
            let customer_id = localStorage.getItem('customer_id');
            let oil = await axios.get(`${baseUrl}/api/shoppingCart/oil/${customer_id}/${e.target.name}/addtocart`)
            console.log(oil.data);
            setOilCart(oil.data);
        }

        if (isLoggedIn === false) {
            history.push('/login');
        }
    }

    const displayDiffusers = () => {
        let products = [];
        for (let diffuser of diffusers) {
            products.push(
                <React.Fragment>
                    <div className="col-lg-4 col-md-6">
                        <Card className="product-card">
                            <CardImg className="product-img" src={diffuser.image_url} alt="Card image cap" />
                            <CardBody className="product-body">
                                <CardTitle tag="h5">{diffuser.diffuser_name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{diffuser.category.name}</CardSubtitle>
                                <CardText className="product-desc">{diffuser.description}</CardText>
                                <Button color="warning" className="mr-3 product-view">View</Button>

                                <Button color="info add-to-cart" name={diffuser.id} onClick={diffAddToCart}>Add to Cart</Button>
                            </CardBody>
                        </Card>
                    </div>
                </React.Fragment>
            )
        }
        return products;
    }

    const displayOils = () => {
        let products = [];
        for (let e of oils) {
            products.push(
                <React.Fragment>
                    <div className="col-lg-4 col-md-6">
                        <Card className="product-card">
                            <CardImg className="product-img" src={e.image_url} alt="Card image cap" />
                            <CardBody className="product-body">
                                <CardTitle tag="h5">{e.name}</CardTitle>

                                <CardText className="product-desc">{e.description}</CardText>
                                <Button color="warning" className="mr-3 product-view">View</Button>

                                <Button color="info add-to-cart" name={e.id} onClick={oilAddToCart}>Add to Cart</Button>
                            </CardBody>
                        </Card>
                    </div>
                </React.Fragment>
            )
        }
        return products;
    }

    return (
        <React.Fragment>
            <div className="container">
                <h3>Products</h3>
                <div className="row">
                    {displayDiffusers()}
                </div>
                <div className="row">
                    {displayOils()}
                </div>
            </div>
        </React.Fragment>
    )
}