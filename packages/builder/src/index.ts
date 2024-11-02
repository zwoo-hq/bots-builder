import { IncomingMessage } from "./zrp";

export abstract class BotBase {
  abstract AggregateNotification(message: IncomingMessage): void;
  abstract Reset(): void;
}
