import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import cart from '../../icons/cart.png'

const baseUrl = config.baseUrl

export default function Oils() {
    const history = useHistory();

    const [isLoaded, setLoaded] = useState(false);
    const [oils, setOils] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [oilName, setName] = useState('');
    const [searchVol, setVolume] = useState('');
    

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
        }, 500)
    }, [])

    // search oil by name 
    useEffect(() => {
        setTimeout(()=> {
            const fetch = async () => {
                console.log(oilName);
                
                const response = await axios.get(`${baseUrl}/api/products/oil/${oilName}`);
                console.log(response.data);
                setOils([response.data]);
            }
            fetch();
        }, 500)
    }, [oilName])

    // search oils by size
    useEffect(() => {
        setTimeout(() => {
            const fetch = async () => {
                if (searchVol === '2') {
                    const response = await axios.get(`${baseUrl}/api/products/oil/size/${searchVol}`);
                    
                    setOils(response.data.oils);
                } else if (searchVol === '3') {
                    const response = await axios.get(`${baseUrl}/api/products/oil/size/${searchVol}`);
                    setOils(response.data.oils);
                   
                } else if (searchVol === '4') {
                    const response = await axios.get(`${baseUrl}/api/products/oil/size/${searchVol}`);
                    setOils(response.data.oils)
                  
                } else {
                     const response = await axios.get(`${baseUrl}/api/products/oils`);
                     setOils(response.data)
                }
            }
            fetch();
        }, 500)
    }, [searchVol])


    const displayOils = () => {
        let products = [];
        if (oils) {
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
                                    <Button className="product-cart-btn" name={e.id}
                                        onClick={oilAddToCart}><span><img src={cart} alt="cart-icon"/></span></Button>

                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
            return products;
        }
        else {
            return (
                <React.Fragment>
                    <div className="container alert alert-danger">
                        <p>Product not found</p>
                    </div>
                </React.Fragment>
            )
        }
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
                <h3 className="product-headers mt-4">Search Item</h3>

                {/* <div className="form-group">
                    <label>Search by Essential Oil</label>
                    <select className="form-control" name={oilName}
                        onChange={e => { setName(e.target.value) }}>
                        <option value="0">All</option>
                        <option value="Lavender">Lavender Oil</option>
                        <option value="Chamomile">Chamomile Oil</option>
                        <option value="Peppermint">Peppermint Oil</option>
                        <option value="Tea Tree">Tea Tree Oil</option>
                        <option value="Eucalyptus">Eucalyptus Oil</option>
                    </select>
                </div> */}

                <div className="form-group">
                    <label>Search by Volume</label>
                    <select className="form-control" name={searchVol}
                        onChange={e => { setVolume(e.target.value) }}>
                        <option value="0">All</option>
                        <option value="2">5mL</option>
                        <option value="3">15mL</option>
                        <option value="4">30mL</option>
                    </select>
                </div>
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