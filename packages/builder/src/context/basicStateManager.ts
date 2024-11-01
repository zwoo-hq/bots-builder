import { IncomingMessage } from "http";
import { Card } from "./common";

export interface BotState {
  Deck: Card[];
  StackTop: Card;
  IsActive: boolean;
}

export class BasicBotStateManager {
  public AggregateNotification(_message: IncomingMessage): void {}
  public Reset(): void {}
  public GetState(): BotState {
    return {} as BotState;
  }
}
