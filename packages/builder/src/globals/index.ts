import { Helper } from "./helper";
import { Logger } from "./logger";
import { OnEvent } from "./onEvent";
import { Random } from "./random";

export interface Globals {
  readonly triggerEvent: OnEvent;
  readonly logger: Logger;
  readonly helper: Helper;
  readonly random: Random;
}

export var globals = {} as Globals;

export function _setupEnvironment(_globals: Globals) {
  globals = _globals;
}
