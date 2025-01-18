import { Color, Container } from 'pixi.js';
import Scene from '../scene/scene';
import { iSceneOptions } from '../scene/types';
import TextImageBlender from '../../systems/textImageBlender/textImageBlender';
import { TASK_1_CONFIG, TEXT_IMAGE_BLENDER_OPTIONS } from './config';
import waitForTickerTime from '../../utils/waitForTickerTime';
import GameController from '../../systems/game/gameController';
import FadeContainer from '../../components/fadeContainer/fadeContainer';

export default class SceneTask2 extends Scene {
  private _layerText: FadeContainer;
  private _currentLine!: Container;
  public textLineBlender!: TextImageBlender;

  constructor(options: iSceneOptions) {
    super(options);

    console.log(options);

    // Create the background image by using a simple radial gradient
    this._background = this._getBackgroundGradient([
      { color: new Color(0xfe00fe), stop: 0 },
      { color: new Color(0x000000), stop: 1 },
    ]);
    this._background.anchor.set(0.5);
    this._background.x = this.referenceFrame.width / 2;
    this._background.y = this.referenceFrame.height / 2;
    this.addChildAt(this._background, 0);

    // Layer to contain the texts and images blended
    this._layerText = new FadeContainer();
    this._layerText.hideAnimationVars = TASK_1_CONFIG.hide;
    this._layerText.showAnimationVars = TASK_1_CONFIG.show;
    this._layerText.alpha = 0;
    this._layerText.visible = false;
    this._layerText.x = this.referenceFrame.width / 2;
    this._layerText.y = this.referenceFrame.height / 2;
    this.addChild(this._layerText);
  }

  /**
   * Initialize creating and setting the elements into the scene
   *
   * @returns
   */
  public async init() {
    if (this._isInitialized) return;
    this._isInitialized = true;

    // Load the assets
    await this.load();

    // Create the text-image blender
    this.textLineBlender = new TextImageBlender({
      ...TEXT_IMAGE_BLENDER_OPTIONS,
      ...{ resolution: GameController.assetsResolution },
    });
  }

  /**
   * Animate the text-image blender with a fade-in and fade-out animation.
   * It will recursively iterate every time configured.
   */
  private async _animate() {
    if (!this._isRunning) return;

    // Hide the current line if any
    if (this._layerText.children.length > 0) {
      await this._layerText.hide();
      this._layerText.removeChildren();
    }

    // Get a random line from the text blender and add it to the texts layer
    const randomLine = this.textLineBlender.getRandomLine();
    this._currentLine = this.textLineBlender.buildLine(randomLine);
    this._currentLine.x = -this._currentLine.width / 2;
    this._layerText.addChild(this._currentLine);

    await this._layerText.show();

    await waitForTickerTime(TASK_1_CONFIG.textInterval, GameController.ticker);

    this._animate();
  }

  /**
   * override show method to automatically start the animation right afer the scene is shown.
   */
  public async show() {
    await super.show();
    this._isRunning = true;
    this._animate();
  }

  public reset() {
    super.reset();
    this._isRunning = false;
  }
}
