export interface Game {
  firstSeenAt: string;
  gameID: string;
  gameName: string;
  gameTypeID: string;
  platform: string;
  technology: string;
}

export interface GamesResponse {
  result?: Game[];
  status: number;
  error_message?: string;
}

export interface ServerDataError {
  error_message?: string;
  result: object;
  status: number;
}
