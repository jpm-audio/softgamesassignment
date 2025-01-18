import { TextStyleOptions } from 'pixi.js';

export interface iTextImageBlenderOption {
  resolution?: number;
  lineMaxElements?: number;
  lineMinElements?: number;
  lineTimeInterval?: number;
  images: string[];
  words: string[];
  textStyle: TextStyleOptions;
}
