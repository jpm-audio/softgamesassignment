import { TextOptions } from 'pixi.js';
import { iDeckConfig } from '../../components/cards/types';

export const TASK_1_CONFIG = {
  numCards: 144,
  decksGap: 200,
  margin: 25,
  animations: {
    cardsInterval: 1,
    animationTime: 2,
  },
};

const deckCounterStyle = {
  text: '0',
  resolution: 1,
  style: {
    fontFamily: 'Arial',
    fontSize: 54,
    fill: 0xffffff,
    align: 'center',
  },
};

export const DECK1_CONFIG: iDeckConfig = {
  addCardOffset: { x: -1, y: -2 },
  counterPosition: { x: 0, y: 300 },
  counterStyle: deckCounterStyle as Partial<TextOptions>,
};

export const DECK2_CONFIG: iDeckConfig = {
  addCardOffset: { x: 1, y: -2 },
  counterPosition: { x: 0, y: 300 },
  counterStyle: deckCounterStyle as Partial<TextOptions>,
};
