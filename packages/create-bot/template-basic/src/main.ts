import {
  Bot,
  WholeGameBotStateManager,
  type IncomingMessage,
} from "@zwoo/bots-builder";

/*
 * This is an example of a bot that plays the game.
 */
export class MyBot extends Bot {
  private stateManager = new WholeGameBotStateManager();
  private placedCard = -1;

  public AggregateNotification(message: IncomingMessage) {
    switch (message.Code) {
      case ZRPCode.GameStarted:
        this.requestDeck();
        break;
      case ZRPCode.GetPlayerDecision:
        this.logger.Info("making decision");
        this.makeRandomDecision(message.Payload);
        return;
      case ZRPCode.PlaceCardError:
        this.selectCard();
        return;
      default:
        this.stateManager.aggregateNotification(message);
        break;
    }

    var currentState = this.stateManager.getState();
    if (currentState.isActive && message.Code != ZRPCode.StateUpdated) {
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

    if (this.placedCard >= state.deck.length) {
      // the last card was not valid, fall back to draw a card
      this.logger.Info("bailing with draw");
      this.drawCard();
      return;
    }

    try {
      this.placeCard(state.deck[this.placedCard]);

      if (state.deck.length == 2 && this.random.Next(10) > 4) {
        // after placing this card only on card will be left + 50% chance to miss
        this.endTurn();
      }
    } catch (ex) {
      this.logger.Error("cant place card [" + this.placedCard + "]: " + ex);
    }
  }

  /**
   * makeRandomDecision makes a decision based on the payload of the message.
   *
   * Each decision request contains a list of options. This bot just picks one at random.
   */
  private makeRandomDecision(data: GetPlayerDecisionNotification) {
    const decision = this.random.Next(data.Options.Count);
    this.makeDecision(data.Type, decision);
  }
}

export default MyBot;
