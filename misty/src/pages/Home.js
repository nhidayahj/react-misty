import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const baseUrl = config.baseUrl

export default function Home() {

    const [diffusers, setDiffusers] = useState([]);
    // to search use useEffect


    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(baseUrl + '/api/products/diffusers');
            setDiffusers(response.data);
            console.log(response.data)
        }
        fetch();
    }, [])

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
                        
                                <Button color="info add-to-cart">Add to Cart</Button>
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
            </div>
        </React.Fragment>
    )
}