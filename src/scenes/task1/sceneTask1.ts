import { Color, Container } from 'pixi.js';
import Scene from '../scene/scene';
import { iSceneOptions } from '../scene/types';
import Deck from '../../components/cards/deck';
import CardsFactory from '../../components/cards/cardsFactory';
import { DECK_CONFIG, TASK_1_CONFIG } from './config';
import CardAnimation from '../../animations/cardAnimation.ts/cardAnimation';
import Card from '../../components/cards/card';

export default class SceneTask1 extends Scene {
  private _isInitialized: boolean = false;
  private _taskConfig = TASK_1_CONFIG;

  private _decks: Deck[] = [];
  private _cards: Card[] = [];
  private _cardFlipAnimation: CardAnimation;

  private _layerDecks: Container;
  private _backCardsLayer: Container;
  private _frontCardsLayer: Container;

  constructor(options: iSceneOptions) {
    super(options);

    const background = this._getBackgroundGradient([
      { color: new Color(0x00fefe), stop: 0 },
      { color: new Color(0x000000), stop: 1 },
    ]);
    background.anchor.set(0.5);
    background.x = this.referenceFrame.width / 2;
    background.y = this.referenceFrame.height / 2;

    this.addChildAt(background, 0);

    this._cardFlipAnimation = new CardAnimation();

    // Layer to contain the 2 decks of cards at the bottom of the screen
    this._layerDecks = new Container();
    this.addContent(this._layerDecks);

    // Layer to contain the cards animated by still showing the back face.
    // In this layer the cards are ordered fist on top
    this._backCardsLayer = new Container();
    this.addContent(this._backCardsLayer);

    // Layer to contain the cards animated by showing the front face.
    // In this layer the cards are ordered last on top
    this._frontCardsLayer = new Container();
    this.addContent(this._frontCardsLayer);
  }

  public async init() {
    if (!this._isInitialized) {
      this._isInitialized = true;

      // Load the assets
      await this.load();

      // Create the decks and cards
      this._createDecks();
      this._createCards();
    }

    // Reset the cards
    this._resetCards();
  }

  private async _createCards() {
    for (let i = 0; i < this._taskConfig.numCards; i++) {
      const card = CardsFactory.card((i + 1).toString());
      this._cards.push(card);
    }
  }

  private async _createDecks() {
    // Create the _decks of cards
    this._decks.push(new Deck(DECK_CONFIG));
    this._decks.push(new Deck(DECK_CONFIG));
    this._layerDecks.addChild(this._decks[0]);
    this._layerDecks.addChild(this._decks[1]);

    this._decks[0].y = this._decks[1].y = this.referenceFrame.height / 2;
    this._decks[1].x =
      (this.referenceFrame.width - this._taskConfig.decksGap) / 2;
  }

  private _resetCards() {
    // Empty the decks
    this._decks.forEach((deck) => deck.reset());

    // Reset all cards and set them to the first deck
    this._cards.forEach((card) => {
      card.reset();
      this._decks[0].addCard(card);
    });
  }

  public start() {
    this._cardFlipAnimation.start();
  }

  public stop() {
    this.reset();
  }

  public pause(): void {
    this._cardFlipAnimation.pause();
  }

  public resume(): void {
    this._cardFlipAnimation.resume();
  }

  public reset() {
    super.reset();
    if (!this._isInitialized) return;
    this._cardFlipAnimation.stop();
    this._resetCards();
  }
}
