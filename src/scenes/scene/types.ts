import { Rectangle } from 'pixi.js';

export interface iSceneOptions {
  referenceFrame: Rectangle;
  resolution?: number;
  id?: string;
  hideAnimation?: gsap.TweenVars;
  showAnimation?: gsap.TweenVars;
  assetBundleId?: string;
}
