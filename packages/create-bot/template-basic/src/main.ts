import { Bot, type IncomingMessage } from "@zwoo/bots-builder";
import {
  DrawCardEvent,
  GetDeckEvent,
  globals,
  PlaceCardEvent,
  PlayerDecisionEvent,
  RequestEndTurnEvent,
  WholeGameBotStateManager,
} from "@zwoo/bots-builder/globals";

/*
 * This is an example of a bot that plays the game.
 */
export class Bot extends BotBase {
  private triggerEvent = globals.triggerEvent;
  private state = new WholeGameBotStateManager();
  private placedCard = -1;

  public AggregateNotification(message) {
    switch (message.Code) {
      case ZRPCode.GameStarted:
        this.triggerEvent(ZRPCode.GetHand, new GetDeckEvent());
        break;
      case ZRPCode.GetPlayerDecision:
        globals.logger.Info("making decision");
        this.makeDecision(message.Payload);
        return;
      case ZRPCode.PlaceCardError:
        this.placeCard();
        return;
      default:
        this.state.AggregateNotification(message);
        break;
    }

    var currentState = this.state.GetState();
    if (currentState.IsActive && message.Code != ZRPCode.StateUpdated) {
      // start the turn - try placing a card
      this.placedCard = -1;
      this.placeCard();
    }
  }

  public Reset() {
    this.state.Reset();
  }

  /**
   * placeCard tries to place a card on the board.
   *
   * It loops over teh cards in the deck one by one and tries to place them on the board.
   * WHen an error occurs, it tries the next card.
   */
  private placeCard() {
    var state = this.state.GetState();
    this.placedCard = this.placedCard + 1;

    if (this.placedCard >= state.Deck.Count) {
      // the last card was not valid, fall back to draw a card
      globals.logger.Info("bailing with draw");
      this.triggerEvent(ZRPCode.DrawCard, new DrawCardEvent());
      return;
    }

    try {
      this.triggerEvent(
        ZRPCode.PlaceCard,
        new PlaceCardEvent(
          globals.helper.toInt(state.Deck[this.placedCard].Color),
          globals.helper.toInt(state.Deck[this.placedCard].Type)
        )
      );

      if (state.Deck.Count == 2 && globals.random.Next(10) > 4) {
        // after placing this card only on card will be left + 50% chance to miss
        this.triggerEvent(ZRPCode.RequestEndTurn, new RequestEndTurnEvent());
      }
    } catch (ex) {
      globals.logger.Error("cant place card [" + this.placedCard + "]: " + ex);
    }
  }

  /**
   * makeDecision makes a decision based on the payload of the message.
   *
   * Each decision request contains a list of options. This bot just picks one at random.
   */
  private makeDecision(data) {
    const decision = globals.random.Next(data.Options.Count);
    this.triggerEvent(
      ZRPCode.ReceiveDecision,
      new PlayerDecisionEvent(data.Type, decision)
    );
  }
}

export default Bot;
