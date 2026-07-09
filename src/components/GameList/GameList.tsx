import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetGamesQuery } from "@/store/gamesApi";

import type { IServerDataError } from "@/types/game";
import "./styles.scss";

const CARD_HEIGHT = 150;
const ROW_GAP = 10;
const CARD_MIN_WIDTH = 190;
const COLUMN_GAP = 20;

const calcGamesPerPage = (containerWidth: number, availableHeight: number): number => {
  const cols = Math.max(
    1,
    Math.floor((containerWidth + COLUMN_GAP) / (CARD_MIN_WIDTH + COLUMN_GAP)),
  );
  const rows = Math.ceil(availableHeight / (CARD_HEIGHT + ROW_GAP));
  return cols * rows;
};

const GameList = () => {
  const { data: games = [], isLoading, isError, error } = useGetGamesQuery();

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const gamesPerPageRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState(0);

  const [searchParams] = useSearchParams();

  const gameIdFilter = searchParams.get("typeId") || "";
  //const searchFilter = searchParams.get("search") || "";

  useLayoutEffect(() => {
    if (isLoading || !containerRef.current) return;
    const { top, width } = containerRef.current.getBoundingClientRect();
    gamesPerPageRef.current = calcGamesPerPage(width, window.innerHeight - top);
    setVisibleCount(gamesPerPageRef.current);
  }, [isLoading]);

  const displayedGames = useMemo(() => {
    if (gameIdFilter) {
      const filtered = games.filter(
        (game) => game.gameTypeID.toUpperCase() === gameIdFilter.toUpperCase(),
      );
      if (filtered.length === 0)
        return [{ isNotFound: true, gameID: "0", gameName: "Game not found" }];
      return filtered.slice(0, visibleCount);
    }
    return games.slice(0, visibleCount);
  }, [games, visibleCount, gameIdFilter]);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prevCount) => {
            if (prevCount >= games.length) return prevCount;
            return prevCount + gamesPerPageRef.current;
          });
        }
      },
      { threshold: 0 },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, games.length]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    const isServerError = error && "data" in error;
    const serverErrorData = isServerError ? (error.data as IServerDataError) : null;
    const errorMessage = serverErrorData?.error_message || "Unknown server error";

    return <div className="error">Something went wrong: {errorMessage}</div>;
  }

  if (games.length === 0 || (displayedGames.length && displayedGames[0].isNotFound)) {
    return <div className="game-list-empty">Games not found</div>;
  }

  return (
    <>
      <div ref={containerRef} className="game-list">
        {displayedGames.map((game) => {
          const imageUrl = `https://bsw-dk1.pragmaticplay.net/game_pic/square/200/${game.gameID}.png`;

          return (
            <div key={game.gameID} className="game-list__item">
              <img
                src={imageUrl}
                alt={game.gameName}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co";
                }}
              />
              <div className="game-list__item-title">{game.gameName}</div>
            </div>
          );
        })}
      </div>

      {visibleCount < games.length && <div ref={triggerRef} />}
    </>
  );
};

export default GameList;
