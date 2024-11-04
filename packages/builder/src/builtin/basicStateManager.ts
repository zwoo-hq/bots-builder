import { IncomingMessage } from "../zrp";
import { JsCard } from "./jsTypes";

/**
 * A basic snapshot of the bot state
 */
export type BasicBotState = {
  /**
   * A list of all cards the bot current has
   *
   * @type {JsCard[]}
   */
  deck: JsCard[];

  /**
   * The card that's on top of the stack currently
   *
   * @type {JsCard}
   */
  topCard: JsCard;

  /**
   * Whether the bot is the active player or not
   *
   * @type {boolean}
   */
  isActive: boolean;
};

/**
 * a bot state manager managing only the bare minimum state need for the bot to make decisions
 */
export class BasicBotStateManger {
  private _state: BasicBotState;

  public constructor() {
    this._state = {
      deck: [],
      topCard: new JsCard(),
      isActive: false,
    };
  }

  public get state(): BasicBotState {
    return this._state;
  }

  public getState() {
    return this.state;
  }

  public aggregateNotification(message: IncomingMessage) {
    switch (message.Code) {
      case ZRPCode.SendCards:
        this.aggregateNewCards(message.Payload);
        break;
      case ZRPCode.StateUpdated:
        this.aggregateStateUpdate(message.Payload);
        break;
      case ZRPCode.RemoveCards:
        this.aggregateRemoveCard(message.Payload);
        break;
      case ZRPCode.SendHand:
        this.aggregateSendHand(message.Payload);
        break;
      case ZRPCode.SendPileTop:
        this.aggregatePileTop(message.Payload);
        break;
      case ZRPCode.StartTurn:
        this._state.isActive = true;
        break;
      case ZRPCode.EndTurn:
        this._state.isActive = false;
        break;
    }
  }

  public reset() {
    this._state = {
      deck: [],
      topCard: new JsCard(),
      isActive: false,
    };
  }

  private aggregateNewCards(data: SendCardsNotification) {
    for (const card of data.Cards) {
      this._state.deck.push(new JsCard(card));
    }
  }

  private aggregateRemoveCard(data: RemoveCardNotification) {
    for (const card of data.Cards) {
      const index = this._state.deck.findIndex((c) => c.equals(card));
      if (index >= 0) {
        this._state.deck.splice(index, 1);
      }
    }
  }

  private aggregateSendHand(data: SendDeckNotification) {
    this._state.deck = [];
    for (const card of data.Hand) {
      this._state.deck.push(new JsCard(card));
    }
  }

  private aggregatePileTop(data: SendPileTopNotification) {
    this._state.topCard = new JsCard(data);
  }

  private aggregateStateUpdate(data: StateUpdateNotification) {
    this._state.topCard = new JsCard(data.PileTop);
  }
}
