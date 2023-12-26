"use client";
import React, { useEffect, useState } from "react";
import "./productDescription.css";

type ParamsType = {
  params: {
    productId: number;
  };
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Details: React.FC<ParamsType> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const productInfo: Product[] = await response.json();
        productInfo.map((p) => {
          if (p.id == params.productId) {
            console.log(p);
            setProduct(p);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.productId]);

  return (
    <div>
      {product ? (
        <div id="description">
          <div className="prodTitle">{product.title}</div>

          <div id="prodContainer">
            <img className="prodImage" src={product.image} alt="product" />

            <div className="prodInfo">
              <div className="prodDescription">
                {" "}
                <span style={{ fontWeight: "bold", fontSize: "30px" }}>
                  Description:
                </span>{" "}
                <br />
                {product.description}
              </div>
              <div className="category">{product.category}</div>
              <div className="price">Price: ${product.price}</div>

              <div className="buttons">
                <div>ShopNow</div>
                <div>Add to Cart</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No product details available</p>
      )}
    </div>
  );
};

export default Details;
