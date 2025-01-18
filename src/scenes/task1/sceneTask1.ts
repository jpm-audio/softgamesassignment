import { Color, Container, Point, Sprite, Ticker } from 'pixi.js';
import Scene from '../scene/scene';
import { iSceneOptions } from '../scene/types';
import Deck from '../../components/cards/deck';
import CardsFactory from '../../components/cards/cardsFactory';
import { DECK1_CONFIG, DECK2_CONFIG, TASK_1_CONFIG } from './config';
import CardAnimation from '../../animations/cardAnimation.ts/cardAnimation';
import Card from '../../components/cards/card';
import Task1Console from '../../components/UI/console/task1Console';
import { eTask1ConsoleButtons } from '../../components/UI/console/types';
import { Button } from '../../components/UI/button/button';
import waitForTickerTime from '../../utils/waitForTickerTime';
import waitForCondition from '../../utils/waitForCondition';
import GameController from '../../systems/game/gameController';

export default class SceneTask1 extends Scene {
  private _isInitialized: boolean = false;
  private _taskConfig = TASK_1_CONFIG;

  private _background!: Sprite;
  private _decks: Deck[] = [];
  private _cards: Card[] = [];
  private _cardAnimation: CardAnimation;
  private _animationTicker: Ticker;
  private _uiConsole!: Task1Console;

  private _layerDecks: Container;
  private _layerBackCards: Container;
  private _layerFrontCards: Container;
  private _layerUI: Container;

  public set isRunning(value: boolean) {
    this._isRunning = value;
    this._updateUIState();
  }

  constructor(options: iSceneOptions) {
    super(options);

    this._background = this._getBackgroundGradient([
      { color: new Color(0x00fefe), stop: 0 },
      { color: new Color(0x000000), stop: 1 },
    ]);
    this._background.anchor.set(0.5);
    this._background.x = this.referenceFrame.width / 2;
    this._background.y = this.referenceFrame.height / 2;

    this.addChildAt(this._background, 0);

    // Set the animation up
    this._cardAnimation = new CardAnimation();
    this._cardAnimation.duration = this._taskConfig.animations.animationTime;
    this._animationTicker = new Ticker();

    // Layer to contain the 2 decks of cards at the bottom of the screen
    this._layerDecks = new Container();
    this.addContent(this._layerDecks);

    // Layer to contain the cards animated by still showing the back face.
    // In this layer the cards are ordered fist on top
    this._layerBackCards = new Container();
    this.addContent(this._layerBackCards);

    // Layer to contain the cards animated by showing the front face.
    // In this layer the cards are ordered last on top
    this._layerFrontCards = new Container();
    this.addContent(this._layerFrontCards);

    // Layer to contain the UI
    this._layerUI = new Container();
    this.addChild(this._layerUI);
  }

  public async init() {
    if (!this._isInitialized) {
      this._isInitialized = true;

      // Load the assets
      await this.load();

      // Create the decks and cards
      this._createDecks();
      this._createCards();
      this._createUI();
    }

    // Reset the cards
    this._resetCards();

    // Enable UI
    const playButton = this._uiConsole.buttons.get(
      eTask1ConsoleButtons.PLAY
    ) as Button;
    playButton.enable();
  }

  private async _createCards() {
    for (let i = 0; i < this._taskConfig.numCards; i++) {
      const card = CardsFactory.card((i + 1).toString());
      this._cards.push(card);
    }
  }

  private async _createDecks() {
    // Create the _decks of cards
    this._decks.push(new Deck(DECK1_CONFIG));
    this._decks.push(new Deck(DECK2_CONFIG));
    this._layerDecks.addChild(this._decks[0]);
    this._layerDecks.addChild(this._decks[1]);

    const cardStackOffset =
      DECK1_CONFIG.addCardOffset.y * this._taskConfig.numCards;

    this._decks[0].y = this._decks[1].y =
      (this.referenceFrame.height - cardStackOffset) / 2;
    this._decks[0].x =
      this.referenceFrame.width / 2 - this._taskConfig.decksGap;
    this._decks[1].x =
      this.referenceFrame.width / 2 + this._taskConfig.decksGap;
  }

  private _createUI() {
    // Create the UI console
    this._uiConsole = new Task1Console();
    this._layerUI.addChild(this._uiConsole);

    // Bind the buttons to scene actions
    const playButton = this._uiConsole.buttons.get(
      eTask1ConsoleButtons.PLAY
    ) as Button;
    playButton.on('pointerup', this.start, this);

    const stopButton = this._uiConsole.buttons.get(
      eTask1ConsoleButtons.STOP
    ) as Button;
    stopButton.on('pointerup', this.stop, this);

    const resetButton = this._uiConsole.buttons.get(
      eTask1ConsoleButtons.RESET
    ) as Button;
    resetButton.on('pointerup', this.reset, this);

    // Position the UI
    this._uiConsole.x = (this.referenceFrame.width - this._uiConsole.width) / 2;
    this._uiConsole.y =
      this.referenceFrame.height -
      this._uiConsole.height -
      this._taskConfig.margin;
  }

  private async _animateACard() {
    await waitForCondition(() => !this._isRunning);

    if (!this._isRunning) return;

    // Get the card from the first deck...
    const card = this._decks[0].getCard();

    // if any card found...
    if (!card) return;

    const numCardsAnimated =
      this._layerFrontCards.children.length +
      this._layerBackCards.children.length;
    const deck1Coords = this._decks[0].getNextCardCoordinates(1);
    const deck2Coords = this._decks[1].getNextCardCoordinates(
      1 + numCardsAnimated
    );
    card.x = this._decks[0].x + deck1Coords.x;
    card.y = this._decks[0].y + deck1Coords.y;

    // Add the card to the back layer
    this._layerBackCards.addChildAt(card, 0);

    this._cardAnimation.addPlay(
      card,
      new Point(
        this._decks[0].x + deck1Coords.x,
        this._decks[0].y + deck1Coords.y
      ),
      new Point(
        this._decks[1].x + deck2Coords.x,
        this._decks[1].y + deck2Coords.y
      ),
      // On Flip callback: It removes the card from the back layer and adds it to the front layer
      () => {
        this._layerBackCards.removeChild(card);
        this._layerFrontCards.addChildAt(
          card,
          this._layerFrontCards.children.length
        );
      },
      // On Complete callback: It removes the card from the front layer and adds it to the second deck
      () => {
        this._layerFrontCards.removeChild(card);
        this._decks[1].addCard(card);
        this._updateUIState();
      }
    );

    //this._cardAnimation.start();

    console.log('card animation started', this._cardAnimation.duration);

    // Delay between card animations
    await waitForTickerTime(
      this._taskConfig.animations.cardsInterval * 1000,
      GameController.ticker
    );

    console.log('next card', this._taskConfig.animations.cardsInterval);

    // Next card!
    this._animateACard();
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

  private _updateUIState() {
    if (!this._isInitialized) return;
    const playButton = this._uiConsole.buttons.get(
      eTask1ConsoleButtons.PLAY
    ) as Button;
    const stopButton = this._uiConsole.buttons.get(
      eTask1ConsoleButtons.STOP
    ) as Button;
    const resetButton = this._uiConsole.buttons.get(
      eTask1ConsoleButtons.RESET
    ) as Button;

    if (!this._isRunning) {
      playButton.enable();
      stopButton.disable();
    } else {
      playButton.disable();
      stopButton.enable();
    }

    if (this._decks[1].numCards > 0) {
      resetButton.enable();
    } else {
      resetButton.disable();
    }
  }

  public start() {
    console.log('is running', this._isRunning);
    if (this._isRunning) return;
    this.isRunning = true;
    this._animationTicker.start();
    if (this._cardAnimation.isRunning) {
      this._cardAnimation.resume();
    } else {
      this._animateACard();
    }
  }

  public stop(): void {
    if (!this._isRunning) return;
    this.isRunning = false;
    this._animationTicker.stop();
    this._cardAnimation.pause();
  }

  public reset() {
    super.reset();

    if (!this._isInitialized) return;
    this.isRunning = false;
    this._animationTicker.stop();
    this._cardAnimation.stop();
    this._resetCards();
  }

  public onScreenResize(drawFrame: { width: number; height: number }) {
    const size = Math.max(drawFrame.width, drawFrame.height);
    this._background.width = this._background.height = size;
  }
}
