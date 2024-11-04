import { JsCard } from "./builtin/jsTypes";
import { OnEvent } from "./context/onEvent";
import type { Globals } from "./globals";
import { IncomingMessage } from "./zrp";

declare global {
  const globals: Globals;
}

export abstract class Bot {
  protected abstract triggerEvent: OnEvent;

  abstract AggregateNotification(message: IncomingMessage): void;
  abstract Reset(): void;

  protected placeCard(card: JsCard) {
    this.triggerEvent(
      ZRPCode.PlaceCard,
      new PlaceCardEvent(
        globals.helper.toInt(card.color),
        globals.helper.toInt(card.type)
      )
    );
  }

  protected drawCard() {
    this.triggerEvent(ZRPCode.DrawCard, new DrawCardEvent());
  }

  protected endTurn() {
    this.triggerEvent(ZRPCode.RequestEndTurn, new RequestEndTurnEvent());
  }

  protected setChatMessage(message: string) {
    this.triggerEvent(ZRPCode.CreateChatMessage, new ChatMessageEvent(message));
  }

  protected makeDecision(type: number, decision: number) {
    this.triggerEvent(
      ZRPCode.ReceiveDecision,
      new PlayerDecisionEvent(type, decision)
    );
  }
}
