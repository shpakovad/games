import { useEffect, useMemo, useRef, useState } from "react";

import { useGetGamesQuery } from "@/store/gamesApi";

import type { IServerDataError } from "@/types/game";
import "./styles.scss";

const GAMES_PER_PAGE = 30;

const GameList = () => {
  const { data: games = [], isLoading, isError, error } = useGetGamesQuery();

  const [visibleCount, setVisibleCount] = useState<number>(GAMES_PER_PAGE);

  const triggerRef = useRef<HTMLDivElement | null>(null);

  const displayedGames = useMemo(() => {
    return games.slice(0, visibleCount);
  }, [games, visibleCount]);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prevCount) => {
            if (prevCount >= games.length) {
              return prevCount;
            }
            return prevCount + GAMES_PER_PAGE;
          });
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      observer.disconnect();
    };
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

  if (games.length === 0) {
    return <div className="game-list-empty">Games not found</div>;
  }

  return (
    <>
      <div className="game-list">
        {displayedGames.map((game) => {
          const imageUrl = `https://bsw-dk1.pragmaticplay.net/game_pic/square/200/${game.gameID}.png`;

          return (
            <div key={game.gameID} className="game-list__item">
              <img
                src={imageUrl}
                alt={game.gameName}
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
