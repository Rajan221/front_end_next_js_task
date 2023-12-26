import React, { useState, MouseEvent } from "react";
import "./ProductCard.css";

interface ProductProps {
  source: string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = (props) => {
  const [cart, setCart] = useState<string>("Add to Cart");

  const handleCart = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setCart("Added");
    console.log("Clicked");
  };

  return (
    <div id="card">
      <img id="image" src={props.source} alt="Product" />
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
