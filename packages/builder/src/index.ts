import { IncomingMessage } from "./zrp";

export abstract class Bot {
  abstract AggregateNotification(message: IncomingMessage): void;
  abstract Reset(): void;
}

export type { IncomingMessage };
