"use client";
import React, { useEffect, useState } from "react";
import "./productDescription.css";
import ProductCard from "../Reusables/ProductCard";
import Link from "next/link";

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
  // const [recomList, setRecomList] = useState<Product | null>(null);

  // async function getProductsByCategory(category: string) {
  //   try {
  //     const response = await fetch(
  //       `https://fakestoreapi.com/products/category/${category}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     return response.json();
  //   } catch (error) {
  //     console.error(
  //       `Error retrieving products in category ${category}:`,
  //       error
  //     );
  //     throw error;
  //   }
  // }

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
            // const recommend: Product[] = getProductsByCategory(p.category);
            // setRecomList(recommend);
            setProduct(p);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.productId]);

  // BUTTONS HANDLER
  const handleShopNow = () => {
    alert("Not Implemented yet.");
  };
  const handleAddtoCart = () => {
    alert("Added to Cart Successfully");
  };

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
                <div onClick={handleShopNow}>ShopNow</div>
                <div onClick={handleAddtoCart}>Add to Cart</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No product details available</p>
      )}

      {/* PRODUCTS SUGGESTIONS */}
      {/* <div className="Cards">
        {recomList.map((datas: Product) => (
          <Link
            className="Link"
            href={{
              pathname: "/product",
              query: {
                productId: datas.id,
              },
            }}
            as={`/${encodeURIComponent(datas.id)}`}
            key={datas.id}
          >
            <ProductCard
              key={datas.id}
              source={datas.image}
              title={datas.title}
              price={datas.price}
            />
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default Details;
