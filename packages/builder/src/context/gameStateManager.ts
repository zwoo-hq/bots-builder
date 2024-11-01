import { BasicBotStateManager } from "./basicStateManager";

export class WholeGameBotStateManager extends BasicBotStateManager {
  public GetOtherPlayers(): Record<number, number> {
    return {} as Record<number, number>;
  }
  public GetCurrentDraw(): number | undefined {
    return undefined;
  }
}
