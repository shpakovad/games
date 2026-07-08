export interface IGame {
  firstSeenAt: string;
  gameID: string;
  gameName: string;
  gameTypeID: string;
  platform: string;
  technology: string;
}

export interface IServerDataError {
  error_message: string;
  result: object;
  status: number;
}
