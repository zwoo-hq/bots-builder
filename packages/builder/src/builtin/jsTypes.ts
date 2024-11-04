import { CardColor, CardType } from "../csInterop/card";
import { Card as CsCard } from "../csInterop/card";

export type AnyCard = CsCard | JsCard | { Type: CardColor; Symbol: CardType };

export class JsCard {
  public type: CardType;
  public color: CardColor;

  public constructor();
  public constructor(card: AnyCard);
  public constructor(color: CardColor, cardType: CardType);
  public constructor(cardOrColor?: CardColor | AnyCard, cardType?: CardType) {
    if (typeof cardOrColor === "object") {
      if ("Color" in cardOrColor && "Type" in cardOrColor) {
        this.color = cardOrColor.Color;
        this.type = cardOrColor.Type;
      } else if ("Type" in cardOrColor && "Symbol" in cardOrColor) {
        this.color = cardOrColor.Type;
        this.type = cardOrColor.Symbol;
      } else if ("color" in cardOrColor && "type" in cardOrColor) {
        this.color = cardOrColor.color;
        this.type = cardOrColor.type;
      } else {
        this.color = CardColor.None;
        this.type = CardType.None;
      }
    } else if (cardOrColor && cardType) {
      this.color = cardOrColor;
      this.type = cardType;
    } else {
      this.color = CardColor.None;
      this.type = CardType.None;
    }
  }

  public static equals(card1: AnyCard, card2: AnyCard): boolean {
    const normalizedCard1 = new JsCard(card1);
    const normalizedCard2 = new JsCard(card2);
    return (
      normalizedCard1.color === normalizedCard2.color &&
      normalizedCard1.type === normalizedCard2.type
    );
  }

  public equals(card: AnyCard): boolean {
    return JsCard.equals(this, card);
  }
}
