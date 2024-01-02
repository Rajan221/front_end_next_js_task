// CARD COMPONENT
import React, { useState, MouseEvent } from "react";
import "./ProductCard.css";
import Image from "next/image";

import { useCart } from "../CartContext";

interface ProductProps {
  id: number;
  source: string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = (props) => {
  const { addToCart, cartItems } = useCart();
  const [cart, setCart] = useState<string>("Add to Cart");

  const itemToAdd = {
    id: props.id,
    image: props.source,
    title: props.title,
    price: props.price,
  };

  const isItemInCart = cartItems.some((item) => item.id === itemToAdd.id);
  // HANDLING CART CLICK FUNCTION
  const handleCart = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const itemToAdd = {
      id: props.id,
      image: props.source,
      title: props.title,
      price: props.price,
    };

    // Check if the item is already in the cart
    const isItemInCart = cartItems.some((item) => item.id === itemToAdd.id);

    if (isItemInCart) {
      alert("Item is already in the cart");
    } else {
      // Item is not in the cart, add it
      addToCart(itemToAdd);

      setCart("Added");
    }
  };

  return (
    <div id="card">
      <Image
        id="image"
        src={props.source}
        alt="Product"
        height={800}
        width={800}
        priority={true}
      />
      <div>
        <div id="infos">
          <div id="title">{props.title}</div>
          <div id="price">${props.price}</div>
        </div>
        <button id="addToCart" onClick={handleCart}>
          {cart}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
