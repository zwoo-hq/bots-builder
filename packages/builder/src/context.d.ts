import { CardColor, CardType } from "./context/common";

declare global {
  declare const CardColor: CardColor;
  declare const CardType: CardType;

  declare const Card: typeof import("./context/common").Card;
  declare const DrawCardEvent: typeof import("./context/common").DrawCardEvent;
  declare const PlaceCardEvent: typeof import("./context/common").PlaceCardEvent;
  declare const RequestEndTurnEvent: typeof import("./context/common").RequestEndTurnEvent;
  declare const GetDeckEvent: typeof import("./context/common").GetDeckEvent;
  declare const PlayerDecisionEvent: typeof import("./context/common").PlayerDecisionEvent;
}
