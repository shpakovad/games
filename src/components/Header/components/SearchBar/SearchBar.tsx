import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import searchIcon from "@/assets/icons/search.svg";

import type { FormEvent } from "react";
import "./styles.scss";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(initialSearch);

  useEffect(() => {
    setInputValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // СТРОГО ОБЯЗАТЕЛЬНО: отменяет перезагрузку страницы браузером

      if (inputValue.trim()) {
        searchParams.set("search", inputValue.trim());
      } else {
        searchParams.delete("search");
      }

      setSearchParams(searchParams);
    },
    [inputValue, searchParams, setSearchParams],
  );

  return (
    <div className="search-bar">
      <label>Search</label>
      <form onSubmit={handleSearchSubmit} className="search-bar__wrapper">
        <div className="search-bar__input">
          <input
            id="search-input"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="search-input"
          />
          <img src={searchIcon} alt="Search" />
        </div>
        <button className="search-bar__button" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
