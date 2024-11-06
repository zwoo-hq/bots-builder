import { JsCard } from "./builtin/jsTypes";
import { IncomingMessage } from "./zrp";
import { _setupEnvironment, globals } from "./globals";

export abstract class Bot {
  static _setupEnvironment = _setupEnvironment;

  /**
   * Send a message to the game
   */
  protected triggerEvent = globals.triggerEvent;

  /**
   * A logger to log messages
   */
  protected logger = globals.logger;

  /**
   * A collection of helper functions
   */
  protected helper = globals.helper;

  /**
   * A random number generator
   */
  protected random = globals.random;

  /**
   * AggregateNotification is called whenever a new message is received from the game.
   *
   * @param {IncomingMessage} message the message received from the game
   */
  abstract AggregateNotification(message: IncomingMessage): void;

  /**
   * Reset to state of the bot to the initial state
   */
  abstract Reset(): void;

  /**
   * Place a card
   */
  protected placeCard(card: JsCard) {
    this.triggerEvent(
      ZRPCode.PlaceCard,
      new PlaceCardEvent(
        globals.helper.toInt(card.color),
        globals.helper.toInt(card.type)
      )
    );
  }

  /**
   * Draw a card
   */
  protected drawCard() {
    this.triggerEvent(ZRPCode.DrawCard, new DrawCardEvent());
  }

  /**
   * End the turn
   */
  protected endTurn() {
    this.triggerEvent(ZRPCode.RequestEndTurn, new RequestEndTurnEvent());
  }

  /**
   * Set a chat message
   */
  protected setChatMessage(message: string) {
    this.triggerEvent(ZRPCode.CreateChatMessage, new ChatMessageEvent(message));
  }

  /**
   * Make a decision
   */
  protected makeDecision(type: number, decision: number) {
    this.triggerEvent(
      ZRPCode.ReceiveDecision,
      new PlayerDecisionEvent(type, decision)
    );
  }

  /**
   * Request the current settings from the game
   */
  protected requestSettings() {
    this.triggerEvent(ZRPCode.GetAllSettings, new GetSettingsEvent());
  }

  /**
   * Request the current deck of the bot from the game
   */
  protected requestDeck() {
    this.triggerEvent(ZRPCode.GetHand, new GetDeckEvent());
  }

  /**
   * Request the current players from the game
   */
  protected requestPlayers() {
    this.triggerEvent(ZRPCode.GetCardAmount, new GetPlayerStateEvent());
  }

  /**
   * Request the current pile from the game
   */
  protected requestPile() {
    this.triggerEvent(ZRPCode.GetPileTop, new GetPileTopEvent());
  }
}
