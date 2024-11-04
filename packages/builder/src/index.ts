import { IncomingMessage } from "./zrp";

export abstract class Bot {
  abstract AggregateNotification(message: IncomingMessage): void;
  abstract Reset(): void;
}

export type { IncomingMessage };

export { BasicBotStateManger } from "./builtin/basicStateManager";
export type { BasicBotState } from "./builtin/basicStateManager";
export { WholeGameBotStateManager } from "./builtin/gameStateManager";
export { JsCard } from "./builtin/jsTypes";

export default Bot;
