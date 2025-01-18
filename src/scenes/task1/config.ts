import { iDeckConfig } from '../../components/cards/types';

export const TASK_1_CONFIG = {
  numCards: 144,
  decksGap: 100,
};

export const DECK_CONFIG: iDeckConfig = {
  addCardOffset: { x: -1, y: -2 },
  counterPosition: { x: 0, y: 258 },
  counterStyle: {
    text: '0',
    resolution: 1,
    style: {
      fontFamily: 'Arial',
      fontSize: 32,
      fill: 0xffffff,
      align: 'center',
    },
  },
};
