import { GAME_IMAGE_BASE_URL } from "@/constants/games";

import type { Game } from "@/types/game";

export const getGameImageUrl = (gameId: Game["gameID"]) => {
  return `${GAME_IMAGE_BASE_URL}/${gameId}.png`;
};

export const normalizeGameQuery = (value: unknown) => {
  return String(value ?? "")
    .trim()
    .toLowerCase();
};

export const normalizeGameType = (value: unknown) => {
  return String(value ?? "")
    .trim()
    .toUpperCase();
};

export const getGameTypes = (games: Game[]) => {
  const gameTypes = games.map((game) => normalizeGameType(game.gameTypeID)).filter(Boolean);

  return Array.from(new Set(gameTypes)).sort((left, right) => left.localeCompare(right));
};

export const filterGames = (games: Game[], search: string, typeId: string) => {
  const normalizedSearch = normalizeGameQuery(search);
  const normalizedTypeId = normalizeGameType(typeId);

  return games.filter((game) => {
    const matchesType = normalizedTypeId
      ? normalizeGameType(game.gameTypeID) === normalizedTypeId
      : true;
    const matchesSearch = normalizedSearch
      ? normalizeGameQuery(game.gameName).includes(normalizedSearch)
      : true;

    return matchesType && matchesSearch;
  });
};
