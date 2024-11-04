import { CardColor, CardType } from "../csInterop/card";
import { Dictionary } from "../csInterop/dictionary";
import { List } from "../csInterop/list";
import { UIFeedbackKind, UIFeedbackType } from "./feedback";
import { ZRPPlayerState } from "./playerState";
import { GameProfileGroup } from "./profiles";
import { ZRPRole } from "./role";
import { GameSettingsType } from "./settings";

export class PlayerJoinedNotification {
  public constructor(
    public readonly Id: number,
    public readonly Username: string,
    public readonly Wins: number,
    public readonly IsBot: boolean
  ) {}
}

export class SpectatorJoinedNotification {
  public constructor(
    public readonly Id: number,
    public readonly Username: string
  ) {}
}

export class PlayerLeftNotification {
  public constructor(public readonly Id: number) {}
}

export class SpectatorLeftNotification {
  public constructor(public readonly Id: number) {}
}

export class ChatMessageEvent {
  public constructor(public readonly Message: string) {}
}

export class ChatMessageNotification {
  public constructor(
    public readonly Id: number,
    public readonly Message: string
  ) {}
}

export class LeaveEvent {
  public constructor() {}
}

export class GetLobbyEvent {
  public constructor() {}
}

export class GetLobby_PlayerDTO {
  public constructor(
    public readonly Id: number,
    public readonly Username: string,
    public readonly Role: ZRPRole,
    public readonly State: ZRPPlayerState,
    public readonly Wins: number
  ) {}
}

export class GetLobbyNotification {
  public constructor(public readonly Players: List<GetLobby_PlayerDTO>) {}
}

export class SpectatorToPlayerEvent {
  public constructor() {}
}

export class PlayerToSpectatorEvent {
  public constructor(public readonly Id: number) {}
}

export class PlayerToHostEvent {
  public constructor(public readonly Id: number) {}
}

export class YouAreHostNotification {
  public constructor() {}
}

export class NewHostNotification {
  public constructor(public readonly Id: number) {}
}

export class KickPlayerEvent {
  public constructor(public readonly Id: number) {}
}

export class PlayerChangedRoleNotification {
  public constructor(
    public readonly Id: number,
    public readonly Role: ZRPRole,
    public readonly Wins: number
  ) {}
}

export class PlayerDisconnectedNotification {
  public constructor(public readonly Id: number) {}
}

export class PlayerReconnectedNotification {
  public constructor(public readonly Id: number) {}
}

export class KeepAliveEvent {
  public constructor() {}
}

export class AckKeepAliveNotification {
  public constructor() {}
}

export class UpdateSettingEvent {
  public constructor(
    public readonly Setting: string,
    public readonly Value: number
  ) {}
}

export class SettingChangedNotification {
  public constructor(
    public readonly Setting: string,
    public readonly Value: number
  ) {}
}

export class GetSettingsEvent {
  public constructor() {}
}

export class AllSettings_SettingDTO {
  public constructor(
    public readonly Setting: string,
    public readonly Value: number,
    public readonly Title: Dictionary<string, string>,
    public readonly Description: Dictionary<string, string>,
    public readonly Type: GameSettingsType,
    public readonly IsReadonly: boolean,
    public readonly Min?: number,
    public readonly Max?: number
  ) {}
}

export class AllSettingsNotification {
  public constructor(public readonly Settings: List<AllSettings_SettingDTO>) {}
}

export class GetAllGameProfilesEvent {
  public constructor() {}
}

export class AllGameProfiles_ProfileDTO {
  public constructor(
    public readonly Id: string,
    public readonly Name: string,
    public readonly Group: GameProfileGroup
  ) {}
}

export class AllGameProfilesNotification {
  public constructor(
    public readonly Profiles: List<AllGameProfiles_ProfileDTO>
  ) {}
}

export class SafeToGameProfileEvent {
  public constructor(public readonly Name: string) {}
}

export class UpdateGameProfileEvent {
  public constructor(public readonly Id: string) {}
}

export class ApplyGameProfileEvent {
  public constructor(public readonly Id: string) {}
}

export class DeleteGameProfileEvent {
  public constructor(public readonly Id: string) {}
}

export class StartGameEvent {
  public constructor() {}
}

export class BotConfigDTO {
  public constructor(public readonly Type: number) {}
}

export class CreateBotEvent {
  public constructor(
    public readonly Username: string,
    public readonly Config: BotConfigDTO
  ) {}
}

export class BotJoinedNotification {
  public constructor(
    public readonly Id: number,
    public readonly Username: string,
    public readonly Wins: number
  ) {}
}

export class BotLeftNotification {
  public constructor(public readonly Id: number) {}
}

export class UpdateBotEvent {
  public constructor(
    public readonly Id: number,
    public readonly Config: BotConfigDTO
  ) {}
}

export class DeleteBotEvent {
  public constructor(public readonly Id: number) {}
}

export class GetBotsEvent {
  public constructor() {}
}

export class AllBots_BotDTO {
  public constructor(
    public readonly Id: number,
    public readonly Username: string,
    public readonly Config: BotConfigDTO,
    public readonly Wins: number
  ) {}
}

export class AllBotsNotification {
  public constructor(public readonly Bots: List<AllBots_BotDTO>) {}
}

export class GameStartedNotification {
  public constructor(
    public readonly Hand: List<SendDeck_CardDTO>,
    public readonly Players: List<SendPlayerState_PlayerDTO>,
    public readonly Pile: SendPileTopNotification
  ) {}
}

export class StartTurnNotification {
  public constructor() {}
}

export class EndTurnNotification {
  public constructor() {}
}

export class RequestEndTurnEvent {
  public constructor() {}
}

export class PlaceCardEvent {
  public constructor(
    public readonly Type: number,
    public readonly Symbol: number
  ) {}
}

export class DrawCardEvent {
  public constructor() {}
}

export class SendCard_CardDTO {
  public constructor(
    public readonly Type: CardColor,
    public readonly Symbol: CardType
  ) {}
}

export class SendCardsNotification {
  public constructor(public readonly Cards: List<SendCard_CardDTO>) {}
}

export class RemoveCard_CardDTO {
  public constructor(
    public readonly Type: CardColor,
    public readonly Symbol: CardType
  ) {}
}

export class RemoveCardNotification {
  public constructor(public readonly Cards: List<RemoveCard_CardDTO>) {}
}

export class StateUpdate_PileTopDTO {
  public constructor(
    public readonly Type: CardColor,
    public readonly Symbol: CardType
  ) {}
}

export class StateUpdate_FeedbackDTO {
  public constructor(
    public readonly Type: UIFeedbackType,
    public readonly Kind: UIFeedbackKind,
    public readonly Args: Dictionary<string, number>
  ) {}
}

export class StateUpdateNotification {
  public constructor(
    public readonly PileTop: StateUpdate_PileTopDTO,
    public readonly ActivePlayer: number,
    public readonly CardAmounts: Dictionary<number, number>,
    public readonly Feedback: List<StateUpdate_FeedbackDTO>,
    public readonly CurrentDrawAmount?: number
  ) {}
}

export class GetDeckEvent {
  public constructor() {}
}

export class SendDeck_CardDTO {
  public constructor(
    public readonly Type: CardColor,
    public readonly Symbol: CardType
  ) {}
}

export class SendDeckNotification {
  public constructor(public readonly Hand: List<SendDeck_CardDTO>) {}
}

export class GetPlayerStateEvent {
  public constructor() {}
}

export class SendPlayerState_PlayerDTO {
  public constructor(
    public readonly Id: number,
    public readonly Username: string,
    public readonly Cards: number,
    public readonly Order: number,
    public readonly IsActivePlayer: boolean
  ) {}
}

export class SendPlayerStateNotification {
  public constructor(
    public readonly Players: List<SendPlayerState_PlayerDTO>
  ) {}
}

export class GetPileTopEvent {
  public constructor() {}
}

export class SendPileTopNotification {
  public constructor(
    public readonly Type: CardColor,
    public readonly Symbol: CardType
  ) {}
}

export class GetPlayerDecisionNotification {
  public constructor(
    public readonly Type: number,
    public readonly Options: List<string>
  ) {}
}

export class PlayerDecisionEvent {
  public constructor(
    public readonly Type: number,
    public readonly Decision: number
  ) {}
}

export class PlayerWon_PlayerSummaryDTO {
  public constructor(
    public readonly Id: number,
    public readonly Position: number,
    public readonly Score: number
  ) {}
}

export class PlayerWonNotification {
  public constructor(
    public readonly Id: number,
    public readonly Summary: List<PlayerWon_PlayerSummaryDTO>
  ) {}
}

export class Error {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}

export class AccessDeniedError {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}

export class LobbyFullError {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}

export class BotNameExistsError {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}

export class EmptyPileError {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}

export class PlaceCardError {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}
