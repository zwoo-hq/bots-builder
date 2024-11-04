export enum ZRPCode {
  // General
  // - players
  PlayerJoined = 100,
  SpectatorJoined = 101,
  PlayerLeft = 102,
  SpectatorLeft = 103,
  PlayerLeaves = 106,
  // - chat
  CreateChatMessage = 104,
  SendChatMessage = 105,
  // - all players
  GetLobby = 108,
  SendLobby = 109,
  // - player role
  SpectatorToPlayer = 110,
  PlayerToSpectator = 111,
  PlayerToHost = 112,
  PromotedToHost = 113,
  HostChanged = 114,
  KickPlayer = 115,
  PlayerChangedRole = 116,
  PlayerDisconnected = 117,
  PlayerReconnected = 118,
  KeepAlive = 198,
  AckKeepAlive = 199,
  // Lobby
  UpdateSetting = 200,
  SettingChanged = 201,
  GetAllSettings = 202,
  SendAllSettings = 203,
  GetAllGameProfiles = 204,
  SendAllGameProfiles = 205,
  SaveToGameProfile = 206,
  UpdateGameProfile = 207,
  ApplyGameProfile = 208,
  DeleteGameProfile = 209,
  StartGame = 210,
  CreateBot = 230,
  BotJoined = 231,
  BotLeft = 232,
  UpdateBot = 233,
  DeleteBot = 235,
  GetBots = 236,
  SendBots = 237,
  // Game
  GameStarted = 300,
  StartTurn = 301,
  EndTurn = 302,
  RequestEndTurn = 303,
  PlaceCard = 304,
  DrawCard = 305,
  SendCards = 306,
  RemoveCards = 307,
  StateUpdated = 308,
  GetHand = 310,
  SendHand = 311,
  GetCardAmount = 312,
  SendCardAmount = 313,
  GetPileTop = 314,
  SendPileTop = 315,
  GetPlayerDecision = 316,
  ReceiveDecision = 317,
  PlayerWon = 399,
  // Errors
  GeneralError = 400,
  MessageToLongError = 401,
  AccessDeniedError = 420,
  LobbyFullError = 421,
  BotNameExistsError = 425,
  EmptyPileError = 426,
  EndTurnError = 433,
  PlaceCardError = 434,
}
