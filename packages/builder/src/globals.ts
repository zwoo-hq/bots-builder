import { Helper } from "./context/helper";
import { Logger } from "./context/logger";
import { OnEvent } from "./context/onEvent";
import { Random } from "./context/random";

export interface Globals {
  logger: Logger;
  random: Random;
  triggerEvent: OnEvent;
  helper: Helper;
}

export const globals: Globals = {} as any;

export {
  Card,
  CardColor,
  CardType,
  DrawCardEvent,
  GetDeckEvent,
  PlaceCardEvent,
  PlayerDecisionEvent,
  RequestEndTurnEvent,
} from "./context/common";

export { BasicBotStateManager } from "./context/basicStateManager";
export type { BotState } from "./context/basicStateManager";

export { WholeGameBotStateManager } from "./context/gameStateManager";
