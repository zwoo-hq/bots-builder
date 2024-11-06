import {
  Bot,
  JsCard,
  WholeGameBotStateManager,
  type IncomingMessage,
} from "@zwoo/bots-builder";

export class MyBot extends Bot {
  private stateManager = new WholeGameBotStateManager();
  private placedCard = -1;
  private lastTriedCard: JsCard | undefined = undefined;

  public constructor() {
    super();
  }

  public AggregateNotification(message: IncomingMessage) {
    this.logger.Info("Received message: " + message);
    const wasActive = this.stateManager.state.isActive;

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

    var currentState = this.stateManager.state;
    // turn started
    if (!wasActive && currentState.isActive) {
      this.setChatMessage("Ich bin dran!");
      this.lastTriedCard = undefined;
    }

    // turn ended
    if (
      wasActive &&
      !currentState.isActive &&
      (this.lastTriedCard?.type === CardType.DrawTwo ||
        this.lastTriedCard?.type === CardType.WildFour)
    ) {
      this.setChatMessage("Haha du looser ;)");
    }

    if (currentState.isActive && message.Code != ZRPCode.StateUpdated) {
      this.logger.Info("starting turn");
      this.placedCard = -1;
      this.selectCard();
    }
  }

  public Reset() {
    this.logger.Info("Resetting bot");
    this.stateManager.reset();
  }

  private selectCard() {
    if (this.random.Next(10) < 1) {
      // bad luck - be dump, just draw
      this.drawCard();
      return;
    }

    var state = this.stateManager.state;
    this.placedCard = this.placedCard + 1;

    if (this.placedCard >= state.deck.length) {
      this.logger.Info("bailing with draw");
      this.drawCard();
      return;
    }

    try {
      this.lastTriedCard = state.deck[this.placedCard];
      this.placeCard(state.deck[this.placedCard]);

      if (state.deck.length == 2 && this.random.Next(10) > 4) {
        // after placing this card only on card will be left + 50% chance to miss
        this.endTurn();
      }
    } catch (ex) {
      this.logger.Error("cant place card [" + this.placedCard + "]: " + ex);
    }
  }

  private makeRandomDecision(data: GetPlayerDecisionNotification) {
    const decision = this.random.Next(data.Options.Count);
    this.makeDecision(data.Type, decision);
  }
}

export default MyBot;
