import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Game, GamesResponse } from "@/types/game";

const API = "pragmatic/game/list?partner_name=belparyaj";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getGames: builder.query<Game[], void>({
      query: () => API,
      transformResponse: (response: GamesResponse) => {
        return response.result || [];
      },
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
