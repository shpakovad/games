import chevronDownIcon from "@/assets/icons/chevron_down.svg";

import "./styles.scss";

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <label>Game Type</label>
      <div className="filter-bar__select-wrapper">
        <select value="" onChange={() => {}}>
          <option value="option1">All</option>
          <option value="option1">Variant 1</option>
          <option value="option2">Variant 2</option>
          <option value="option3">Variant 3</option>
        </select>
        <img src={chevronDownIcon} alt="Filter" />
      </div>
    </div>
  );
};

export default FilterBar;
