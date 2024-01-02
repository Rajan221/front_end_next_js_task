"use client";
import React, { useState } from "react";
import Navigation from "./Navbar";
import Product from "./Product";
import "./page.css";
import { CartProvider } from "./CartContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// FOR TANSTACK
const queryClient = new QueryClient();

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // FUNCTION TO HANDLE SEARCH
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <main className="container">
          <Navigation onSearch={handleSearch} />

          <Product searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </main>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default App;
