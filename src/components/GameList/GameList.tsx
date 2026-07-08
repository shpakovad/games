import { useGetGamesQuery } from "@/store/gamesApi";

import type { IServerDataError } from "@/types/game";
import "./styles.scss";

const GameList = () => {
  const { data: games = [], isLoading, isError, error } = useGetGamesQuery();

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

  return <div className="game-list">list</div>;
};

export default GameList;
