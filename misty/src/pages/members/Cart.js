import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { useLocation } from 'react-router-dom';

const baseUrl = config.baseUrl;


export default function Cart() {
    const location = useLocation();
    const customer_id = location.state.id

    const [diffuserItems, setDiffuserItems] = useState({});
    const [oilItems, setOilItems] = useState({});
    // have an update btn
    // const [updateItem, setUpdate] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            let items = await axios.get(baseUrl +
                `/api/shoppingCart/${customer_id}`);
            setDiffuserItems(items.data.diffusers);
            setOilItems(items.data.oils)
            localStorage.setItem("diffusers", JSON.stringify(items.data.diffusers))
            localStorage.setItem("oils", JSON.stringify(items.data.oils))
        }
        fetch();
    }, [])
    console.log("All diffusers:" ,diffuserItems)
    console.log("All oils: ",oilItems)

    // useEffect(() => {
    //     const fetch = async() => {

    //     }
    //     fetch();
    // }, [diffuserItems, oilItems])


    function displayCartItems() {
        for (let d of diffuserItems) {
            console.log(d.diffusers)
        }

    }

    return (
        <React.Fragment>
            <h4>Cart Items</h4>
            {/* <ul>
                <li>Diffusers: {diffuserItems.diffusers}</li>
                <li>Oils: {oilItems.oils}</li>
            </ul> */}
            {displayCartItems()}

        </React.Fragment>
    )
}