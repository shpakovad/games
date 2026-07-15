import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { GAMES_PAGE_SIZE, SEARCH_PARAM, TYPE_ID_PARAM } from "@/constants/games";
import { useInfiniteList } from "@/hooks/useInfiniteList";
import { useGetGamesQuery } from "@/store/gamesApi";
import { filterGames, getGameImageUrl } from "@/utils/games";

import type { ServerDataError } from "@/types/game";
import "./styles.scss";

const GameList = () => {
  const { data: games = [], isLoading, isError, error } = useGetGamesQuery();
  const [searchParams] = useSearchParams();

  const typeId = searchParams.get(TYPE_ID_PARAM) || "";
  const search = searchParams.get(SEARCH_PARAM) || "";

  const filteredGames = useMemo(() => filterGames(games, search, typeId), [games, search, typeId]);
  const { hasMore, triggerRef, visibleItems } = useInfiniteList({
    items: filteredGames,
    pageSize: GAMES_PAGE_SIZE,
    resetKey: `${search}:${typeId}`,
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    const isServerError = error && "data" in error;
    const serverErrorData = isServerError ? (error.data as ServerDataError) : null;
    const errorMessage = serverErrorData?.error_message || "Unknown server error";

    return <div className="error">Something went wrong: {errorMessage}</div>;
  }

  if (filteredGames.length === 0) {
    return <div className="game-list-empty">Games not found</div>;
  }

  return (
    <>
      <div className="game-list">
        {visibleItems.map((game) => {
          const imageUrl = getGameImageUrl(game.gameID);

          return (
            <div key={game.gameID} className="game-list__item">
              <img
                src={imageUrl}
                alt={game.gameName}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.hidden = true;
                }}
              />
              <div className="game-list__item-title">{game.gameName}</div>
            </div>
          );
        })}
      </div>

      {hasMore && <div ref={triggerRef} className="game-list__trigger" />}
    </>
  );
};

export default GameList;
