import { Application, Container, EventEmitter } from 'pixi.js';
import Scene from '../../scenes/scene/scene';
import { eGameEvents, iGameEventErrorInfo } from './types';

/**
 * Game Controller
 *
 * Singleton class that controls the game flow and holds all the needed systems
 */
export default class GameController {
  private static _instance: GameController;
  private static _bus: EventEmitter;
  private static _app: Application;

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

  public static get ticker() {
    return GameController._app.ticker;
  }

  /**
   * Creates the game controller instance and initializes all needed systems
   * @param app
   * @returns
   */
  public static async init(app: Application) {
    GameController._app = app;
    GameController._bus = new EventEmitter();
    GameController._instance = new GameController();
    // Environment system

    return GameController.game.init();
  }

  /**
   * Constructor
   */
  constructor() {}

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

    // - Init Main Scene

    // Resize Handling
  }

  protected async _setScene(sceneIndex: number) {
    // Checkif index is valid
    if (sceneIndex < 0 || sceneIndex >= this._scenes.length) return;

    // Handle the scene transition
    const currentScene = this._scenes[this._currentSceneIndex];
    const nextScene = this._scenes[sceneIndex];

    currentScene.hide();
    nextScene.show();

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
