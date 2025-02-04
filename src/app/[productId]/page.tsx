"use client";
import React, { useEffect, useState } from "react";
import "./productDescription.css";
import ProductCard from "../Reusables/ProductCard";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../Navbar";
import { useCart } from "../CartContext";
import Head from "next/head";

// for metadata
import { generateMetadata, Metadata } from "./metadataUtils";

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
  const [recomList, setRecomList] = useState<Product[]>([]);
  const { addToCart, cartItems } = useCart();

  //for metadata
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  async function getProductsByCategory(category: string) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    } catch (error) {
      console.error(
        `Error retrieving products in category ${category}:`,
        error
      );
      throw error;
    }
  }

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
            setProduct(p);

            getProductsByCategory(p.category)
              .then((recommendations) => {
                setRecomList(recommendations);
              })
              .catch((error) => {
                console.error("Error fetching recommendations:", error);
              });
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
    if (product) {
      const { id, image, title, price } = product;

      alert("Added to Cart Successfully" + id);
      addToCart({ id, image, title, price });
    }
  };

  const handleSearch = (searchValue: string) => {
    console.log(searchValue);
  };

  //for metadata
  useEffect(() => {
    async function fetchMetadata(productId: number) {
      try {
        const metadataResult: Metadata = await generateMetadata(productId);
        setMetadata(metadataResult);
      } catch (error) {
        console.error("Error generating metadata:", error);
      }
    }

    fetchMetadata(params.productId);
  }, [params.productId]);

  // Update the Head component when metadata changes
  useEffect(() => {
    if (metadata) {
      document.title = metadata.title || "Default Title";
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          metadata.description || "Default Description"
        );
      }

      // Set canonical URL
      const linkElement = document.querySelector('link[rel="canonical"]');
      if (linkElement) {
        linkElement.setAttribute(
          "href",
          metadata.alternates.canonical || "default-canonical-url"
        );
      }
    }
  }, [metadata]);

  return (
    <div id="body">
      {metadata && (
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />

          <link rel="canonical" href={metadata.alternates.canonical} />
        </Head>
      )}
      <Navigation onSearch={handleSearch} />

      {product ? (
        <div id="description">
          <div className="prodTitle">{product.title}</div>

          <div id="prodContainer">
            <Image
              className="prodImage"
              src={product.image}
              alt="product"
              height={200}
              width={200}
              loading="lazy"
              sizes="(max-width: 600px) 100vw, 200px"
            />

            <div className="prodInfo">
              <div className="prodDescription">
                {" "}
                <span style={{ fontWeight: "bold", fontSize: "30px" }}>
                  Description:
                </span>{" "}
                <br />
                {product.description}
              </div>
              <br />

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
      <div id="recomTitle">You might like these</div>
      <div className="Cards">
        {recomList && recomList.length > 0 ? (
          recomList.map((datas: Product) => (
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
                id={datas.id}
                source={datas.image}
                title={datas.title}
                price={datas.price}
              />
            </Link>
          ))
        ) : (
          <p>Browse More Products</p>
        )}
      </div>
    </div>
  );
};

export default Details;
