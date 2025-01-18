import { TextOptions, Ticker } from 'pixi.js';

export interface iFpsDisplayOptions {
  ticker: Ticker;
  poolSize: number;
  padding?: number;
  margin?: number;
  textStyle?: TextOptions;
}
