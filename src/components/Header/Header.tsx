import "./styles.scss";
import FilterBar from "@/components/Header/components/FilterBar/FilterBar";
import SearchBar from "@/components/Header/components/SearchBar/SearchBar";

const Header = () => {
  return (
    <header className="header">
      <FilterBar />
      <SearchBar />
    </header>
  );
};

export default Header;
