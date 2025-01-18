import { Application, Container, EventEmitter } from 'pixi.js';
import Scene from '../../scenes/scene/scene';
import { eGameEvents, iGameConfig, iGameEventErrorInfo } from './types';

/**
 * Game Controller
 *
 * Singleton class that controls the game flow and holds all the needed systems
 */
export default class GameController {
  private static _instance: GameController;
  private static _bus: EventEmitter;
  private static _app: Application;

  private _config: iGameConfig;
  private _scenes: Scene[] = [];
  private _currentSceneIndex: number = -1;
  private _layerGame!: Container;
  private _layerUI!: Container;

  protected static get _stage() {
    return GameController._app.stage;
  }

  public static get game() {
    return GameController._instance;
  }

  public static get bus() {
    return GameController._bus;
  }

  public static get renderer() {
    return GameController._app.renderer;
  }

  public static get assetsResolution() {
    return 1;
  }

  public static get ticker() {
    return GameController._app.ticker;
  }

  /**
   * Creates the game controller instance and initializes all needed systems
   * @param app
   * @returns
   */
  public static async init(app: Application, config: iGameConfig) {
    GameController._app = app;
    GameController._bus = new EventEmitter();
    GameController._instance = new GameController(config);
    // Environment system

    return GameController.game.init();
  }

  /**
   * Constructor
   */
  constructor(config: iGameConfig) {
    this._config = config;
  }

  public async init() {
    // First init Error notification system
    GameController._bus.on(eGameEvents.ERROR, this.onError, this);

    // Game Resolution

    // Layers
    this._layerGame = new Container();
    GameController._stage.addChild(this._layerGame);

    this._layerUI = new Container();
    GameController._stage.addChild(this._layerUI);

    // Scenes
    // - Create and add scenes
    this._config.scenes.forEach((sceneConfig) => {
      this._scenes.push(new sceneConfig.class(sceneConfig.options));
    });

    // - Init Main Scene
    this._setSceneByIndex(0);

    // Resize Handling
  }

  protected async _setSceneByIndex(sceneIndex: number) {
    // Checkif index is valid
    if (sceneIndex < 0 || sceneIndex >= this._scenes.length) return;

    // Handle the scene transition
    const currentScene = this._scenes[this._currentSceneIndex];
    const nextScene = this._scenes[sceneIndex];

    // Disable UI

    // Change the scenes
    await nextScene.init();

    this._layerGame.addChild(nextScene);

    const currentSceneHide =
      currentScene !== undefined ? currentScene.hide() : null;
    const nextSceneShow = nextScene.show();

    await Promise.all([currentSceneHide, nextSceneShow]);

    if (currentScene !== undefined) {
      await currentScene.reset();
      this._layerGame.removeChild(currentScene);
    }

    // Update scene index
    this._currentSceneIndex = sceneIndex;
  }

  /**
   *Listener callback for error events.
   * It will display an alert with the error message.
   *
   * @param event
   */
  public onError(event: iGameEventErrorInfo) {
    alert(event.error);
  }

  /**
   * Listener callback for screen resize events.
   * It will calculate the proper scale to fit the current size and also it will
   * propagate the resize to the rest of the game hierarchy if needed.
   */
  public onScreenResize() {}
}
