import { IncomingMessage } from "http";
import { Card } from "./common";
import { List } from "../csInterop/list";

export interface BotState {
  Deck: List<Card>;
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
