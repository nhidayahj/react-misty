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
    // const [customerId, setCustomerId] = useState('');
    // const [addDiffuserCart, setDiffuserCart] = useState(false);
    // const [addOilCart, setOilCart] = useState(false);
    // to search use useEffect

    // const [searchDiffName, setDiffName] = useState('');
    const [searchCategory, setCategory] = useState('');
    const [categoryInfo, setCategoryInfo] = useState('');

    useEffect(() => {
        setTimeout(() => {
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
        }, 1000)
    }, []);

    useEffect(() => {
        const fetch = async () => {
            let oils = await axios.get(`${baseUrl}/api/products/oils`);
            setOils(oils.data);
            console.log("All oils: ", oils.data);
        }
        fetch()
    }, [])

    // search products 
    useEffect(() => {

        const fetch = async () => {
            let category = searchCategory;
            if(category !== '0') {
                const response = await axios.get(`${baseUrl}/api/products/diffuser/category/${category}`);
                console.log(response.data);
                setDiffusers(response.data);
                setCategoryInfo(response.data.category)
            } else {
                const response = await axios.get(`${baseUrl}/api/products/diffusers`);
                setDiffusers(response.data);
            }
        }
        fetch();

    }, [searchCategory])

    const diffAddToCart = async (e) => {
        if (isLoggedIn === true && isLoaded === true) {
            console.log("OK")
            let customer_id = localStorage.getItem('customer_id');
            let diffuser = await axios.get(`${baseUrl}/api/shoppingCart/diffuser/${customer_id}/${e.target.name}/addtocart`);
            console.log(diffuser.data);
            // setDiffuserCart(diffuser.data);
        }

        if (isLoggedIn === false) {
            history.push('/login', {
                message: "Please login to continue shopping!"
            });
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

    const displayDiffusers = () => {
        if (diffusers.length > 1) {
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
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{formatPrice(diffuser.cost)} SGD </CardSubtitle>
                                    <Button color="warning" className="mr-3 product-view mt-2">View</Button>

                                    <Button color="info add-to-cart" name={diffuser.id} onClick={diffAddToCart} 
                                    className="product-view mt-2" >Add to Cart</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </React.Fragment>
                )
            }
            return products;
        } else if (diffusers && categoryInfo) {
            console.log("FOUND PLS DISPLAY")
            return (
                <React.Fragment>
                    <div className="col-lg-4 col-md-6">
                        <Card className="product-card">
                            <CardImg className="product-img" src={diffusers.image_url} alt="Card image cap" />
                            <CardBody className="product-body">
                                <CardTitle tag="h5">{diffusers.diffuser_name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{categoryInfo.name}</CardSubtitle>
                                <CardText className="product-desc">{diffusers.description}</CardText>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{formatPrice(diffusers.cost)} SGD </CardSubtitle>
                                <Button color="warning" className="mr-3 mt-2 product-view">View</Button>

                                <Button color="info add-to-cart" name={diffusers.id} onClick={diffAddToCart}
                                className="mt-2 product-view">Add to Cart</Button>
                            </CardBody>
                        </Card>
                    </div>
                </React.Fragment>
            )
        } else if (!diffusers && !categoryInfo) {
            console.log("NO SUCH PRODUCTS")
            return (
                <React.Fragment>
                    <div className="container alert alert-danger">
                       <p>Product not found</p>
                    </div>
                </React.Fragment>
            )
        }
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

    function formatPrice(price) {
        return parseFloat(price / 100.00).toFixed(2)
    }

    return (
        <React.Fragment>
            <div className="container">

                <h3>Search Item</h3>
                <div className="form-group">
                    <label>Search by Product Name</label>
                    <input type="text" className="form-control"
                        name="name" />
                </div>
                <div className="form-group">
                    <label>Price Range</label>
                    <select className="form-control">
                        <option> -</option>
                        <option> Less than 35 SGD</option>
                        <option>35 - 65</option>
                        <option>> 65</option>
                        <option>> 100</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Search by Category</label>
                    <select className="form-control" name={searchCategory}
                        onChange={e => { setCategory(e.target.value) }}>
                        <option value="0">All</option>
                        <option value="1">Reed</option>
                        <option value="2">Nebulizer</option>
                        <option value="3">Water</option>
                        <option value="4">Candle</option>
                        <option value="5">Electric</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Search by Tags</label>
                    <select className="form-control" >
                        <option>Easy Maintenance</option>
                        <option>good in small spaces</option>
                        <option>safety verified</option>
                        <option>Easy to clean</option>
                    </select>
                </div>
                <div>
                    <input type="button" className="btn btn-primary btn-sm mt-4 mb-4"
                        value="search" />
                </div>

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