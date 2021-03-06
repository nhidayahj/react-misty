import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Badge } from "reactstrap";
import { useHistory } from "react-router-dom";

import cart from "../../icons/cart.png";

const baseUrl = config.baseUrl;

export default function Diffusers() {
  const history = useHistory();

  const [isLoaded, setLoaded] = useState(false);
  const [diffusers, setDiffusers] = useState([]);

  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [customerId, setCustomerId] = useState('');
  // const [addDiffuserCart, setDiffuserCart] = useState(false);

  // const [searchDiffName, setDiffName] = useState('');
  const [searchCategory, setCategory] = useState("");
  const [searchPriceRange, setPrice] = useState("");
  const [categoryInfo, setCategoryInfo] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const fetch = async () => {
        let diffusers = await axios.get(`${baseUrl}/api/products/diffusers`);
        setDiffusers(diffusers.data);
        // console.log("All diffusers: ", diffusers.data);
        setLoaded(true);
        if (localStorage.getItem("customer_id") !== null) {
          setLoggedIn(true);
        }
      };
      fetch();
    }, 500);
  }, []);

  // search products by categories
  useEffect(() => {
    setTimeout(() => {
      const fetch = async () => {
        // let category = searchCategory;
        if (searchCategory !== "0") {
          const response = await axios.get(
            `${baseUrl}/api/products/diffuser/category/${searchCategory}`
          );
          console.log(response.data);
          setDiffusers(response.data);
          setCategoryInfo(response.data.category);
        } else {
          const response = await axios.get(`${baseUrl}/api/products/diffusers`);
          setDiffusers(response.data);
        }
      };
      fetch();
    }, 500);
  }, [searchCategory]);

  // // search products by price range
  useEffect(() => {
    setTimeout(() => {
      // let range = searchPriceRange;
      const fetch = async () => {
        if (searchPriceRange === "3499") {
          const responseLow = await axios.get(
            `${baseUrl}/api/products/diffuser/low/${searchPriceRange}`
          );
          console.log("Low: ", responseLow.data);
          setDiffusers(responseLow.data);
        } else if (searchPriceRange === "10000") {
          const responseMid = await axios.get(
            `${baseUrl}/api/products/diffuser/mid/${searchPriceRange}`
          );
          console.log("Mid: ", responseMid.data);
          setDiffusers(responseMid.data);
        } else if (searchPriceRange === "0") {
          const response = await axios.get(`${baseUrl}/api/products/diffusers`);
          setDiffusers(response.data);
        } else if (searchPriceRange === "3500") {
          const responseRange = await axios.get(
            `${baseUrl}/api/products/diffuser/range/${searchPriceRange}`
          );
          console.log("range price: ", responseRange.data);
          setDiffusers(responseRange.data);
        }
      };
      fetch();
    }, 500);
  }, [searchPriceRange]);

  const diffAddToCart = async (e) => {
    if (isLoggedIn === true && isLoaded === true) {
      console.log("OK");
      console.log("id:", e.currentTarget.name);
      let product_id = e.currentTarget.name;
      let customer_id = localStorage.getItem("customer_id");
      let diffuser = await axios.get(
        `${baseUrl}/api/shoppingCart/diffuser/${customer_id}/${product_id}/addtocart`
      );
      console.log(diffuser.data);

      if (diffuser.status == 200) {
        alert("Item added into cart");
      } else if (diffuser.status !== 200) {
        alert("Item not added");
      }
    }

    if (isLoggedIn === false) {
      history.push("/login", {
        message: "Please login to continue shopping!",
      });
    }
  };

  const displayDiffusers = () => {
    if (diffusers && diffusers.length >= 1) {
      let products = [];
      console.log("All diffusers: ", diffusers);
      for (let diffuser of diffusers) {
        products.push(
          <React.Fragment>
            <div className="col-lg-4 col-md-6">
              <div className="sampleCard">
                <div className="product-image">
                  <img
                    src={diffuser.image_url}
                    alt="product image"
                    className="product-img"
                  />
                </div>
                <div className="sampleInfo">
                  <h5 className="product-card-title">
                    {" "}
                    {diffuser.diffuser_name}
                  </h5>
                  <Badge pill className="product-cat">
                    {diffuser.category.name}
                  </Badge>
                  <div className="product-desc">{diffuser.description}</div>
                  <div className="product-price">
                    {formatPrice(diffuser.cost)} SGD
                  </div>
                  <button
                    className="product-cart-btn"
                    name={diffuser.id}
                    onClick={diffAddToCart}
                  >
                    <span>
                      <img src={cart} alt="cart-icon" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
      return products;
    } else if (!diffusers || diffusers.length < 1) {
      return (
        <React.Fragment>
          <div className="container alert alert-danger">
            <p>Product not found</p>
          </div>
        </React.Fragment>
      );
    }
  };

  function formatPrice(price) {
    return parseFloat(price / 100.0).toFixed(2);
  }

  return (
    <React.Fragment>
      <div className="container">
        <h3 className="product-headers">Search Item</h3>

        <div className="form-group">
          <label>Price Range</label>
          <select
            className="form-control"
            name={searchPriceRange}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          >
            <option value="0">All</option>
            <option value="3499"> {"<"} 35 SGD</option>
            <option value="3500">{">"} 35 SGD </option>
            {/* <option value="6501">{">"} 65 SGD</option> */}
            <option value="10000">{">"} 100 SGD</option>
          </select>
        </div>

        <div className="form-group">
          <label>Search by Category</label>
          <select
            className="form-control"
            name={searchCategory}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="0">All</option>
            <option value="1">Reed</option>
            <option value="2">Nebulizer</option>
            <option value="3">Water</option>
            <option value="4">Candle</option>
            <option value="5">Electric</option>
          </select>
        </div>

        <div className="page-banner">
          <h3 className="product-headers">Explore our Misty Diffusers</h3>
        </div>
        <div className="row mb-4">{displayDiffusers()}</div>
      </div>
    </React.Fragment>
  );
}
