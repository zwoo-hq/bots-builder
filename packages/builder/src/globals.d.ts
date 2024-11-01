import { BasicBotStateManager } from "./context/basicStateManager";
import { WholeGameBotStateManager } from "./context/gameStateManager";
import { Helper } from "./context/helper";
import { Logger } from "./context/logger";
import { OnEvent } from "./context/onEvent";
import { Random } from "./context/rand";
import {
  Card,
  CardColor,
  CardType,
  DrawCardEvent,
  PlaceCardEvent,
  RequestEndTurnEvent,
  GetDeckEvent,
  PlayerDecisionEvent,
} from "./context/common";

declare global {
  interface Globals {
    logger: Logger;
    rand: Random;
    onEvent: OnEvent;
    helper: Helper;
  }

  declare var CardColor: CardColor;
  declare var CardType: CardType;

  declare var globals: Globals;
  declare class BasicBotStateManager extends BasicBotStateManager {}
  declare class WholeGameBotStateManager extends WholeGameBotStateManager {}
  declare class Card extends Card {}
  declare class DrawCardEvent extends DrawCardEvent {}
  declare class PlaceCardEvent extends PlaceCardEvent {}
  declare class RequestEndTurnEvent extends RequestEndTurnEvent {}
  declare class GetDeckEvent extends GetDeckEvent {}
  declare class PlayerDecisionEvent extends PlayerDecisionEvent {}
}
