export class Card {
  public Color: CardColor = CardColor.None;
  public Type: CardType = CardType.None;

  public constructor(cardColor: CardColor, cardType: CardType);
  public constructor(_cardColor: number, _cardType: number) {}
}

export enum CardColor {
  None = 0,
  Red = 1,
  Yellow = 2,
  Blue = 3,
  Green = 4,
  Black = 5,
}

export enum CardType {
  None = 0,
  Zero = 1,
  One = 2,
  Two = 3,
  Three = 4,
  Four = 5,
  Five = 6,
  Six = 7,
  Seven = 8,
  Eight = 9,
  Nine = 10,
  Skip = 11,
  Reverse = 12,
  DrawTwo = 13,
  Wild = 14,
  WildFour = 15,
}

export class DrawCardEvent {}

export class PlaceCardEvent {}

export class RequestEndTurnEvent {}

export class GetDeckEvent {}

export class PlayerDecisionEvent {
  public Type: number = 0;
  public Decision: number = 0;

  public constructor(_type: number, _decision: number) {}
}
