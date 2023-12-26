"use client";
import React, { useState } from "react";
import Navigation from "./Navbar";
import Product from "./Product";
import styles from "./page.module.css";
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
    <QueryClientProvider client={queryClient}>
      <main className={styles.container}>
        <Navigation onSearch={handleSearch} />

        <Product searchTerm={searchTerm} />
      </main>
    </QueryClientProvider>
  );
}

export default App;
