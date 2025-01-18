import { Color, Sprite } from 'pixi.js';
import Scene from '../scene/scene';
import { iSceneOptions } from '../scene/types';

export default class SceneTask3 extends Scene {
  private _background!: Sprite;

  constructor(options: iSceneOptions) {
    super(options);

    this._background = this._getBackgroundGradient([
      { color: new Color(0x00fe50), stop: 0 },
      { color: new Color(0x000000), stop: 1 },
    ]);
    this._background.anchor.set(0.5);
    this._background.x = this.referenceFrame.width / 2;
    this._background.y = this.referenceFrame.height / 2;

    this.addChildAt(this._background, 0);
  }

  public onScreenResize(drawFrame: { width: number; height: number }) {
    const size = Math.max(drawFrame.width, drawFrame.height);
    this._background.width = this._background.height = size;
  }
}
