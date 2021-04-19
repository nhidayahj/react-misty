import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const baseUrl = "https://3001-emerald-herring-pjfc5f72.ws-us03.gitpod.io"

export default function Home() {

    const [diffusers, setDiffusers] = useState([]);

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
                    <div className="col-md-4">
                        <Card className="product-card">
                            <CardImg className="product-img" src={diffuser.image_url} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{diffuser.diffuser_name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{diffuser.category.name}</CardSubtitle>
                                <CardText className="product-desc">{diffuser.description}</CardText>
                                <Button color="warning" className="mr-3">View</Button>
                                <Button color="info">Add to Cart</Button>
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