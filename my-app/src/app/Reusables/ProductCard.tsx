// CARD COMPONENT
import React, { useState, MouseEvent } from "react";
import "./ProductCard.css";
import Image from "next/image";

interface ProductProps {
  source: string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = (props) => {
  const [cart, setCart] = useState<string>("Add to Cart");

  // HANDLING CART CLICK FUNCTION
  const handleCart = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    alert("Added to Cart Successfully");
    setCart("Added");
  };

  return (
    <div id="card">
      <Image
        id="image"
        src={props.source}
        alt="Product"
        height={800}
        width={800}
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
