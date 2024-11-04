import {
  Bot,
  JsCard,
  WholeGameBotStateManager,
  type IncomingMessage,
} from "@zwoo/bots-builder";
import { globals } from "@zwoo/bots-builder/globals";

export class MyBot extends Bot {
  protected triggerEvent = globals.triggerEvent;
  private stateManager = new WholeGameBotStateManager();
  private placedCard = -1;
  private lastTriedCard: JsCard | undefined = undefined;

  public constructor() {
    super();
  }

  public AggregateNotification(message: IncomingMessage) {
    globals.logger.Info("Received message: " + message);
    const wasActive = this.stateManager.state.isActive;
    switch (message.Code) {
      case ZRPCode.GameStarted:
        this.triggerEvent(ZRPCode.GetHand, new GetDeckEvent());
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

    var currentState = this.stateManager.state;
    // turn started
    if (!wasActive && currentState.isActive) {
      this.setChatMessage("Ich bin dran!!");
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
      globals.logger.Info("starting turn");
      this.placedCard = -1;
      this.selectCard();
    }
  }

  public Reset() {
    globals.logger.Info("Resetting bot");
    this.stateManager.reset();
  }

  private selectCard() {
    if (globals.random.Next(10) < 1) {
      // bad luck - be dump, just draw
      this.drawCard();
      return;
    }

    var state = this.stateManager.state;
    this.placedCard = this.placedCard + 1;

    if (this.placedCard >= state.deck.length) {
      globals.logger.Info("bailing with draw");
      this.drawCard();
      return;
    }

    try {
      this.lastTriedCard = state.deck[this.placedCard];
      this.placeCard(state.deck[this.placedCard]);

      if (state.deck.length == 2 && globals.random.Next(10) > 4) {
        // after placing this card only on card will be left + 50% chance to miss
        this.endTurn();
      }
    } catch (ex) {
      globals.logger.Error("cant place card [" + this.placedCard + "]: " + ex);
    }
  }

  private makeRandomDecision(data: GetPlayerDecisionNotification) {
    const decision = globals.random.Next(data.Options.Count);
    this.makeDecision(data.Type, decision);
  }
}

export default MyBot;
