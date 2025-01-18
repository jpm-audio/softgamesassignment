import { Container, Point, PointData, Text, TextOptions } from 'pixi.js';
import Card from './card';
import { iDeckConfig } from './types';

export default class Deck extends Container {
  protected _config: iDeckConfig = {
    addCardOffset: { x: 0, y: 0 },
    counterPosition: { x: 0, y: 0 },
    counterStyle: {
      text: '0',
      resolution: 1,
      style: {
        fill: 0xffffff,
        align: 'center',
      },
    },
  };
  protected _layerCards: Container;
  protected _counter: Text;

  public get numCards() {
    return this._layerCards.children.length;
  }

  public get counter() {
    return this._counter;
  }

  constructor(options?: iDeckConfig) {
    super();

    if (options !== undefined) {
      this._config = { ...this._config, ...options };
    }

    this._layerCards = new Container();
    this.addChild(this._layerCards);

    this._counter = new Text(this._config.counterStyle as TextOptions);
    this._counter.position.copyFrom(this._config.counterPosition as PointData);
    this._counter.visible = false;
    this.addChild(this._counter);
  }

  public getTheoricalWidth() {
    return this.width + this.numCards * Math.abs(this._config.addCardOffset.x);
  }

  public getTheoricalHeight() {
    return this.height + this.numCards * Math.abs(this._config.addCardOffset.y);
  }

  public updateCounter() {
    this._counter.visible = this.numCards > 0;

    if (this._counter.visible) {
      this._counter.text = this.numCards.toString();
    }
  }

  public addCard(card: Card) {
    this._layerCards.addChild(card);

    card.x = this.numCards * this._config.addCardOffset.x;
    card.y = this.numCards * this._config.addCardOffset.y;

    this.updateCounter();
  }

  public getCard(index: number = this.numCards - 1): Card | null {
    if (this.numCards === 0) return null;

    const card = this._layerCards.removeChildAt<Card>(index);
    this.updateCounter();
    return card;
  }

  public getNextCardCoordinates(offset: number = 0): Point {
    return new Point(
      (this.numCards + offset) * this._config.addCardOffset.x,
      (this.numCards + offset) * this._config.addCardOffset.y
    );
  }

  public reset() {
    this._layerCards.removeChildren();
    this.updateCounter();
  }
}
