import React from "react";
import "./Styles/Product.css";
import ProductCard from "./Reusables/ProductCard";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import Head from "next/head";

// TYPE DECLARATION
interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface ProductProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// FUNCTION FOR FETCHING DATA
const fetchData = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// USING TANSTACK TO FETCH DATA
const Product: React.FC<ProductProps> = ({ searchTerm, setSearchTerm }) => {
  const { isPending, error, data } = useQuery<Product[]>({
    queryKey: ["Data"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <div className="message">Loading...</div>;
  }

  if (error) {
    return (
      <div className="message">An error has occurred: {error.message}</div>
    );
  }

  // FILTERING LOGIC OF SEARCH
  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoBack = () => {
    setSearchTerm("");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="List of all products" />
      </Head>
      {/* CONDITIONAL RENDERING */}
      {searchTerm.length ? (
        <div id="top">Showing Results for {searchTerm} </div>
      ) : (
        <div id="top">Our Products </div>
      )}

      {/* SHOWING DATA FROM API TO THE CARDS COMPONENT */}
      <div className="Cards">
        {filteredData.length ? (
          filteredData.map((datas) => (
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
          <div className="noProd">
            No Products Found
            <div
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={handleGoBack}
            >
              Go back
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Product;
