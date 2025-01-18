import { Color } from 'pixi.js';
import Scene from '../scene/scene';
import { iSceneOptions } from '../scene/types';

export default class SceneTask3 extends Scene {
  constructor(options: iSceneOptions) {
    super(options);

    const background = this._getBackgroundGradient([
      { color: new Color(0x00fe50), stop: 0 },
      { color: new Color(0x000000), stop: 1 },
    ]);
    background.anchor.set(0.5);
    background.x = this.referenceFrame.width / 2;
    background.y = this.referenceFrame.height / 2;

    this.addChildAt(background, 0);
  }
}
