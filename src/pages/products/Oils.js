import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Button, Badge } from "reactstrap";
import { useHistory } from "react-router-dom";
import cart from "../../icons/cart.png";

const baseUrl = config.baseUrl;

export default function Oils() {
  const history = useHistory();

  const [isLoaded, setLoaded] = useState(false);
  const [oils, setOils] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [oilName, setName] = useState("");
  //   const [searchVol, setVolume] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const fetch = async () => {
        let oils = await axios.get(`${baseUrl}/api/products/oils`);
        setOils(oils.data);
        setLoaded(true);
        if (localStorage.getItem("customer_id") !== null) {
          setLoggedIn(true);
        }
      };
      fetch();
    }, 500);
  }, []);

  // search oil by name
  useEffect(() => {
    setTimeout(() => {
      const fetch = async () => {
        console.log(oilName);
        if (
          oilName === "Rose Oil" ||
          oilName === "Lavender Oil" ||
          oilName === "Eucalyptus Oil" ||
          oilName === "Tea Tree Oil" ||
          oilName === "Chamomile Oil" ||
          oilName === "Peppermint Oil"
        ) {
          const response = await axios.get(
            `${baseUrl}/api/products/oil/${oilName}`
          );
          console.log(response.data);
          setOils(response.data);
        } else if (oilName === "all") {
          const responseAll = await axios.get(`${baseUrl}/api/products/oils`);
          setOils(responseAll.data);
        }
      };
      fetch();
    }, 500);
  }, [oilName]);

  // search oils by size
  //   useEffect(() => {
  //     setTimeout(() => {
  //       const fetch = async () => {
  //         if (searchVol === "1") {
  //           const response = await axios.get(
  //             `${baseUrl}/api/products/oil/size/${searchVol}`
  //           );
  //           setOils(response.data.oils);
  //         } else if (searchVol === "2") {
  //           const response = await axios.get(
  //             `${baseUrl}/api/products/oil/size/${searchVol}`
  //           );
  //           setOils(response.data.oils);
  //         } else if (searchVol === "3") {
  //           const response = await axios.get(
  //             `${baseUrl}/api/products/oil/size/${searchVol}`
  //           );
  //           setOils(response.data.oils);
  //         } else {
  //           const response = await axios.get(`${baseUrl}/api/products/oils`);
  //           setOils(response.data);
  //         }
  //       };
  //       fetch();
  //     }, 500);
  //   }, [searchVol]);

  const displayOils = () => {
    let products = [];
    if (oils.length > 0) {
      for (let e of oils) {
        products.push(
          <React.Fragment>
            <div className="col-lg-4 col-md-6">
              <div className="sampleCard">
                <div className="product-image">
                  <img
                    src={e.image_url}
                    alt="product image"
                    className="product-img"
                  />
                </div>
                <div className="sampleInfo">
                  <h5 className="product-card-title"> {e.name}</h5>
                  <Badge pill className="product-cat">
                    {e.sizes[0].size}mL
                  </Badge>
                  <div className="product-desc">{e.description}</div>
                  <div className="product-price">{formatPrice(e.cost)} SGD</div>
                  <Button
                    className="product-cart-btn"
                    name={e.id}
                    onClick={oilAddToCart}
                  >
                    <span>
                      <img src={cart} alt="cart-icon" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
      return products;
    } else {
      return (
        <React.Fragment>
          <div className="container alert alert-danger">
            <p>Product not found</p>
          </div>
        </React.Fragment>
      );
    }
  };

  const oilAddToCart = async (e) => {
    if (isLoggedIn === true && isLoaded === true) {
      let product_id = e.currentTarget.name;
      let customer_id = localStorage.getItem("customer_id");
      let oil = await axios.get(
        `${baseUrl}/api/shoppingCart/oil/${customer_id}/${product_id}/addtocart`
      );
      console.log(oil.data);
      console.log(product_id);
      // setOilCart(oil.data);
      if (oil.status == 200) {
        alert("Item added into cart");
      } else if (oil.status !== 200) {
        alert("Item not added");
      }
    }

    if (isLoggedIn === false) {
      history.push("/login");
    }
  };

  function formatPrice(price) {
    return parseFloat(price / 100.0).toFixed(2);
  }

  return (
    <React.Fragment>
      <div className="container">
        <h3 className="product-headers mt-4">Search Item</h3>

        <div className="form-group">
          <label>Search by Essential Oil</label>
          <select
            className="form-control"
            name={oilName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="Lavender Oil">Lavender Oil</option>
            <option value="Chamomile Oil">Chamomile Oil</option>
            <option value="Peppermint Oil">Peppermint Oil</option>
            <option value="Tea Tree Oil">Tea Tree Oil</option>
            <option value="Eucalyptus Oil">Eucalyptus Oil</option>
            <option value="Rose Oil">Rose Oil</option>
          </select>
        </div>

        {/* <div className="form-group">
          <label>Search by Volume</label>
          <select
            className="form-control"
            name={searchVol}
            onChange={(e) => {
              setVolume(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="1">5mL</option>
            <option value="2">15mL</option>
            <option value="3">30mL</option>
          </select>
        </div> */}
        <div className="page-banner">
          <h3 className="product-headers">Misty Essential Oils Collection</h3>
        </div>
        <div className="row mb-4">{displayOils()}</div>
      </div>
    </React.Fragment>
  );
}
