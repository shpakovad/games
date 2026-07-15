import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import chevronDownIcon from "@/assets/icons/chevron_down.svg";
import { TYPE_ID_PARAM } from "@/constants/games";
import { useGetGamesQuery } from "@/store/gamesApi";
import { getGameTypes, normalizeGameType } from "@/utils/games";

import type { ChangeEvent } from "react";
import "./styles.scss";

const FilterBar = () => {
  const { data: games = [], isLoading } = useGetGamesQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTypeId = normalizeGameType(searchParams.get(TYPE_ID_PARAM));

  const gameTypes = useMemo(() => {
    const types = getGameTypes(games);
    return activeTypeId && !types.includes(activeTypeId) ? [activeTypeId, ...types] : types;
  }, [activeTypeId, games]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const value = normalizeGameType(e.target.value);

    if (value) {
      nextParams.set(TYPE_ID_PARAM, value);
    } else {
      nextParams.delete(TYPE_ID_PARAM);
    }

    setSearchParams(nextParams);
  };

  return (
    <div className="filter-bar">
      <label htmlFor="game-type-filter">Game Type</label>
      <div className="filter-bar__select-wrapper">
        <select
          id="game-type-filter"
          value={activeTypeId}
          onChange={handleSelectChange}
          disabled={isLoading}
        >
          <option value="">All</option>
          {gameTypes.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <img src={chevronDownIcon} alt="" aria-hidden="true" />
      </div>
    </div>
  );
};

export default FilterBar;
