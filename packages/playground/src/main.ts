import { BotBase } from "@zwoo/bots-builder";

export class Bot extends BotBase {
  private triggerEvent = globals.triggerEvent;
  private state = new WholeGameBotStateManager();
  private placedCard = -1;

  public AggregateNotification(message) {
    globals.logger.Info("Received message: " + message);

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
      globals.logger.Info("starting turn");
      this.placedCard = -1;
      this.placeCard();
    }
  }

  public Reset() {
    globals.logger.Info("Resetting bot");
  }

  private placeCard() {
    if (globals.rand.Next(10) < 1) {
      // bad luck - be dump, just draw
      this.triggerEvent(ZRPCode.DrawCard, new DrawCardEvent());
      return;
    }

    var state = this.state.GetState();
    this.placedCard = this.placedCard + 1;

    if (this.placedCard >= state.Deck.Count) {
      globals.logger.Info("bailing with draw");
      this.triggerEvent(ZRPCode.DrawCard, new DrawCardEvent());
      return;
    }

    try {
      this.triggerEvent(
        ZRPCode.PlaceCard,
        new PlaceCardEvent(
          globals.toInt(state.Deck[this.placedCard].Color),
          globals.toInt(state.Deck[this.placedCard].Type)
        )
      );

      if (state.Deck.Count == 2 && globals.rand.Next(10) > 4) {
        // after placing this card only on card will be left + 50% chance to miss
        this.triggerEvent(ZRPCode.RequestEndTurn, new RequestEndTurnEvent());
      }
    } catch (ex) {
      globals.logger.Error("cant place card [" + this.placedCard + "]: " + ex);
    }
  }

  private makeDecision(data) {
    const decision = globals.rand.Next(data.Options.Count);
    this.triggerEvent(
      ZRPCode.ReceiveDecision,
      new PlayerDecisionEvent(data.Type, decision)
    );
  }
}
