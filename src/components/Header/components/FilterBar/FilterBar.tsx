import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import chevronDownIcon from "@/assets/icons/chevron_down.svg";
import { useGetGamesQuery } from "@/store/gamesApi";

import type { ChangeEvent } from "react";
import "./styles.scss";

const FilterBar = () => {
  const { data: games = [], isError, isLoading } = useGetGamesQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeGameId = searchParams.get("typeId") || "";

  const list = useMemo(() => {
    if (games.length) {
      const ids = games.map((game) => game.gameTypeID.toUpperCase());
      return Array.from(new Set(ids));
    } else {
      if (activeGameId) return [activeGameId];
    }
    return [];
  }, [games, activeGameId]);

  const isNotEmptyList = useMemo(() => list.length !== 0, [list]);

  const optionClassName = [
    isError && list[0] === activeGameId && "filter-bar__select-wrapper--error",
  ]
    .filter(Boolean)
    .join(" ");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val && val !== "All") searchParams.set("typeId", val);
    else searchParams.delete("typeId");
    setSearchParams(searchParams);
  };

  return (
    <div className="filter-bar">
      <label>Game Type</label>
      <div className="filter-bar__select-wrapper">
        <select value={activeGameId} onChange={handleSelectChange} disabled={isLoading}>
          <option value="All">All</option>
          {isNotEmptyList &&
            list.map((item) => (
              <option className={optionClassName} value={item} key={item}>
                {item}
              </option>
            ))}
        </select>
        <img src={chevronDownIcon} alt="Filter" />
      </div>
    </div>
  );
};

export default FilterBar;
