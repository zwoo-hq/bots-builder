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
