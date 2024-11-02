import { Helper } from "./context/helper";
import { Logger } from "./context/logger";
import { OnEvent } from "./context/onEvent";
import { Random } from "./context/rand";

declare global {
  interface Globals {
    logger: Logger;
    rand: Random;
    triggerEvent: OnEvent;
    helper: Helper;
  }

  declare var CardColor: CardColor;
  declare var CardType: CardType;

  declare var globals: Globals;
  const BasicBotStateManager: typeof import("./context/basicStateManager").BasicBotStateManager;
  const WholeGameBotStateManager: typeof import("./context/gameStateManager").WholeGameBotStateManager;
  const Card: typeof import("./context/common").Card;
  const DrawCardEvent: typeof import("./context/common").DrawCardEvent;
  const PlaceCardEvent: typeof import("./context/common").PlaceCardEvent;
  const RequestEndTurnEvent: typeof import("./context/common").RequestEndTurnEvent;
  const GetDeckEvent: typeof import("./context/common").GetDeckEvent;
  const PlayerDecisionEvent: typeof import("./context/common").PlayerDecisionEvent;
}
