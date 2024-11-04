import {
  CardColor as _CardColor,
  CardType as _CardType,
  Card as _Card,
} from "./context/common";
import { List as _List } from "./csInterop/list";
import { ZRPCode as _ZRPCode } from "./zrp/code";
import {
  UIFeedbackKind as _UIFeedbackKind,
  UIFeedbackType as _UIFeedbackType,
} from "./zrp/feedback";
import {
  PlayerJoinedNotification as _PlayerJoinedNotification,
  SpectatorJoinedNotification as _SpectatorJoinedNotification,
  PlayerLeftNotification as _PlayerLeftNotification,
  SpectatorLeftNotification as _SpectatorLeftNotification,
  ChatMessageEvent as _ChatMessageEvent,
  ChatMessageNotification as _ChatMessageNotification,
  LeaveEvent as _LeaveEvent,
  GetLobbyEvent as _GetLobbyEvent,
  GetLobby_PlayerDTO as _GetLobby_PlayerDTO,
  GetLobbyNotification as _GetLobbyNotification,
  SpectatorToPlayerEvent as _SpectatorToPlayerEvent,
  PlayerToSpectatorEvent as _PlayerToSpectatorEvent,
  PlayerToHostEvent as _PlayerToHostEvent,
  YouAreHostNotification as _YouAreHostNotification,
  NewHostNotification as _NewHostNotification,
  KickPlayerEvent as _KickPlayerEvent,
  PlayerChangedRoleNotification as _PlayerChangedRoleNotification,
  PlayerDisconnectedNotification as _PlayerDisconnectedNotification,
  PlayerReconnectedNotification as _PlayerReconnectedNotification,
  KeepAliveEvent as _KeepAliveEvent,
  AckKeepAliveNotification as _AckKeepAliveNotification,
  UpdateSettingEvent as _UpdateSettingEvent,
  SettingChangedNotification as _SettingChangedNotification,
  GetSettingsEvent as _GetSettingsEvent,
  AllSettings_SettingDTO as _AllSettings_SettingDTO,
  AllSettingsNotification as _AllSettingsNotification,
  GetAllGameProfilesEvent as _GetAllGameProfilesEvent,
  AllGameProfiles_ProfileDTO as _AllGameProfiles_ProfileDTO,
  AllGameProfilesNotification as _AllGameProfilesNotification,
  SafeToGameProfileEvent as _SafeToGameProfileEvent,
  UpdateGameProfileEvent as _UpdateGameProfileEvent,
  ApplyGameProfileEvent as _ApplyGameProfileEvent,
  DeleteGameProfileEvent as _DeleteGameProfileEvent,
  StartGameEvent as _StartGameEvent,
  BotConfigDTO as _BotConfigDTO,
  CreateBotEvent as _CreateBotEvent,
  BotJoinedNotification as _BotJoinedNotification,
  BotLeftNotification as _BotLeftNotification,
  UpdateBotEvent as _UpdateBotEvent,
  DeleteBotEvent as _DeleteBotEvent,
  GetBotsEvent as _GetBotsEvent,
  AllBots_BotDTO as _AllBots_BotDTO,
  AllBotsNotification as _AllBotsNotification,
  GameStartedNotification as _GameStartedNotification,
  StartTurnNotification as _StartTurnNotification,
  EndTurnNotification as _EndTurnNotification,
  RequestEndTurnEvent as _RequestEndTurnEvent,
  PlaceCardEvent as _PlaceCardEvent,
  DrawCardEvent as _DrawCardEvent,
  SendCard_CardDTO as _SendCard_CardDTO,
  SendCardsNotification as _SendCardsNotification,
  RemoveCard_CardDTO as _RemoveCard_CardDTO,
  RemoveCardNotification as _RemoveCardNotification,
  StateUpdate_PileTopDTO as _StateUpdate_PileTopDTO,
  StateUpdate_FeedbackDTO as _StateUpdate_FeedbackDTO,
  StateUpdateNotification as _StateUpdateNotification,
  GetDeckEvent as _GetDeckEvent,
  SendDeck_CardDTO as _SendDeck_CardDTO,
  SendDeckNotification as _SendDeckNotification,
  GetPlayerStateEvent as _GetPlayerStateEvent,
  SendPlayerState_PlayerDTO as _SendPlayerState_PlayerDTO,
  SendPlayerStateNotification as _SendPlayerStateNotification,
  GetPileTopEvent as _GetPileTopEvent,
  SendPileTopNotification as _SendPileTopNotification,
  GetPlayerDecisionNotification as _GetPlayerDecisionNotification,
  PlayerDecisionEvent as _PlayerDecisionEvent,
  PlayerWon_PlayerSummaryDTO as _PlayerWon_PlayerSummaryDTO,
  PlayerWonNotification as _PlayerWonNotification,
  Error as _Error,
  AccessDeniedError as _AccessDeniedError,
  LobbyFullError as _LobbyFullError,
  BotNameExistsError as _BotNameExistsError,
  EmptyPileError as _EmptyPileError,
  PlaceCardError as _PlaceCardError,
} from "./zrp/models";
import { ZRPPlayerState as _ZRPPlayerState } from "./zrp/playerState";
import { GameProfileGroup as _GameProfileGroup } from "./zrp/profiles";
import { ZRPRole as _ZRPRole } from "./zrp/role";
import { GameSettingsType as _GameSettingsType } from "./zrp/settings";

declare global {
  declare const Card: typeof _Card;

  declare const CardColor: typeof _CardColor;
  declare const CardType: typeof _CardType;
  declare const UIFeedbackKind: typeof _UIFeedbackKind;
  declare const UIFeedbackType: typeof _UIFeedbackType;
  declare const ZRPPlayerState: typeof _ZRPPlayerState;
  declare const ZRPRole: typeof _ZRPRole;
  declare const GameProfileGroup: typeof _GameProfileGroup;
  declare const GameSettingsType: typeof _GameSettingsType;
  declare const ZRPCode: typeof _ZRPCode;

  declare const List: typeof _List;
  declare const Dictionary: typeof _Dictionary;

  declare class PlayerJoinedNotification extends _PlayerJoinedNotification {}
  declare class SpectatorJoinedNotification extends _SpectatorJoinedNotification {}
  declare class PlayerLeftNotification extends _PlayerLeftNotification {}
  declare class SpectatorLeftNotification extends _SpectatorLeftNotification {}
  declare class ChatMessageEvent extends _ChatMessageEvent {}
  declare class ChatMessageNotification extends _ChatMessageNotification {}
  declare class LeaveEvent extends _LeaveEvent {}
  declare class GetLobbyEvent extends _GetLobbyEvent {}
  declare class GetLobby_PlayerDTO extends _GetLobby_PlayerDTO {}
  declare class GetLobbyNotification extends _GetLobbyNotification {}
  declare class SpectatorToPlayerEvent extends _SpectatorToPlayerEvent {}
  declare class PlayerToSpectatorEvent extends _PlayerToSpectatorEvent {}
  declare class PlayerToHostEvent extends _PlayerToHostEvent {}
  declare class YouAreHostNotification extends _YouAreHostNotification {}
  declare class NewHostNotification extends _NewHostNotification {}
  declare class KickPlayerEvent extends _KickPlayerEvent {}
  declare class PlayerChangedRoleNotification extends _PlayerChangedRoleNotification {}
  declare class PlayerDisconnectedNotification extends _PlayerDisconnectedNotification {}
  declare class PlayerReconnectedNotification extends _PlayerReconnectedNotification {}
  declare class KeepAliveEvent extends _KeepAliveEvent {}
  declare class AckKeepAliveNotification extends _AckKeepAliveNotification {}
  declare class UpdateSettingEvent extends _UpdateSettingEvent {}
  declare class SettingChangedNotification extends _SettingChangedNotification {}
  declare class GetSettingsEvent extends _GetSettingsEvent {}
  declare class AllSettings_SettingDTO extends _AllSettings_SettingDTO {}
  declare class AllSettingsNotification extends _AllSettingsNotification {}
  declare class GetAllGameProfilesEvent extends _GetAllGameProfilesEvent {}
  declare class AllGameProfiles_ProfileDTO extends _AllGameProfiles_ProfileDTO {}
  declare class AllGameProfilesNotification extends _AllGameProfilesNotification {}
  declare class SafeToGameProfileEvent extends _SafeToGameProfileEvent {}
  declare class UpdateGameProfileEvent extends _UpdateGameProfileEvent {}
  declare class ApplyGameProfileEvent extends _ApplyGameProfileEvent {}
  declare class DeleteGameProfileEvent extends _DeleteGameProfileEvent {}
  declare class StartGameEvent extends _StartGameEvent {}
  declare class BotConfigDTO extends _BotConfigDTO {}
  declare class CreateBotEvent extends _CreateBotEvent {}
  declare class BotJoinedNotification extends _BotJoinedNotification {}
  declare class BotLeftNotification extends _BotLeftNotification {}
  declare class UpdateBotEvent extends _UpdateBotEvent {}
  declare class DeleteBotEvent extends _DeleteBotEvent {}
  declare class GetBotsEvent extends _GetBotsEvent {}
  declare class AllBots_BotDTO extends _AllBots_BotDTO {}
  declare class AllBotsNotification extends _AllBotsNotification {}
  declare class GameStartedNotification extends _GameStartedNotification {}
  declare class StartTurnNotification extends _StartTurnNotification {}
  declare class EndTurnNotification extends _EndTurnNotification {}
  declare class RequestEndTurnEvent extends _RequestEndTurnEvent {}
  declare class PlaceCardEvent extends _PlaceCardEvent {}
  declare class DrawCardEvent extends _DrawCardEvent {}
  declare class SendCard_CardDTO extends _SendCard_CardDTO {}
  declare class SendCardsNotification extends _SendCardsNotification {}
  declare class RemoveCard_CardDTO extends _RemoveCard_CardDTO {}
  declare class RemoveCardNotification extends _RemoveCardNotification {}
  declare class StateUpdate_PileTopDTO extends _StateUpdate_PileTopDTO {}
  declare class StateUpdate_FeedbackDTO extends _StateUpdate_FeedbackDTO {}
  declare class StateUpdateNotification extends _StateUpdateNotification {}
  declare class GetDeckEvent extends _GetDeckEvent {}
  declare class SendDeck_CardDTO extends _SendDeck_CardDTO {}
  declare class SendDeckNotification extends _SendDeckNotification {}
  declare class GetPlayerStateEvent extends _GetPlayerStateEvent {}
  declare class SendPlayerState_PlayerDTO extends _SendPlayerState_PlayerDTO {}
  declare class SendPlayerStateNotification extends _SendPlayerStateNotification {}
  declare class GetPileTopEvent extends _GetPileTopEvent {}
  declare class SendPileTopNotification extends _SendPileTopNotification {}
  declare class GetPlayerDecisionNotification extends _GetPlayerDecisionNotification {}
  declare class PlayerDecisionEvent extends _PlayerDecisionEvent {}
  declare class PlayerWon_PlayerSummaryDTO extends _PlayerWon_PlayerSummaryDTO {}
  declare class PlayerWonNotification extends _PlayerWonNotification {}
  declare class Error extends _Error {}
  declare class AccessDeniedError extends _AccessDeniedError {}
  declare class LobbyFullError extends _LobbyFullError {}
  declare class BotNameExistsError extends _BotNameExistsError {}
  declare class EmptyPileError extends _EmptyPileError {}
  declare class PlaceCardError extends _PlaceCardError {}
}
