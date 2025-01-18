import { Color, Container } from 'pixi.js';
import Scene from '../scene/scene';
import { iSceneOptions } from '../scene/types';
import MainConsole from '../../components/UI/console/mainConsole';
import { eMainConsoleButtons } from '../../components/UI/console/types';
import { Button } from '../../components/UI/button/button';
import { eGameEvents } from '../../systems/game/types';
import GameController from '../../systems/game/gameController';

export default class SceneMain extends Scene {
  private _layerUI!: Container;
  private _uiConsole!: MainConsole;

  constructor(options: iSceneOptions) {
    super(options);

    const background = this._getBackgroundGradient([
      { color: new Color(0x003b56), stop: 0 },
      { color: new Color(0x000000), stop: 1 },
    ]);
    background.anchor.set(0.5);
    background.x = this.referenceFrame.width / 2;
    background.y = this.referenceFrame.height / 2;
    this.addChildAt(background, 0);

    if (options.title) this._setTitle(options.title);
  }

  public async init() {
    if (!this._isInitialized) {
      this._isInitialized = true;

      // Create Layers
      this._layerUI = new Container();
      this.addChild(this._layerUI);

      // Create Scene Selectors
      this._createUI();
    }

    this._uiConsole.enable();
  }

  public reset() {
    super.reset();

    if (!this._isInitialized) return;
    this._uiConsole.disable();
  }

  /**
   * Create the UI console and bind the buttons to scene actions
   */
  private _createUI() {
    // Create the UI console
    this._uiConsole = new MainConsole();
    this._layerUI.addChild(this._uiConsole);

    // Bind the buttons to scene actions
    const playButton = this._uiConsole.buttons.get(
      eMainConsoleButtons.SCENE1
    ) as Button;
    playButton.on('pointerup', () => this._requestNavigation(1), this);

    const stopButton = this._uiConsole.buttons.get(
      eMainConsoleButtons.SCENE2
    ) as Button;
    stopButton.on('pointerup', () => this._requestNavigation(2), this);

    const resetButton = this._uiConsole.buttons.get(
      eMainConsoleButtons.SCENE3
    ) as Button;
    resetButton.on('pointerup', () => this._requestNavigation(3), this);

    // Position the UI
    this._uiConsole.x = (this.referenceFrame.width - this._uiConsole.width) / 2;
    this._uiConsole.y = this.referenceFrame.height / 2;
  }

  private _requestNavigation(sceneIndex: number) {
    GameController.bus.emit(eGameEvents.NAVIGATION_REQUESTED, {
      sceneIndex,
    });
  }
}
