import {
  Bot,
  WholeGameBotStateManager,
  type IncomingMessage,
} from "@zwoo/bots-builder";
import { globals } from "@zwoo/bots-builder/globals";

/*
 * This is an example of a bot that plays the game.
 */
export class MyBot extends Bot {
  protected triggerEvent = globals.triggerEvent;
  private stateManager = new WholeGameBotStateManager();
  private placedCard = -1;

  public AggregateNotification(message: IncomingMessage) {
    switch (message.Code) {
      case ZRPCode.GameStarted:
        this.requestDeck()  
        break;
      case ZRPCode.GetPlayerDecision:
        globals.logger.Info("making decision");
        this.makeRandomDecision(message.Payload);
        return;
      case ZRPCode.PlaceCardError:
        this.selectCard();
        return;
      default:
        this.stateManager.aggregateNotification(message);
        break;
    }

    var currentState = this.state.GetState();
    if (currentState.IsActive && message.Code != ZRPCode.StateUpdated) {
      // start the turn - try placing a card
      this.placedCard = -1;
      this.selectCard();
    }
  }

  public Reset() {
    this.stateManager.reset();
  }

  /**
   * selectCard tries to place a card on the board.
   *
   * It loops over teh cards in the deck one by one and tries to place them on the board.
   * WHen an error occurs, it tries the next card.
   */
  private selectCard() {
    var state = this.stateManager.state;
    this.placedCard = this.placedCard + 1;

    if (this.placedCard >= state.Deck.Count) {
      // the last card was not valid, fall back to draw a card
      globals.logger.Info("bailing with draw");
      this.drawCard();
      return;
    }

    try {
      this.placeCard(state.deck[this.placedCard]);

      if (state.Deck.Count == 2 && globals.random.Next(10) > 4) {
        // after placing this card only on card will be left + 50% chance to miss
        this.endTurn();
      }
    } catch (ex) {
      globals.logger.Error("cant place card [" + this.placedCard + "]: " + ex);
    }
  }

  /**
   * makeRandomDecision makes a decision based on the payload of the message.
   *
   * Each decision request contains a list of options. This bot just picks one at random.
   */
  private makeRandomDecision(data: GetPlayerDecisionNotification) {
    const decision = globals.random.Next(data.Options.Count);
    this.makeDecision(data.Type, decision);
  }
}

export default MyBot;
