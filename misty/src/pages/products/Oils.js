import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const baseUrl = config.baseUrl

export default function Oils() {
    const history = useHistory();

    const [isLoaded, setLoaded] = useState(false);
    const [oils, setOils] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const fetch = async () => {
                let oils = await axios.get(`${baseUrl}/api/products/oils`);
                setOils(oils.data);
                setLoaded(true);
                if (localStorage.getItem('customer_id') !== null) {
                    setLoggedIn(true);
                }
            }
            fetch();
        }, 1000)
    }, [])

    const displayOils = () => {
        let products = [];
        for (let e of oils) {
            products.push(
                <React.Fragment>
                    <div className="col-lg-4 col-md-6">
                        <div className="sampleCard">
                            <div className="product-image">
                                <img src={e.image_url} alt="product image" className="product-img" />
                            </div>
                            <div className="sampleInfo">
                                <h5 className="product-card-title"> {e.name}</h5>

                                <div className="product-desc">{e.description}</div>
                                <div className="product-price">{formatPrice(e.cost)} SGD</div>
                                <button className="btn btn-outline-secondary product-cart-btn">Cart</button>

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        return products;
    }


    const oilAddToCart = async (e) => {
        if (isLoggedIn === true && isLoaded === true) {
            let customer_id = localStorage.getItem('customer_id');
            let oil = await axios.get(`${baseUrl}/api/shoppingCart/oil/${customer_id}/${e.target.name}/addtocart`)
            console.log(oil.data);
            // setOilCart(oil.data);
        }

        if (isLoggedIn === false) {
            history.push('/login');
        }
    }

    function formatPrice(price) {
        return parseFloat(price / 100.00).toFixed(2)
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="page-banner">
                    <h3 className="product-headers">
                        Misty Essential Oils Collection</h3>
                </div>
                <div className="row mb-4">
                    {displayOils()}
                </div>

            </div>

        </React.Fragment>

    )
}