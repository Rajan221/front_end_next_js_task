import React from "react";
import "./Styles/Product.css";
import ProductCard from "./Reusables/ProductCard";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface ProductProps {
  searchTerm: string;
}

const fetchData = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Product: React.FC<ProductProps> = ({ searchTerm }) => {
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

  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(searchTerm);

  return (
    <React.Fragment>
      {searchTerm.length ? (
        <div id="top">Showing Results for "{searchTerm}" </div>
      ) : (
        <div id="top">Our Products </div>
      )}

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
                source={datas.image}
                title={datas.title}
                price={datas.price}
              />
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No Products Found</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default Product;
