import { IncomingMessage } from "../zrp";
import { BasicBotStateManger } from "./basicStateManager";

/**
 * a bot state manager keeping track of the entire game state like the player ui would
 */
export class WholeGameBotStateManager {
  private _basicState: BasicBotStateManger;
  private _players: Record<number, number>;
  private _currentDraw: number | undefined;

  public constructor() {
    this._basicState = new BasicBotStateManger();
    this._players = {};
    this._currentDraw = undefined;
  }

  public get state() {
    return this._basicState.state;
  }

  public get players() {
    return this._players;
  }

  public get currentDraw() {
    return this._currentDraw;
  }

  public getState() {
    return this.state;
  }

  public aggregateNotification(message: IncomingMessage) {
    this._basicState.aggregateNotification(message);

    switch (message.Code) {
      case ZRPCode.StateUpdated:
        const state = message.Payload as StateUpdateNotification;
        this._currentDraw = state.CurrentDrawAmount;
        for (const player of state.CardAmounts) {
          this._players[player.Key] = player.Value;
        }
        break;
      case ZRPCode.GameStarted:
        const data = message.Payload as GameStartedNotification;
        for (const player of data.Players) {
          this._players[player.Id] = player.Cards;
        }
        break;
    }
  }

  public reset() {
    this._basicState.reset();
    this._players = {};
    this._currentDraw = undefined;
  }
}
