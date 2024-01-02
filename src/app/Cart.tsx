import React, { useState } from "react";
import { useCart } from "./CartContext";
import "./Styles/Cart.css";

const Cart: React.FC = () => {
  const [display, setDisplay] = useState("none");
  const { cartItems } = useCart();

  const length = cartItems.length;

  const show = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  return (
    <div>
      <div id="container" onClick={show}>
        <span id="cart">Cart</span>

        <span id="badge">{length}</span>
      </div>

      <div style={{ display: display }} id="cartItem">
        <div id="itemList">
          <div id="closeBtn" onClick={show}>
            x
          </div>
          <div id="list">
            <ol>
              {length ? (
                cartItems.map((item) => <li key={item.id}>{item.title}</li>)
              ) : (
                <div>No Items in the Cart</div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
