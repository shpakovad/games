export interface IGame {
  firstSeenAt: string;
  gameID: string;
  gameName: string;
  gameTypeID: string;
  platform: string;
  technology: string;
  isNotFound?: boolean;
}

export interface IGameState {
  result: IGame[];
  status: number;
  error_message: string;
}

export interface IServerDataError {
  error_message: string;
  result: object;
  status: number;
}
