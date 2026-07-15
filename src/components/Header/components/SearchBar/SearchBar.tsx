import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import searchIcon from "@/assets/icons/search.svg";
import { SEARCH_PARAM } from "@/constants/games";

import type { FormEvent } from "react";
import "./styles.scss";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get(SEARCH_PARAM) || "";

  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const handleSearchSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const nextParams = new URLSearchParams(searchParams);
      const nextSearchValue = inputValue.trim();

      if (nextSearchValue) {
        nextParams.set(SEARCH_PARAM, nextSearchValue);
      } else {
        nextParams.delete(SEARCH_PARAM);
      }

      setSearchParams(nextParams);
    },
    [inputValue, searchParams, setSearchParams],
  );

  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search</label>
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
          <img src={searchIcon} alt="" aria-hidden="true" />
        </div>
        <button className="search-bar__button" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
