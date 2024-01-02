import React, { useState, ChangeEvent, FormEvent } from "react";
import Cart from "./Cart";
import "./Styles/Navbar.css";

interface NavigationProps {
  onSearch: (value: string) => void;
}

// NAVBAR FUNCTION STARTS HERE
const Navigation: React.FC<NavigationProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue); // Trigger the search with the entered value
  };

  const home = () => {
    onSearch("");
  };

  return (
    <React.Fragment>
      <div className="Navbar">
        <div id="product" onClick={home}>
          PRODUCTS
        </div>
        <div className="Menu">
          <form id="searchForm" onSubmit={handleSearch}>
            <input
              id="searchBox"
              type="text"
              onChange={handleInputChange}
              value={searchValue}
              placeholder="Search Your Products Here.."
            />
            <button id="searchButton" type="submit">
              Search
            </button>
          </form>
        </div>

        <div id="cart">
          <Cart />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
