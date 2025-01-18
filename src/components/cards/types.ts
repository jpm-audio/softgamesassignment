import { PointData, TextOptions } from 'pixi.js';

export interface iDeckConfig {
  addCardOffset: PointData;
  counterPosition?: PointData;
  counterStyle?: Partial<TextOptions>;
}
