import "./styles.scss";
import searchIcon from "@/assets/icons/search.svg";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <label>Search</label>
      <div className="search-bar__wrapper">
        <div className="search-bar__input">
          <input
            id="search-input"
            type="text"
            placeholder="Search"
            value=""
            onChange={() => {}}
            className="search-input"
          />
          <img src={searchIcon} alt="Search" />
        </div>
        <button className="search-bar__button">SEARCH</button>
      </div>
    </div>
  );
};

export default SearchBar;
