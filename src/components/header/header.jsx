import React, { useEffect, useState } from "react";
import "../cssFIles/header/header.css";
import mealsImg from "../../assets/meals.jpeg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

function Header(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [totalCartItems, settotalCartItems] = useState(0);
  // const [showProfile, SetShowProfile] = useState(false);
  const loginData = useSelector((state) => state.loginStore);
  const cartItems = useSelector((state) => state.cartStore);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (loginData.isloggedIn) {
      const capitalizedUsername = capitalizeFirstLetter(loginData.data.name);
      setUsername(capitalizedUsername);
    } else setUsername("");
  }, [loginData]);

  useEffect(() => {
    settotalCartItems(0);
    cartItems.cart.map((item) => {
      settotalCartItems((prev) => prev + item.amount);
    });
  }, [cartItems]);

  return (
    <>
      <div className="full-width-div">
        <div className="main-outer-div-header">
          <div className="heading-div-header">
            <h2
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              ReHarvest
            </h2>
          </div>
          <div className="header-button-holder">
            <button className="header-buttons-navbar" onClick={props.openCart}>
              Your Cart
              <span className="cart-items-header-css-reactbites">
                {totalCartItems}
              </span>
            </button>
            <button
              className="header-buttons-navbar"
              style={{ marginRight: "43px" }}
              onClick={(e) => {
                e.preventDefault();
                if (!loginData.isloggedIn) {
                  navigate("/login");
                } else {
                  navigate("/my_profile");
                }
              }}
            >
              {username ? `Hi, ${username}` : "Login/SignUp"}
            </button>
          </div>
        </div>
        <div className="main-image">
          <img src={mealsImg} alt="A meals" />
        </div>
      </div>
    </>
  );
}

export default Header;
