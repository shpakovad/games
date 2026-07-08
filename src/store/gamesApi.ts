import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IGame, IGameState } from "@/types/game";

const API = "pragmatic/game/list?partner_name=belparyaj";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getGames: builder.query<IGame[], void>({
      query: () => API,
      transformResponse: (response: IGameState): IGame[] | [] => {
        return response.result || [];
      },
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
